package com.my_board.comment.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class GetCommentsResponse {
    private Long commentId;
    private Long memberId;
    @JsonProperty("isEdited")
    private boolean isEdited;
    @JsonProperty("isDeleted")
    private boolean isDeleted;
    private String nickname;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int depth;
    private Long parentId;
}
