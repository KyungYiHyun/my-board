package com.my_board.comment.service;

import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.comment.dto.response.CreateAndUpdateCommentResponse;
import com.my_board.comment.dto.response.GetCommentsResponse;
import com.my_board.comment.entity.Comment;
import com.my_board.comment.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    public CreateAndUpdateCommentResponse createComment(Long postId, CreateAndUpdateCommentRequest request) {
        commentMapper.createComment(postId, Comment.toEntity(request));
        return CreateAndUpdateCommentResponse.of(postId);
    }


    public List<GetCommentsResponse> getComments(Long postId) {
        return commentMapper.getComments(postId);
    }
}
