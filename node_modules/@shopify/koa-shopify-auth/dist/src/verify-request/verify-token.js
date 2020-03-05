"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var network_1 = require("@shopify/network");
var index_1 = require("../index");
var utilities_1 = require("./utilities");
function verifyToken(routes) {
    return function verifyTokenMiddleware(ctx, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var session, response;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        session = ctx.session;
                        if (!(session && session.accessToken)) return [3 /*break*/, 3];
                        ctx.cookies.set(index_1.TOP_LEVEL_OAUTH_COOKIE_NAME);
                        return [4 /*yield*/, fetch("https://" + session.shop + "/admin/metafields.json", {
                                method: network_1.Method.Post,
                                headers: (_a = {},
                                    _a[network_1.Header.ContentType] = 'application/json',
                                    _a['X-Shopify-Access-Token'] = session.accessToken,
                                    _a),
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.status === network_1.StatusCode.Unauthorized) {
                            utilities_1.redirectToAuth(routes, ctx);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, next()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        ctx.cookies.set(index_1.TEST_COOKIE_NAME, '1');
                        utilities_1.redirectToAuth(routes, ctx);
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.verifyToken = verifyToken;
