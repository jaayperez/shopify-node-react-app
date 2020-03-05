import { Context } from 'koa';
import { NextFunction } from '../types';
import { Routes } from './types';
export declare function verifyToken(routes: Routes): (ctx: Context, next: NextFunction) => Promise<void>;
//# sourceMappingURL=verify-token.d.ts.map