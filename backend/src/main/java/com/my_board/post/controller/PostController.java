package com.my_board.post.controller;

import com.my_board.common.dto.BaseResponse;
import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;


    // 글 생성
    @PostMapping("")
    public ResponseEntity<BaseResponse<CreatePostResponse>> createPost(@RequestBody CreatePostRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(postService.createPost(request)));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BaseResponse<GetPostResponse>> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok(new BaseResponse<>(postService.getPost(postId)));
    }

    @GetMapping("")
    public ResponseEntity<BaseResponse<List<GetAllPostResponse>>> getAllPosts() {
        return ResponseEntity.ok(new BaseResponse<>(postService.getAllPosts()));
    }
}
