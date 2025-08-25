package com.my_board.comment.controller;


import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.comment.dto.response.CreateAndUpdateCommentResponse;
import com.my_board.comment.dto.response.GetCommentsResponse;
import com.my_board.comment.service.CommentService;
import com.my_board.common.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseEntity<BaseResponse<CreateAndUpdateCommentResponse>> createComment(@PathVariable Long postId,
                                                                                      @RequestBody CreateAndUpdateCommentRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(commentService.createComment(postId, request)));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BaseResponse<List<GetCommentsResponse>>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(new BaseResponse<>(commentService.getComments(postId)));
    }
}
