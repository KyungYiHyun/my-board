package com.my_board.post.controller;

import com.github.pagehelper.PageInfo;
import com.my_board.common.dto.BaseResponse;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.dto.response.CreateAndUpdatePostResponse;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;


    // 글 생성
    @PostMapping("")
    public ResponseEntity<BaseResponse<CreateAndUpdatePostResponse>> createPost(@RequestBody CreateAndUpdatePostRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(postService.createPost(request)));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BaseResponse<GetPostResponse>> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok(new BaseResponse<>(postService.getPost(postId)));
    }

    @GetMapping("")
    public ResponseEntity<BaseResponse<PageInfo<GetAllPostResponse>>> getAllPosts(@RequestParam("page") int page) {
        return ResponseEntity.ok(new BaseResponse<>(postService.getAllPosts(page)));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<BaseResponse<Void>> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok(new BaseResponse<>());
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<BaseResponse<CreateAndUpdatePostResponse>> updatePost(@PathVariable Long postId,
                                                                                @RequestBody CreateAndUpdatePostRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(postService.updatePost(postId, request)));
    }


}
