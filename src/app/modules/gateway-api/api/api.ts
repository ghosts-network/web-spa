export * from './newsFeed.service';
import { NewsFeedService } from './newsFeed.service';
import { RelationsService } from './relations.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [NewsFeedService, RelationsService, UsersService];
