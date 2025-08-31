package com.my_board.post_reaction.entity;

import com.my_board.common.entity.BaseEntity;
import com.my_board.post_reaction.dto.request.LikePostRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostReaction extends BaseEntity {
    private Long id;
    private Long memberId;
    private Long postId;
    private ReactionType type;

    @Builder
    public PostReaction(Long id, Long memberId, Long postId, ReactionType type) {
        this.id = id;
        this.memberId = memberId;
        this.postId = postId;
        this.type = type;
    }

    public static PostReaction toEntity(LikePostRequest request) {
        return PostReaction.builder()
                .postId(request.getPostId())
                .memberId(request.getMemberId())
                .type(request.getType())
                .build();
        }
}
