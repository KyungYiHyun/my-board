package com.my_board.member.dto.request;


import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberSignupRequest {
    private String loginId;
    private String memberName;
    private String password;
    private LocalDate birth;
    private String nickname;
}
