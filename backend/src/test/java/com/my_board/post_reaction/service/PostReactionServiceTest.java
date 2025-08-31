package com.my_board.post_reaction.service;

import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.dto.response.MemberSignUpResponse;
import com.my_board.member.mapper.MemberMapper;
import com.my_board.member.service.MemberService;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.mapper.PostMapper;
import com.my_board.post.service.PostService;
import com.my_board.post_reaction.dto.request.LikePostRequest;
import com.my_board.post_reaction.dto.response.GetReactionCountResponse;
import com.my_board.post_reaction.entity.PostReaction;
import com.my_board.post_reaction.entity.ReactionType;
import com.my_board.post_reaction.mapper.PostReactionMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class PostReactionServiceTest {


    @Autowired
    private PostReactionService postReactionService;

    @Autowired
    private PostReactionMapper postReactionMapper;

    @Autowired
    private PostMapper postMapper;
    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private PostService postService;
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
    @DisplayName("글 좋아요 테스트 성공")
    void testLikePost_NewLike() {
        LikePostRequest request = new LikePostRequest(memberId, ReactionType.LIKE, postId);

        postReactionService.likePost(request);

        PostReaction reaction = postReactionMapper.findReaction(memberId, postId);
        assertThat(reaction).isNotNull();
        assertThat(reaction.getType()).isEqualTo(ReactionType.LIKE);

        GetReactionCountResponse counts = postReactionService.getReactionCounts(postId, memberId);
        assertThat(counts.getLikeCount()).isEqualTo(1);
        assertThat(counts.getDislikeCount()).isEqualTo(0);
    }

    @Test
    @DisplayName("좋아요 한번더 누르면 취소")
    void testLikePost_ToggleLike() {
        // 처음 좋아요
        postReactionService.likePost(new LikePostRequest(memberId, ReactionType.LIKE, postId));
        // 다시 같은 좋아요 → 삭제
        postReactionService.likePost(new LikePostRequest(memberId, ReactionType.LIKE, postId));

        PostReaction reaction = postReactionMapper.findReaction(memberId, postId);
        assertThat(reaction).isNull();

        GetReactionCountResponse counts = postReactionService.getReactionCounts(postId, memberId);
        assertThat(counts.getLikeCount()).isEqualTo(0);
    }

    @Test
    @DisplayName("싫어요 버튼으로 바꾸기")
    void testLikePost_SwitchToDislike() {
        // 처음 좋아요
        postReactionService.likePost(new LikePostRequest(memberId, ReactionType.LIKE, postId));
        // 싫어요로 변경
        postReactionService.likePost(new LikePostRequest(memberId, ReactionType.DISLIKE, postId));

        PostReaction reaction = postReactionMapper.findReaction(memberId, postId);
        assertThat(reaction).isNotNull();
        assertThat(reaction.getType()).isEqualTo(ReactionType.DISLIKE);

        GetReactionCountResponse counts = postReactionService.getReactionCounts(postId, memberId);
        assertThat(counts.getLikeCount()).isEqualTo(0);
        assertThat(counts.getDislikeCount()).isEqualTo(1);
    }


}
