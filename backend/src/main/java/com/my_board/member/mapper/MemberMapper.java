package com.my_board.member.mapper;

import com.my_board.member.dto.response.MemberSignUpResponse;
import com.my_board.member.entity.Member;

import java.util.Optional;

@org.apache.ibatis.annotations.Mapper
public interface MemberMapper {

    Optional<Member> findByLoginId(String loginId);

    void signup(Member member);



}
