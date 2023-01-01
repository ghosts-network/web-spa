import {UserInfo} from '@gn/api';
import {RelationsActions} from './relations-actions';

export interface RelationsSummary {
  friends: Array<UserInfo>;
  followers: Array<UserInfo>;
  incomingRequests: Array<UserInfo> | null;
  outgoingRequests: Array<UserInfo> | null;
  actions: RelationsActions;
}
