package com.my_board.post_reaction.dto.response;

import com.my_board.post_reaction.entity.ReactionType;
import lombok.Data;

@Data
public class GetReactionCountResponse {
    private int likeCount;
    private int dislikeCount;
    private ReactionType type;

    public GetReactionCountResponse(int likeCount, int dislikeCount,ReactionType type) {
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.type = type;
    }
}
