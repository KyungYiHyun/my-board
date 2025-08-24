package com.my_board.post.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatePostResponse {
    private Long postId;

    public static CreatePostResponse from(Long postId) {
        return CreatePostResponse.builder()
                .postId(postId)
                .build();
    }
}
