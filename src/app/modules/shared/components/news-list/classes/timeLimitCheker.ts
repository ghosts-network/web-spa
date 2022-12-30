import {NewsFeedPublication, PublicationComment} from '@gn/api';
import {Injectable} from '@angular/core';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class TimeLimitChecker {
    private readonly timeLimitComment: number;
    private readonly timeLimitPublication: number;

    constructor() {
        this.timeLimitComment = config.time_limit_to_update.comments;
        this.timeLimitPublication = config.time_limit_to_update.publications;
    }

    public isCommentEnabledToEdit(comment: PublicationComment): boolean {
        const createdOnWithTimeLimit = new Date(comment.createdOn);
        createdOnWithTimeLimit.setSeconds(createdOnWithTimeLimit.getSeconds() + this.timeLimitComment);

        return createdOnWithTimeLimit > new Date();
    }

    public isPublicationEnabledToEdit(publication: NewsFeedPublication): boolean {
        const createdOnWithTimeLimit = new Date(publication.createdOn);
        createdOnWithTimeLimit.setSeconds(createdOnWithTimeLimit.getSeconds() + this.timeLimitPublication);

        return createdOnWithTimeLimit > new Date();
    }
}
