package com.my_board.comment.controller;


import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.comment.dto.response.CreateAndUpdateCommentResponse;
import com.my_board.comment.service.CommentService;
import com.my_board.common.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
