package com.my_board.comment.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class GetCommentsResponse {
    private Long commentId;
    private Long memberId;
    @JsonProperty("isEdited")
    private boolean isEdited;
    private String nickname;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
