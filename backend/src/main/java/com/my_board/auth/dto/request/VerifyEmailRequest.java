package com.my_board.auth.dto.request;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VerifyEmailRequest {

    private String email;
    private String code;

}
