"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function redirectionScript(_a) {
    var origin = _a.origin, redirectTo = _a.redirectTo, apiKey = _a.apiKey;
    return "\n    <script src=\"https://unpkg.com/@shopify/app-bridge@^1\"></script> <script type=\"text/javascript\">\n      document.addEventListener('DOMContentLoaded', function() {\n        if (window.top === window.self) {\n          // If the current window is the 'parent', change the URL by setting location.href\n          window.location.href = '" + redirectTo + "';\n        } else {\n          // If the current window is the 'child', change the parent's URL with postMessage\n          var AppBridge = window['app-bridge'];\n          var createApp = AppBridge.default;\n          var Redirect = AppBridge.actions.Redirect;\n          var app = createApp({\n            apiKey: '" + apiKey + "',\n            shopOrigin: '" + origin + "',\n          });\n          var redirect = Redirect.create(app);\n          redirect.dispatch(Redirect.Action.REMOTE, '" + redirectTo + "');\n        }\n      });\n    </script>\n  ";
}
exports.default = redirectionScript;
