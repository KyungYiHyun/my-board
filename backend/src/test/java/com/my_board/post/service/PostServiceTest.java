package com.my_board.post.service;

import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.mapper.PostMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostServiceTest {

    @Autowired
    private PostService postService;

    @Autowired
    private PostMapper postMapper;

    CreatePostRequest createPostRequest;
    @BeforeEach
    void setUp() {
        createPostRequest = new CreatePostRequest();
        createPostRequest.setTitle("조회용 제목");
        createPostRequest.setContent("조회용 내용");
        createPostRequest.setMemberId(1L);
    }
    @Test
    @DisplayName("글 생성 및 조회 성공")
    void createPost() {
        Long postId = postService.createPost(createPostRequest).getPostId();

        GetPostResponse getPostResponse = postService.getPost(postId);

        assertThat(createPostRequest.getTitle()).isEqualTo(getPostResponse.getTitle());
        assertThat(createPostRequest.getContent()).isEqualTo(getPostResponse.getContent());
    }



}