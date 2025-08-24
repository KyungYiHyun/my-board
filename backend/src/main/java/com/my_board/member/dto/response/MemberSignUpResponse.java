package com.my_board.member.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberSignUpResponse {
    private Long memberId;

    public static MemberSignUpResponse of(Long memberId) {
        return new MemberSignUpResponse(memberId);
    }

    public MemberSignUpResponse(Long memberId) {
        this.memberId = memberId;
    }
}
