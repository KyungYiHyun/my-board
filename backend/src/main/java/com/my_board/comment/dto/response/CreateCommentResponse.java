package com.my_board.comment.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCommentResponse {
    private Long postId;
    private Long commentId;

    public CreateCommentResponse(Long postId, Long commentId) {
        this.postId = postId;
        this.commentId = commentId;
    }

    public static CreateCommentResponse of(Long postId, Long commentId) {
        return CreateCommentResponse.builder()
                .postId(postId)
                .commentId(commentId)
                .build();
    }
}
