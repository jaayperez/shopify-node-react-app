"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var querystring_1 = tslib_1.__importDefault(require("querystring"));
var nonce_1 = tslib_1.__importDefault(require("nonce"));
var cookie_options_1 = tslib_1.__importDefault(require("./cookie-options"));
var createNonce = nonce_1.default();
function oAuthQueryString(ctx, options, callbackPath) {
    var host = ctx.host, cookies = ctx.cookies;
    var _a = options.scopes, scopes = _a === void 0 ? [] : _a, apiKey = options.apiKey, accessMode = options.accessMode;
    var requestNonce = createNonce();
    cookies.set('shopifyNonce', requestNonce, cookie_options_1.default(ctx));
    /* eslint-disable @typescript-eslint/camelcase */
    var redirectParams = {
        state: requestNonce,
        scope: scopes.join(', '),
        client_id: apiKey,
        redirect_uri: "https://" + host + callbackPath,
    };
    /* eslint-enable @typescript-eslint/camelcase */
    if (accessMode === 'online') {
        redirectParams['grant_options[]'] = 'per-user';
    }
    return querystring_1.default.stringify(redirectParams);
}
exports.default = oAuthQueryString;
