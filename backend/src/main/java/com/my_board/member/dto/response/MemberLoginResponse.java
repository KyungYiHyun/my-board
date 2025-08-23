package com.my_board.member.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberLoginResponse {
    private Long memberId;

    public static MemberLoginResponse from(Long memberId) {
        return MemberLoginResponse.builder()
                .memberId(memberId)
                .build();
    }
}
