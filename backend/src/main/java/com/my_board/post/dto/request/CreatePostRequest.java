package com.my_board.post.dto.request;

import lombok.Data;

@Data
public class CreatePostRequest {
    private String title;
    private String content;
    private Long memberId;
}
