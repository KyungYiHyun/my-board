package com.my_board.post_reaction.dto.request;

import com.my_board.post_reaction.entity.ReactionType;
import lombok.Data;

@Data
public class LikePostRequest {
    private Long memberId;
    private ReactionType type;
    private Long postId;

    public LikePostRequest(Long memberId, ReactionType type, Long postId) {
        this.memberId = memberId;
        this.type = type;
        this.postId = postId;
    }
}
