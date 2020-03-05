"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var querystring_1 = tslib_1.__importDefault(require("querystring"));
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var safe_compare_1 = tslib_1.__importDefault(require("safe-compare"));
function validateHmac(hmac, secret, query) {
    var _hmac = query.hmac, _signature = query.signature, map = tslib_1.__rest(query, ["hmac", "signature"]);
    var orderedMap = Object.keys(map)
        .sort(function (value1, value2) { return value1.localeCompare(value2); })
        .reduce(function (accum, key) {
        accum[key] = map[key];
        return accum;
    }, {});
    var message = querystring_1.default.stringify(orderedMap);
    var generatedHash = crypto_1.default
        .createHmac('sha256', secret)
        .update(message)
        .digest('hex');
    return safe_compare_1.default(generatedHash, hmac);
}
exports.default = validateHmac;
