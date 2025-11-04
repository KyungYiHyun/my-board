package com.my_board.member.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CheckedLoggedInResponse {
    public CheckedLoggedInResponse(boolean isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }

    @JsonProperty("isLoggedIn")
    private boolean isLoggedIn;
}
