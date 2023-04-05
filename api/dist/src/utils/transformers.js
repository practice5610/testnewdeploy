"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformGeolocForSearchEngine = void 0;
// TODO: update when new search is implemented
// this is for the old search, I do not know if elastic search will need it
// so I am including this inline return type to fix lint error.
// If this is still used when elastic search is implemented we should define better return type
const transformGeolocForSearchEngine = (geolocation) => {
    return {
        lat: geolocation ? geolocation.lat : undefined,
        lon: geolocation ? geolocation.lng : undefined,
    };
};
exports.transformGeolocForSearchEngine = transformGeolocForSearchEngine;
//# sourceMappingURL=transformers.js.map