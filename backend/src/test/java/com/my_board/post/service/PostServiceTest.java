package com.my_board.post.service;

import com.github.pagehelper.PageInfo;
import com.my_board.common.exception.BusinessException;
import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.dto.response.MemberSignUpResponse;
import com.my_board.member.service.MemberService;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.mapper.PostMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired
    private PostService postService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private PostMapper postMapper;

    CreateAndUpdatePostRequest createAndUpdatePostRequest;
    CreateAndUpdatePostRequest createAndUpdatePostRequest2;

    Long postId;
    Long memberId;


    @BeforeEach
    void setUp() {
        MemberSignupRequest memberSignupRequest = new MemberSignupRequest();
        memberSignupRequest.setLoginId("member1");
        memberSignupRequest.setMemberName("member1");
        memberSignupRequest.setBirth(LocalDate.of(2000, 3, 4));
        memberSignupRequest.setPassword("12345");
        memberSignupRequest.setNickname("memberNick1");

        MemberSignUpResponse memberSignUpResponse = memberService.signup(memberSignupRequest);
        memberId = memberSignUpResponse.getMemberId();
        createAndUpdatePostRequest = new CreateAndUpdatePostRequest();
        createAndUpdatePostRequest.setTitle("조회용 제목1");
        createAndUpdatePostRequest.setContent("조회용 내용1");
        createAndUpdatePostRequest.setMemberId(memberSignUpResponse.getMemberId());
        postId = postService.createPost(createAndUpdatePostRequest).getPostId();

        createAndUpdatePostRequest2 = new CreateAndUpdatePostRequest();
        createAndUpdatePostRequest2.setTitle("조회용 제목2");
        createAndUpdatePostRequest2.setContent("조회용 내용2");
        createAndUpdatePostRequest2.setMemberId(memberSignUpResponse.getMemberId());
        postService.createPost(createAndUpdatePostRequest2);

    }

    @Test
    @DisplayName("글 조회 성공")
    void createPost() {
        GetPostResponse getPostResponse = postService.getPost(postId);
        assertThat(createAndUpdatePostRequest.getTitle()).isEqualTo(getPostResponse.getTitle());
        assertThat(createAndUpdatePostRequest.getContent()).isEqualTo(getPostResponse.getContent());
    }

    @Test
    @DisplayName("글 전체 조회 성공")
    void getAllPosts() {
        PageInfo<GetAllPostResponse> allPosts = postService.getAllPosts(1);
        System.out.println("allPosts = " + allPosts);
//        assertThat(allPosts).isNotEmpty();
//        assertThat(allPosts.size()).isEqualTo(2);
    }

    @Test
    @DisplayName("글 삭제 성공")
    void deletePost() {
        // 1. 글 생성
        CreateAndUpdatePostRequest request = new CreateAndUpdatePostRequest();
        request.setTitle("삭제할 글 제목");
        request.setContent("삭제할 글 내용");
        request.setMemberId(memberId);

        Long postId = postService.createPost(request).getPostId();

        // 2. 삭제 실행
        postService.deletePost(postId);

        // 3. 삭제 검증 → 조회 시 예외 발생해야 함
        assertThatThrownBy(() -> postService.getPost(postId))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("글을 찾을 수 없습니다");
    }

    @Test
    @DisplayName("글 수정 성공")
    void updatePostSuccess() {
        // given: 글 생성
        CreateAndUpdatePostRequest request = new CreateAndUpdatePostRequest();
        request.setTitle("원래 제목");
        request.setContent("원래 내용");
        request.setMemberId(memberId);

        Long postId = postService.createPost(request).getPostId();

        // when: 글 수정
        String newTitle = "수정된 제목";
        String newContent = "수정된 내용";
        CreateAndUpdatePostRequest createAndUpdatePostRequest = new CreateAndUpdatePostRequest();
        createAndUpdatePostRequest.setTitle(newTitle);
        createAndUpdatePostRequest.setContent(newContent);
        postService.updatePost(postId, createAndUpdatePostRequest);

        // then: 수정된 값이 반영되었는지 조회 확인
        GetPostResponse updatedPost = postService.getPost(postId);

        assertThat(updatedPost.getTitle()).isEqualTo(newTitle);
        assertThat(updatedPost.getContent()).isEqualTo(newContent);
    }
    @Test
    void testPagingFirstPage() {
        int page = 1;
        PageInfo<GetAllPostResponse> pageInfo = postService.getAllPosts(page);

        assertThat(pageInfo.getPages()).isEqualTo(1);
        assertThat(pageInfo.getList().size()).isEqualTo(2);
        assertThat(pageInfo.getPageSize()).isEqualTo(10);

    }

}