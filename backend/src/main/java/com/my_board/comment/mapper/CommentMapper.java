package com.my_board.comment.mapper;

import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.comment.dto.response.GetCommentsResponse;
import com.my_board.comment.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    void createComment(@Param("postId") Long postId, @Param("comment") Comment comment);

    List<GetCommentsResponse> getComments(Long postId);
}
