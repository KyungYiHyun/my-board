package com.my_board.member.service;

import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.entity.Member;
import com.my_board.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public void signup(MemberSignupRequest request) {
        memberMapper.insert(Member.toEntity(request));
    }


}
