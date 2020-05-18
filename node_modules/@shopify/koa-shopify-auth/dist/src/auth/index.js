"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var create_oauth_start_1 = tslib_1.__importDefault(require("./create-oauth-start"));
var create_oauth_callback_1 = tslib_1.__importDefault(require("./create-oauth-callback"));
var create_enable_cookies_1 = tslib_1.__importDefault(require("./create-enable-cookies"));
var create_top_level_oauth_redirect_1 = tslib_1.__importDefault(require("./create-top-level-oauth-redirect"));
var create_request_storage_access_1 = tslib_1.__importDefault(require("./create-request-storage-access"));
var DEFAULT_MYSHOPIFY_DOMAIN = 'myshopify.com';
var DEFAULT_ACCESS_MODE = 'online';
exports.TOP_LEVEL_OAUTH_COOKIE_NAME = 'shopifyTopLevelOAuth';
exports.TEST_COOKIE_NAME = 'shopifyTestCookie';
exports.GRANTED_STORAGE_ACCESS_COOKIE_NAME = 'shopify.granted_storage_access';
function hasCookieAccess(_a) {
    var cookies = _a.cookies;
    return Boolean(cookies.get(exports.TEST_COOKIE_NAME));
}
function grantedStorageAccess(_a) {
    var cookies = _a.cookies;
    return Boolean(cookies.get(exports.GRANTED_STORAGE_ACCESS_COOKIE_NAME));
}
function shouldPerformInlineOAuth(_a) {
    var cookies = _a.cookies;
    return Boolean(cookies.get(exports.TOP_LEVEL_OAUTH_COOKIE_NAME));
}
function createShopifyAuth(options) {
    var config = tslib_1.__assign({ scopes: [], prefix: '', myShopifyDomain: DEFAULT_MYSHOPIFY_DOMAIN, accessMode: DEFAULT_ACCESS_MODE }, options);
    var prefix = config.prefix;
    var oAuthStartPath = prefix + "/auth";
    var oAuthCallbackPath = oAuthStartPath + "/callback";
    var oAuthStart = create_oauth_start_1.default(config, oAuthCallbackPath);
    var oAuthCallback = create_oauth_callback_1.default(config);
    var inlineOAuthPath = prefix + "/auth/inline";
    var topLevelOAuthRedirect = create_top_level_oauth_redirect_1.default(config.apiKey, inlineOAuthPath);
    var enableCookiesPath = oAuthStartPath + "/enable_cookies";
    var enableCookies = create_enable_cookies_1.default(config);
    var requestStorageAccess = create_request_storage_access_1.default(config);
    return function shopifyAuth(ctx, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.cookies.secure = true;
                        if (!(ctx.path === oAuthStartPath &&
                            !hasCookieAccess(ctx) &&
                            !grantedStorageAccess(ctx))) return [3 /*break*/, 2];
                        return [4 /*yield*/, requestStorageAccess(ctx)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!(ctx.path === inlineOAuthPath ||
                            (ctx.path === oAuthStartPath && shouldPerformInlineOAuth(ctx)))) return [3 /*break*/, 4];
                        return [4 /*yield*/, oAuthStart(ctx)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        if (!(ctx.path === oAuthStartPath)) return [3 /*break*/, 6];
                        return [4 /*yield*/, topLevelOAuthRedirect(ctx)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        if (!(ctx.path === oAuthCallbackPath)) return [3 /*break*/, 8];
                        return [4 /*yield*/, oAuthCallback(ctx)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                    case 8:
                        if (!(ctx.path === enableCookiesPath)) return [3 /*break*/, 10];
                        return [4 /*yield*/, enableCookies(ctx)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                    case 10: return [4 /*yield*/, next()];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = createShopifyAuth;
var errors_1 = require("./errors");
exports.Error = errors_1.default;
var validate_hmac_1 = require("./validate-hmac");
exports.validateHMAC = validate_hmac_1.default;
