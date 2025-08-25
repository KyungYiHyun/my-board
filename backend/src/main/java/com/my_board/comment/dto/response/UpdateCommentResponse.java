package com.my_board.comment.dto.response;


import lombok.Builder;
import lombok.Data;

@Data
public class UpdateCommentResponse {
    private Long commentId;

    @Builder
    public UpdateCommentResponse(Long commentId) {
        this.commentId = commentId;
    }

    public static UpdateCommentResponse of(Long commentId) {
        return UpdateCommentResponse.builder()
                .commentId(commentId)
                .build();
    }
}
