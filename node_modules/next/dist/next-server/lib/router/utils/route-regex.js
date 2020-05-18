"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this isn't importing the escape-string-regex module
// to reduce bytes
function escapeRegex(str) {
    return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}
function getRouteRegex(normalizedRoute) {
    // Escape all characters that could be considered RegEx
    const escapedRoute = escapeRegex(normalizedRoute.replace(/\/$/, '') || '/');
    const groups = {};
    let groupIndex = 1;
    const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
        const isCatchAll = /^(\\\.){3}/.test($1);
        groups[$1
            // Un-escape key
            .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1')
            .replace(/^\.{3}/, '')
        // eslint-disable-next-line no-sequences
        ] = { pos: groupIndex++, repeat: isCatchAll };
        return isCatchAll ? '/(.+?)' : '/([^/]+?)';
    });
    let namedParameterizedRoute;
    // dead code eliminate for browser since it's only needed
    // while generating routes-manifest
    if (typeof window === 'undefined') {
        namedParameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
            const isCatchAll = /^(\\\.){3}/.test($1);
            const key = $1
                // Un-escape key
                .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1')
                .replace(/^\.{3}/, '');
            return isCatchAll
                ? `/(?<${escapeRegex(key)}>.+?)`
                : `/(?<${escapeRegex(key)}>[^/]+?)`;
        });
    }
    return Object.assign({ re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'), groups }, (namedParameterizedRoute
        ? {
            namedRegex: `^${namedParameterizedRoute}(?:/)?$`,
        }
        : {}));
}
exports.getRouteRegex = getRouteRegex;
