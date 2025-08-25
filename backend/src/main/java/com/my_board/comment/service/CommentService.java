package com.my_board.comment.service;

import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.comment.dto.response.CreateCommentResponse;
import com.my_board.comment.dto.response.GetCommentsResponse;
import com.my_board.comment.dto.response.UpdateCommentResponse;
import com.my_board.comment.entity.Comment;
import com.my_board.comment.mapper.CommentMapper;
import com.my_board.common.dto.BaseResponseStatus;
import com.my_board.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.my_board.common.dto.BaseResponseStatus.*;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    public CreateCommentResponse createComment(Long postId, CreateAndUpdateCommentRequest request) {
        Comment comment = Comment.toEntity(request);
        commentMapper.createComment(postId, comment);
        return CreateCommentResponse.of(postId, comment.getId());
    }


    public List<GetCommentsResponse> getComments(Long postId) {
        return commentMapper.getComments(postId);
    }

    public UpdateCommentResponse updateComment(Long commentId, CreateAndUpdateCommentRequest request) {
        int row = commentMapper.updateComment(commentId, Comment.toEntity(request));
        if (row == 0) {
            throw new BusinessException(NOT_FOUND_COMMENT);
        }
        return UpdateCommentResponse.of(commentId);
    }
}
