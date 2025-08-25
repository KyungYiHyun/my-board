package com.my_board.post.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateAndUpdatePostResponse {
    private Long postId;

    public static CreateAndUpdatePostResponse of(Long postId) {
        return CreateAndUpdatePostResponse.builder()
                .postId(postId)
                .build();
    }
}
