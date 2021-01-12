/**
 * GhostNetwork/Gateway API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CommentsShort } from './commentsShort';
import { ReactionShort } from './reactionShort';
import { UserInfo } from './userInfo';


export interface NewsFeedPublication {
    readonly id?: string | null;
    readonly content?: string | null;
    comments?: CommentsShort;
    reactions?: ReactionShort;
    author?: UserInfo;
}

