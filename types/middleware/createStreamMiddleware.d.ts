import { Action } from 'redux';
import { StreamMiddleware } from './type';
export declare function createStreamMiddleware<A extends Action = Action, S = any>(): StreamMiddleware<A, S>;
