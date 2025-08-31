package com.my_board.post_reaction.service;

import com.my_board.post.mapper.PostMapper;
import com.my_board.post_reaction.dto.request.LikePostRequest;
import com.my_board.post_reaction.dto.response.GetReactionCountResponse;
import com.my_board.post_reaction.entity.PostReaction;
import com.my_board.post_reaction.entity.ReactionType;
import com.my_board.post_reaction.mapper.PostReactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.my_board.post_reaction.entity.ReactionType.*;

@Service
@RequiredArgsConstructor
public class PostReactionService {
    
    private final PostReactionMapper postReactionMapper;
    public void likePost(LikePostRequest request) {
        PostReaction reaction = postReactionMapper.findReaction(request.getMemberId(), request.getPostId());

        if (reaction != null) {
            if (reaction.getType() == request.getType()) {
                postReactionMapper.deleteReaction(reaction.getMemberId(), reaction.getPostId(), reaction.getType());
            } else {
                postReactionMapper.deleteReaction(reaction.getMemberId(), reaction.getPostId(), reaction.getType());
                PostReaction entity = PostReaction.toEntity(request);
                postReactionMapper.insertReaction(entity);
            }
        } else {
            PostReaction entity = PostReaction.toEntity(request);
            postReactionMapper.insertReaction(entity);
        }
    }

    public GetReactionCountResponse getReactionCounts(Long postId) {
        return new GetReactionCountResponse(postReactionMapper.countReaction(postId, LIKE), postReactionMapper.countReaction(postId, DISLIKE));
    }
}
