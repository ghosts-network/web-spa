import { PublicationComment } from "src/app/modules/gateway-api";
import {environment} from "../../../../../../environments/environment";

export class TimeLimitCheker {
    private timeLimitComment: number;
    private timeLimitPublication: number;

    constructor() {
        this.timeLimitComment = environment.time_limit_to_update.comments;
        this.timeLimitPublication = environment.time_limit_to_update.publications
    }

    public isCommentEnabledToEdit(comment: PublicationComment): Boolean {
        let createdOnWithTimeLimit = new Date(comment.createdOn);
        createdOnWithTimeLimit.setSeconds(createdOnWithTimeLimit.getSeconds() + this.timeLimitComment)

        return createdOnWithTimeLimit > new Date();
    }
}