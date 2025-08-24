package com.my_board.post.service;

import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.dto.response.MemberSignUpResponse;
import com.my_board.member.service.MemberService;
import com.my_board.post.dto.request.CreatePostRequest;
import com.my_board.post.dto.response.CreatePostResponse;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.mapper.PostMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired
    private PostService postService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private PostMapper postMapper;

    CreatePostRequest createPostRequest;
    CreatePostRequest createPostRequest2;

    Long postId;


    @BeforeEach
    void setUp() {
        MemberSignupRequest memberSignupRequest = new MemberSignupRequest();
        memberSignupRequest.setLoginId("member1");
        memberSignupRequest.setMemberName("member1");
        memberSignupRequest.setBirth(LocalDate.of(2000,3,4));
        memberSignupRequest.setPassword("12345");
        memberSignupRequest.setNickname("memberNick1");

        MemberSignUpResponse memberSignUpResponse = memberService.signup(memberSignupRequest);

        createPostRequest = new CreatePostRequest();
        createPostRequest.setTitle("조회용 제목1");
        createPostRequest.setContent("조회용 내용1");
        createPostRequest.setMemberId(memberSignUpResponse.getMemberId());
        postId = postService.createPost(createPostRequest).getPostId();

        createPostRequest2= new CreatePostRequest();
        createPostRequest2.setTitle("조회용 제목2");
        createPostRequest2.setContent("조회용 내용2");
        createPostRequest2.setMemberId(memberSignUpResponse.getMemberId());
        postService.createPost(createPostRequest2);

    }

    @Test
    @DisplayName("글 조회 성공")
    void createPost() {
        GetPostResponse getPostResponse = postService.getPost(postId);
        assertThat(createPostRequest.getTitle()).isEqualTo(getPostResponse.getTitle());
        assertThat(createPostRequest.getContent()).isEqualTo(getPostResponse.getContent());
    }

    @Test
    @DisplayName("글 전체 조회 성공")
    void getAllPosts() {
        List<GetAllPostResponse> allPosts = postService.getAllPosts();
        assertThat(allPosts).isNotEmpty();
        assertThat(allPosts.size()).isGreaterThan(2);

    }
}