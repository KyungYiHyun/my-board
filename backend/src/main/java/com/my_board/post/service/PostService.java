package com.my_board.post.service;

import com.my_board.common.exception.BusinessException;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.dto.response.CreateAndUpdatePostResponse;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.entity.Post;
import com.my_board.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.my_board.common.dto.BaseResponseStatus.*;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    public CreateAndUpdatePostResponse createPost(CreateAndUpdatePostRequest request) {
        Post post = Post.toEntity(request);
        postMapper.createPost(post);
        return CreateAndUpdatePostResponse.of(post.getId());
    }

    public GetPostResponse getPost(Long postId) {
        GetPostResponse response = postMapper.findById(postId).orElseThrow(() -> {
            throw new BusinessException(NOT_FOUND_POST);
        });

        return response;

    }

    public List<GetAllPostResponse> getAllPosts() {
        return postMapper.getAllPosts();
    }

    public void deletePost(Long postId) {
        postMapper.deletePost(postId);
    }

    public CreateAndUpdatePostResponse updatePost(Long postId, CreateAndUpdatePostRequest request) {
        Post post = Post.toEntity(request);
        int row = postMapper.updatePost(post, postId);
        if (row == 0) {
            throw new BusinessException(NOT_FOUND_POST);
        }
        return CreateAndUpdatePostResponse.of(postId);
    }
}
