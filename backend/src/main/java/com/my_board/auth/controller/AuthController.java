package com.my_board.auth.controller;

import com.my_board.auth.dto.request.SendEmailRequest;
import com.my_board.auth.dto.request.VerifyEmailRequest;
import com.my_board.auth.dto.response.VerifyEmailResponse;
import com.my_board.auth.service.AuthService;
import com.my_board.common.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/email/send")
    public ResponseEntity<BaseResponse<Void>> sendEmail(@RequestBody SendEmailRequest request) {
        authService.sendVerificationEmail(request.getEmail());
        return ResponseEntity.ok(new BaseResponse<>());
    }

    @PostMapping("/email/verify")
    public ResponseEntity<BaseResponse<VerifyEmailResponse>> verifyEmail(@RequestBody VerifyEmailRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(authService.verifyCode(request)));

    }

}
