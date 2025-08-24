package com.my_board.post.controller;

import com.my_board.common.dto.BaseResponse;
import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @PostMapping("")
    public ResponseEntity<BaseResponse<CreatePostResponse>> createPost(@RequestBody CreatePostRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(postService.createPost(request)));
    }
}
