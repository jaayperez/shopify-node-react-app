"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var querystring_1 = tslib_1.__importDefault(require("querystring"));
var errors_1 = tslib_1.__importDefault(require("./errors"));
var validate_hmac_1 = tslib_1.__importDefault(require("./validate-hmac"));
function createOAuthCallback(config) {
    return function oAuthCallback(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, cookies, code, hmac, shop, nonce, apiKey, secret, afterAuth, accessTokenQuery, accessTokenResponse, accessTokenData, accessToken;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = ctx.query, cookies = ctx.cookies;
                        code = query.code, hmac = query.hmac, shop = query.shop, nonce = query.state;
                        apiKey = config.apiKey, secret = config.secret, afterAuth = config.afterAuth;
                        if (nonce == null || cookies.get('shopifyNonce') !== nonce) {
                            ctx.throw(403, errors_1.default.NonceMatchFailed);
                        }
                        if (shop == null) {
                            ctx.throw(400, errors_1.default.ShopParamMissing);
                            return [2 /*return*/];
                        }
                        if (validate_hmac_1.default(hmac, secret, query) === false) {
                            ctx.throw(400, errors_1.default.InvalidHmac);
                            return [2 /*return*/];
                        }
                        accessTokenQuery = querystring_1.default.stringify({
                            code: code,
                            client_id: apiKey,
                            client_secret: secret,
                        });
                        return [4 /*yield*/, fetch("https://" + shop + "/admin/oauth/access_token", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Content-Length': Buffer.byteLength(accessTokenQuery).toString(),
                                },
                                body: accessTokenQuery,
                            })];
                    case 1:
                        accessTokenResponse = _a.sent();
                        if (!accessTokenResponse.ok) {
                            ctx.throw(401, errors_1.default.AccessTokenFetchFailure);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, accessTokenResponse.json()];
                    case 2:
                        accessTokenData = _a.sent();
                        accessToken = accessTokenData.access_token;
                        if (ctx.session) {
                            ctx.session.shop = shop;
                            ctx.session.accessToken = accessToken;
                        }
                        ctx.state.shopify = {
                            shop: shop,
                            accessToken: accessToken,
                        };
                        if (!afterAuth) return [3 /*break*/, 4];
                        return [4 /*yield*/, afterAuth(ctx)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = createOAuthCallback;
