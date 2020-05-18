import { Context } from 'koa';
import { OAuthStartOptions, NextFunction } from '../types';
export declare const TOP_LEVEL_OAUTH_COOKIE_NAME = "shopifyTopLevelOAuth";
export declare const TEST_COOKIE_NAME = "shopifyTestCookie";
export declare const GRANTED_STORAGE_ACCESS_COOKIE_NAME = "shopify.granted_storage_access";
export default function createShopifyAuth(options: OAuthStartOptions): (ctx: Context, next: NextFunction) => Promise<void>;
export { default as Error } from './errors';
export { default as validateHMAC } from './validate-hmac';
//# sourceMappingURL=index.d.ts.map