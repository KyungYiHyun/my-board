package com.my_board.member.service;

import com.my_board.common.exception.BusinessException;
import com.my_board.member.dto.request.MemberLoginRequest;
import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.dto.response.MemberLoginResponse;
import com.my_board.member.entity.Member;
import com.my_board.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;



import static com.my_board.common.dto.BaseResponseStatus.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberMapper memberMapper;


    public Member findByLoginId(MemberLoginRequest request) {
        return memberMapper.findByLoginId(request.getLoginId()).orElseThrow(() -> {
            throw new BusinessException(INCORRECT_LOGIN_ID);
        });
    }


    public void signup(MemberSignupRequest request) {
        if (memberMapper.findByLoginId(request.getLoginId()).isPresent()) {
            throw new BusinessException(DUPLICATE_LOGIN_ID);
        }
        memberMapper.signup(Member.toEntity(request));
    }

    public MemberLoginResponse login(MemberLoginRequest request) {
        Member member = findByLoginId(request);
        if (!member.isPasswordMatch(request.getPassword())) {
            throw new BusinessException(INCORRECT_PASSWORD);
        }
        return MemberLoginResponse.from(member.getId());
    }
}
