package com.my_board.post.service;

import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.entity.Post;
import com.my_board.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;
    public CreatePostResponse createPost(CreatePostRequest request) {
        Post post = Post.toEntity(request);
        postMapper.createPost(post);
        return CreatePostResponse.from(post.getId());
    }
}
