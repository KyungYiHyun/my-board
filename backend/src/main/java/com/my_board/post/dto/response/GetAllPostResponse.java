package com.my_board.post.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GetAllPostResponse {

    private Long postId;
    private String title;
    private String nickname;
    private int views;
    private LocalDateTime createdAt;

}
