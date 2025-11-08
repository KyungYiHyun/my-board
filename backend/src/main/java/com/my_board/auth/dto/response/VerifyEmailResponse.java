package com.my_board.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VerifyEmailResponse {

    @JsonProperty("isVerified")
    private boolean isVerified;

    public VerifyEmailResponse(boolean isVerified) {
        this.isVerified = isVerified;
    }
}
