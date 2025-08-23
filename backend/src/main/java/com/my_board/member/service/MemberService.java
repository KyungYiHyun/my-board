package com.my_board.member.service;

import com.my_board.member.dto.request.MemberLoginRequest;
import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.entity.Member;
import com.my_board.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberMapper memberMapper;


    public Member findByLoginId(MemberLoginRequest request) {
        return memberMapper.findByLoginId(request.getLoginId()).orElseThrow();
    }


    public void signup(MemberSignupRequest request) {
        memberMapper.signup(Member.toEntity(request));
    }

    public void login(MemberLoginRequest request) {
        Optional<Member> member = memberMapper.findByLoginId(request.getLoginId());
        if (!member.get().getPassword().equals(request.getPassword())) {
            return;
        }
        log.info("요청 비밀번호: {}, 찾은 비밀번호: {}", request.getPassword(), member.get().getPassword());
    }


}
