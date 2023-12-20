import { Action } from 'redux';
import { Observable, Subscription } from 'rxjs';
import { Streamer } from './type';
/**
 * 合并 streamers
 */
export declare function combineStreamers<A extends Action = Action>(...streamers: Streamer[]): (observable$: Observable<A>) => Subscription;
