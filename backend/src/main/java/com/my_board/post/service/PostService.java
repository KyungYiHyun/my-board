package com.my_board.post.service;

import com.my_board.common.dto.BaseResponseStatus;
import com.my_board.common.exception.BusinessException;
import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.entity.Post;
import com.my_board.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.my_board.common.dto.BaseResponseStatus.*;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    public CreatePostResponse createPost(CreatePostRequest request) {
        Post post = Post.toEntity(request);
        postMapper.createPost(post);
        return CreatePostResponse.from(post.getId());
    }

    public GetPostResponse getPost(Long postId) {
        GetPostResponse response = postMapper.findById(postId).orElseThrow(() -> {
            throw new BusinessException(NOT_FOUND_POST);
        });

        return response;

    }
}
