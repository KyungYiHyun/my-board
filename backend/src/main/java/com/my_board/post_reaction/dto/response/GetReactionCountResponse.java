package com.my_board.post_reaction.dto.response;

import lombok.Data;

@Data
public class GetReactionCountResponse {
    private int likeCount;
    private int dislikeCount;

    public GetReactionCountResponse(int likeCount, int dislikeCount) {
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
    }
}
