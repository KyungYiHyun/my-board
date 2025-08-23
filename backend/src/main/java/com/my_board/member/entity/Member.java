package com.my_board.member.entity;

import com.my_board.common.BaseEntity;
import com.my_board.member.dto.request.MemberLoginRequest;
import com.my_board.member.dto.request.MemberSignupRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class Member extends BaseEntity {
    private Long id;
    private String loginId;

    private String memberName;

    private String password;

    private LocalDate birth;

    private String nickname;

    private String role;

    @Builder
    public Member(String loginId, String memberName, String password, LocalDate birth, String nickname, String role) {
        this.loginId = loginId;
        this.memberName = memberName;
        this.password = password;
        this.birth = birth;
        this.nickname = nickname;
        this.role = role;
    }

    public static Member toEntity(MemberSignupRequest request) {
        return Member.builder()
                .loginId(request.getLoginId())
                .birth(request.getBirth())
                .memberName(request.getMemberName())
                .nickname(request.getNickname())
                .password(request.getPassword())
                .build();
    }





}
