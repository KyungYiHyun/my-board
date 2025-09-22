package com.my_board.post.dto.request;

import lombok.Data;

@Data
public class CreateAndUpdatePostRequest {
    private String title;
    private String content;
    private Long memberId;

    private Long categoryParentId;
    private Long categoryChildId;
}
