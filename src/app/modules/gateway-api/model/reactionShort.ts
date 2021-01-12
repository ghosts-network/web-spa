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
import { ReactionType } from './reactionType';
import { UserReaction } from './userReaction';


export interface ReactionShort {
    readonly reactions?: Array<ReactionType> | null;
    readonly totalCount?: number;
    user?: UserReaction;
}

