package com.my_board.post.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.my_board.post.entity.Post;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GetPostResponse {

    private Long postId;
    private String title;
    private String content;
    private int views;
    private String nickname;
    @JsonProperty("isEdited")
    private boolean isEdited;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int commentCount;
    private Long memberId;

}
