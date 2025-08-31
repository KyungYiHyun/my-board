package com.my_board.post_reaction.mapper;

import com.my_board.post_reaction.entity.PostReaction;
import com.my_board.post_reaction.entity.ReactionType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostReactionMapper {
    void insertReaction(PostReaction postReaction);

    void deleteReaction(@Param("memberId") Long memberId, @Param("postId") Long postId, @Param("type") ReactionType type);

    int countReaction(@Param("postId") Long postId, @Param("type") ReactionType type);

    PostReaction findReaction(@Param("memberId") Long memberId, @Param("postId") Long postId);

}
