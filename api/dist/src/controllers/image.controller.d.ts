/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Request, Response } from '@loopback/rest';
import { ImageRepository } from '../repositories';
export declare class ImageController {
    request: Request;
    response: Response;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    imageRepository: ImageRepository;
    private storageService;
    constructor(request: Request, response: Response, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, imageRepository: ImageRepository);
    upload(fileName: string, override?: boolean): Promise<any>;
    download(fileName: string, width: number, height: number): Promise<any>;
    deleteByName(fileName: string): Promise<any>;
}
