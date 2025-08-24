package com.my_board.post.service;

import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.mapper.PostMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired
    private PostService postService;

    @Autowired
    private PostMapper postMapper;


    @Test
    @DisplayName("글 작성 잘됨")
    void createPostTest() {
        CreatePostRequest request = new CreatePostRequest();
        request.setTitle("글 제목");
        request.setContent("글 내용");

        CreatePostResponse response = postService.createPost(request);

    }

}