package com.my_board.post.controller;

import com.github.pagehelper.PageInfo;
import com.my_board.common.dto.BaseResponse;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.dto.response.CreateAndUpdatePostResponse;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.service.PostService;
import com.my_board.post.service.ViewCookieService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    private final ViewCookieService viewCookieService;

    // 글 생성
    @PostMapping("")
    public ResponseEntity<BaseResponse<CreateAndUpdatePostResponse>> createPost(@RequestBody CreateAndUpdatePostRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(postService.createPost(request)));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BaseResponse<GetPostResponse>> getPost(@PathVariable Long postId,
                                                                 @CookieValue(value = "viewedPosts", required = false) String viewedPosts,
                                                                 HttpServletResponse response) {
        boolean isNewView = viewCookieService.checkAndUpdateViewPosts(postId, response, viewedPosts);
        if (isNewView) {
            postService.incrementView(postId);
        }
        return ResponseEntity.ok(new BaseResponse<>(postService.getPost(postId)));
    }

    @GetMapping("")
    public ResponseEntity<BaseResponse<PageInfo<GetAllPostResponse>>> getAllPosts(@RequestParam(name = "page", required = false) int page,
                                                                                  @RequestParam(name = "sort_index",required = false) String sortIndex,
                                                                                  @RequestParam(name = "order_type",required = false) String orderType,
                                                                                  @RequestParam(name = "keyword", required = false, defaultValue = "") String keyword) {
        return ResponseEntity.ok(new BaseResponse<>(postService.getAllPosts(page,sortIndex,orderType,keyword)));
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
