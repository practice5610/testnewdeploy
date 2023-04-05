"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = require("util");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const config = tslib_1.__importStar(require("../datasources/storage.datasource.json"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const STORAGE_CONTAINER_NAME = process.env.OBJECT_STORAGE_BUCKET_NAME_FOR_IMAGES || 'moob-images';
const STORAGE_CONTAINER_UPLOAD_PATH = `${STORAGE_CONTAINER_NAME}/${process.env.OBJECT_STORAGE_ENV_DIRECTORY_FOR_IMAGES}/uploaded`;
const STORAGE_CONTAINER_RESIZED_PATH = `${STORAGE_CONTAINER_NAME}/${process.env.OBJECT_STORAGE_ENV_DIRECTORY_FOR_IMAGES}/resized`;
const sharp = require('sharp');
const pipeStreams = require('pipe-streams-to-promise');
const formidable = require('formidable');
let ImageController = class ImageController {
    constructor(request, response, currentUserGetter, imageRepository) {
        this.request = request;
        this.response = response;
        this.currentUserGetter = currentUserGetter;
        this.imageRepository = imageRepository;
    }
    async upload(fileName, override = false) {
        const uploadStream = this.storageService.uploadStream;
        const download = util_1.promisify(this.storageService.download);
        const getFile = util_1.promisify(this.storageService.getFile);
        const removeFile = util_1.promisify(this.storageService.removeFile);
        const imageRepo = this.imageRepository;
        const request = this.request;
        const response = this.response;
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        const filterBuilder = new repository_1.FilterBuilder();
        const filter = filterBuilder.where({ fileName }).order('uploadedBy DESC').build();
        const images = await imageRepo.find(filter);
        if (images.length > 0) {
            // if force to override the image then check access to the logged in user
            if (currentUser && override === true && images[0].uploadedBy === currentUser.uid) {
                for (const image of images) {
                    const filePath = image.path;
                    const tempFileName = filePath.replace(`${STORAGE_CONTAINER_RESIZED_PATH}/`, '');
                    await removeFile(STORAGE_CONTAINER_RESIZED_PATH, tempFileName);
                    await imageRepo.delete(image);
                }
            }
            else if (override === true) {
                throw new rest_1.HttpErrors.Unauthorized('You do not have the rights to update this image');
            }
            else {
                throw new rest_1.HttpErrors.Conflict(`Image already exists with the name [${fileName}]`);
            }
        }
        await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(request, function (err, fields, files) {
                if (Object.keys(files).length === 0) {
                    return reject(new rest_1.HttpErrors.BadRequest(`File not provided to upload`));
                }
                // pick first file object
                const fileFieldKey = Object.keys(files).shift();
                const fileField = files[fileFieldKey || 'file'];
                if (!config.allowedContentTypes.includes(fileField.type)) {
                    return reject(new rest_1.HttpErrors.BadRequest(`File type(${fileField.type}) not allowed`));
                }
                else if (parseInt(fileField.size, 10) > parseInt(config.maxFileSize, 10)) {
                    return reject(new rest_1.HttpErrors.BadRequest(`File size is more then allowed size ${parseInt(config.maxFileSize, 10) / (1024 * 1024)}MB`));
                }
                else {
                    // used sharp lib to
                    // 1. Adjust Image EXIF data if orientation is Rotate
                    // 2. Optimize image, default=80, save image to jpeg
                    const transformer = sharp().rotate().jpeg();
                    const writableStream = uploadStream(STORAGE_CONTAINER_UPLOAD_PATH, `${fileName}.jpeg`, config);
                    const readableStream = fs_1.default.createReadStream(fileField.path);
                    let errorAlreadyRejected = false;
                    writableStream.on('success', function (file) {
                        const tempImage = {
                            uploadedBy: currentUser.uid,
                            fileName: fileName,
                            path: `${STORAGE_CONTAINER_UPLOAD_PATH}/${fileName}.jpeg`,
                        };
                        imageRepo
                            .create(tempImage)
                            .then((res) => {
                            resolve(download(STORAGE_CONTAINER_UPLOAD_PATH, `${fileName}.jpeg`, request, response));
                        })
                            .catch((error) => {
                            reject(new rest_1.HttpErrors.InternalServerError(error.message));
                        });
                    });
                    writableStream.on('error', function (error) {
                        console.error('ERROR message', error);
                        if (!errorAlreadyRejected) {
                            errorAlreadyRejected = true;
                            // it will send err file not found
                            resolve(getFile(STORAGE_CONTAINER_UPLOAD_PATH, fileName)); // here we need to use await
                        }
                    });
                    // pipe read and write stream with mixing sharp lib transform to save image to storage container
                    pipeStreams([readableStream, transformer, writableStream])
                        .then(function () {
                        // all well, no errors in above stream creation
                        return true;
                    })
                        .catch(function (error) {
                        // in case of stream error send error 500
                        console.log('**Exceptional Error**', error);
                        if (!errorAlreadyRejected) {
                            errorAlreadyRejected = true;
                            return reject(new rest_1.HttpErrors.InternalServerError(error.message));
                        }
                    });
                }
            });
        });
    }
    async download(fileName, width, height) {
        //sharp after resize every time creates png file thus resize image will always be in png format
        const tempFileName = `${fileName}-${width}x${height}.jpeg`;
        const download = util_1.promisify(this.storageService.download);
        const imageRepo = this.imageRepository;
        const request = this.request;
        const response = this.response;
        const resizedPath = STORAGE_CONTAINER_RESIZED_PATH;
        async function isFileExists(tempPath) {
            const filterBuilder = new repository_1.FilterBuilder();
            const filter = filterBuilder.where({ path: tempPath }).build();
            const image = await imageRepo.find(filter);
            if (image.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        if (await isFileExists(`${resizedPath}/${tempFileName}`)) {
            return download(resizedPath, tempFileName, this.request, this.response);
        }
        else if (await isFileExists(`${STORAGE_CONTAINER_UPLOAD_PATH}/${fileName}.jpeg`)) {
            const transformer = sharp()
                .resize(width, height, {
                fit: 'fill',
            })
                .jpeg();
            // Read image data from readableStream, resize and write image data to writableStream
            await new Promise((resolve, reject) => {
                const writableStream = this.storageService.uploadStream(resizedPath, tempFileName, config);
                let errorAlreadyRejected = false;
                writableStream.on('success', function (file) {
                    const tempImage = {
                        uploadedBy: '',
                        fileName: fileName,
                        path: `${resizedPath}/${tempFileName}`,
                    };
                    imageRepo
                        .create(tempImage)
                        .then((res) => {
                        console.log('uploaded image', res);
                    })
                        .catch((err) => {
                        console.log('uploaded err', err);
                    })
                        .finally(() => {
                        resolve(download(resizedPath, tempFileName, request, response));
                    });
                });
                writableStream.on('error', function () {
                    if (!errorAlreadyRejected) {
                        errorAlreadyRejected = true;
                        // it will send err file not found
                        return reject(new rest_1.HttpErrors.InternalServerError(`Not able to save the resize image to Storage Container`));
                    }
                });
                pipeStreams([
                    this.storageService.downloadStream(STORAGE_CONTAINER_UPLOAD_PATH, `${fileName}.jpeg`, config),
                    transformer,
                    writableStream,
                ])
                    .then(function () {
                    // all well, no errors in above stream
                    return true;
                })
                    .catch(function (err) {
                    // in case of stream error send error 500
                    console.log('**Exceptional Error**', err);
                    if (!errorAlreadyRejected) {
                        errorAlreadyRejected = true;
                        return reject(new rest_1.HttpErrors.InternalServerError(err.message));
                    }
                });
            });
        }
        else {
            throw new rest_1.HttpErrors.NotFound(`The Image [${fileName}] not found`);
        }
    }
    async deleteByName(fileName) {
        const removeFile = util_1.promisify(this.storageService.removeFile);
        const imageRepo = this.imageRepository;
        const response = this.response;
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        const filterBuilder = new repository_1.FilterBuilder();
        const filter = filterBuilder.where({ fileName }).order('uploadedBy DESC').build();
        const images = await imageRepo.find(filter);
        if (images.length && images[0].uploadedBy === currentUser.uid) {
            for (const image of images) {
                const filePath = image.path;
                const uploadedBy = image.uploadedBy;
                let tempFileName = '';
                let containerName = '';
                if (uploadedBy !== '') {
                    tempFileName = filePath.replace(`${STORAGE_CONTAINER_UPLOAD_PATH}/`, '');
                    containerName = STORAGE_CONTAINER_UPLOAD_PATH;
                }
                else {
                    tempFileName = filePath.replace(`${STORAGE_CONTAINER_RESIZED_PATH}/`, '');
                    containerName = STORAGE_CONTAINER_RESIZED_PATH;
                }
                await imageRepo.delete(image);
                await removeFile(containerName, tempFileName);
            }
            return response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: `${fileName} deleted successfully` });
        }
        else if (images.length) {
            throw new rest_1.HttpErrors.Unauthorized('You do not have the rights to remove this image');
        }
        else {
            throw new rest_1.HttpErrors.NotFound('Image not found');
        }
    }
};
tslib_1.__decorate([
    service_proxy_1.serviceProxy('Storage'),
    tslib_1.__metadata("design:type", Object)
], ImageController.prototype, "storageService", void 0);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/images/{fileName}', {
        responses: {
            '200': {
                description: 'Upload a image into Storage Container',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.File } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__param(1, rest_1.param.query.boolean('override')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageController.prototype, "upload", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/images/{fileName}', {
        responses: {
            '200': {
                description: 'Download a File within specified Container',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__param(1, rest_1.param.query.number('width')),
    tslib_1.__param(2, rest_1.param.query.number('height')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageController.prototype, "download", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/images/{fileName}', {
        responses: {
            '200': {
                description: 'Booking model instance',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageController.prototype, "deleteByName", null);
ImageController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(3, repository_1.repository(repositories_1.ImageRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Function, repositories_1.ImageRepository])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map