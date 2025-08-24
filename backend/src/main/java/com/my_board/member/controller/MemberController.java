package com.my_board.member.controller;

import com.my_board.common.dto.BaseResponse;
import com.my_board.member.dto.request.MemberLoginRequest;
import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.dto.response.MemberLoginResponse;
import com.my_board.member.dto.response.MemberSignUpResponse;
import com.my_board.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<BaseResponse<MemberSignUpResponse>> signup(@RequestBody MemberSignupRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(memberService.signup(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponse<MemberLoginResponse>> login(@RequestBody MemberLoginRequest request) {
        return ResponseEntity.ok(new BaseResponse<>(memberService.login(request)));
    }

}
