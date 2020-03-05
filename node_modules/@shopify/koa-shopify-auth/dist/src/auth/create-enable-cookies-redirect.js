"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var create_top_level_redirect_1 = tslib_1.__importDefault(require("./create-top-level-redirect"));
var cookie_options_1 = tslib_1.__importDefault(require("./cookie-options"));
var index_1 = require("./index");
function createEnableCookiesRedirect(apiKey, path) {
    var redirect = create_top_level_redirect_1.default(apiKey, path);
    return function topLevelOAuthRedirect(ctx) {
        // This is to avoid a redirect loop if the app doesn't use verifyRequest or set the test cookie elsewhere.
        ctx.cookies.set(index_1.TEST_COOKIE_NAME, '1', cookie_options_1.default(ctx));
        redirect(ctx);
    };
}
exports.default = createEnableCookiesRedirect;
