package com.my_board.comment.entity;


import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.common.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Comment extends BaseEntity {
    private Long id;
    private Long memberId;
    private Long postId;
    private String content;

    @Builder
    public Comment(Long id, Long memberId, Long postId, String content) {
        this.id = id;
        this.memberId = memberId;
        this.postId = postId;
        this.content = content;
    }

    public static Comment toEntity(CreateAndUpdateCommentRequest request) {
        return Comment.builder()
                .content(request.getContent())
                .memberId(request.getMemberId())
                .build();
    }
}
