package com.my_board.post_reaction.controller;

import com.my_board.common.dto.BaseResponse;
import com.my_board.post_reaction.dto.response.GetReactionCountResponse;
import com.my_board.post_reaction.dto.response.LikePostResponse;
import com.my_board.post_reaction.dto.request.LikePostRequest;
import com.my_board.post_reaction.service.PostReactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostReactionController {

    private final PostReactionService postReactionService;

    @PostMapping("/like")
    public ResponseEntity<BaseResponse<Void>> likePost(@RequestBody LikePostRequest request) {
        postReactionService.likePost(request);
        return ResponseEntity.ok(new BaseResponse<>());
    }

    @GetMapping("/like/{postId}")
    public ResponseEntity<BaseResponse<GetReactionCountResponse>> getReactionCount(@PathVariable Long postId) {
        return ResponseEntity.ok(new BaseResponse<>(postReactionService.getReactionCounts(postId)));
    }
}
