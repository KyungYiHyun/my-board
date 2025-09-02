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
    private Long parentId;
    private boolean isEdited;
    private boolean isDeleted;
    private int depth;

    @Builder
    public Comment(Long id, Long memberId, Long postId, String content,Long parentId) {
        this.id = id;
        this.memberId = memberId;
        this.postId = postId;
        this.content = content;
        this.parentId = parentId;
    }

    public static Comment toEntity(CreateAndUpdateCommentRequest request) {
        return Comment.builder()
                .content(request.getContent())
                .memberId(request.getMemberId())
                .parentId(request.getParentId())
                .build();
    }
}
