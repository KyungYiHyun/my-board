package com.my_board.comment.service;

import com.my_board.comment.dto.request.CreateAndUpdateCommentRequest;
import com.my_board.comment.dto.response.CreateAndUpdateCommentResponse;
import com.my_board.comment.dto.response.GetCommentsResponse;
import com.my_board.comment.mapper.CommentMapper;
import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.dto.response.MemberSignUpResponse;
import com.my_board.member.service.MemberService;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private MemberService memberService;
    @Autowired
    private PostService postService;

    Long memberId;

    @BeforeEach
    void setUp() {
        MemberSignupRequest memberSignupRequest = new MemberSignupRequest();
        memberSignupRequest.setLoginId("testMember1");
        memberSignupRequest.setMemberName("testMember1");
        memberSignupRequest.setBirth(LocalDate.of(2000, 3, 4));
        memberSignupRequest.setPassword("12345");
        memberSignupRequest.setNickname("memberNick1");

        MemberSignUpResponse memberSignUpResponse = memberService.signup(memberSignupRequest);
        memberId = memberSignUpResponse.getMemberId();
    }

    @Test
    @DisplayName("댓글 생성 및 조회 성공")
    void createAndGetComments() {
        // given: 글 생성
        CreateAndUpdatePostRequest postRequest = new CreateAndUpdatePostRequest();
        postRequest.setTitle("테스트 글");
        postRequest.setContent("테스트 내용");
        postRequest.setMemberId(memberId);
        Long postId = postService.createPost(postRequest).getPostId();

        // given: 댓글 작성
        CreateAndUpdateCommentRequest commentRequest = new CreateAndUpdateCommentRequest();
        commentRequest.setMemberId(memberId);
        commentRequest.setContent("첫 댓글");

        CreateAndUpdateCommentResponse commentResponse = commentService.createComment(postId, commentRequest);

        // when: 댓글 조회
        List<GetCommentsResponse> comments = commentService.getComments(postId);

        // then
        assertThat(comments).isNotEmpty();
        GetCommentsResponse comment = comments.get(0);
        assertThat(comment.getContent()).isEqualTo("첫 댓글");
        assertThat(comment.getNickname()).isNotNull();
        assertThat(comment.getCreatedAt()).isNotNull();
    }
}