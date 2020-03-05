"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error;
(function (Error) {
    Error["ShopParamMissing"] = "Expected a valid shop query parameter";
    Error["InvalidHmac"] = "HMAC validation failed";
    Error["AccessTokenFetchFailure"] = "Could not fetch access token";
    Error["NonceMatchFailed"] = "Request origin could not be verified";
})(Error || (Error = {}));
exports.default = Error;
