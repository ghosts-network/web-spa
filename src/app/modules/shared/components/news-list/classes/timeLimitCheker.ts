import {NewsFeedPublication, PublicationComment} from 'src/app/modules/gateway-api';
import {environment} from '../../../../../../environments/environment';

export class TimeLimitChecker {
    private readonly timeLimitComment: number;
    private readonly timeLimitPublication: number;

    constructor() {
        this.timeLimitComment = environment.time_limit_to_update.comments;
        this.timeLimitPublication = environment.time_limit_to_update.publications;
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
