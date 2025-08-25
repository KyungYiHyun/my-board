package com.my_board.comment.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateAndUpdateCommentResponse {
    private Long postId;

    public CreateAndUpdateCommentResponse(Long postId) {
        this.postId = postId;
    }

    public static CreateAndUpdateCommentResponse of(Long postId) {
        return CreateAndUpdateCommentResponse.builder()
                .postId(postId)
                .build();
    }
}
