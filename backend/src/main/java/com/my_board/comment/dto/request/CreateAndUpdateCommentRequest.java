package com.my_board.comment.dto.request;


import lombok.Data;

@Data
public class CreateAndUpdateCommentRequest {
    private Long memberId;
    private String content;
}
