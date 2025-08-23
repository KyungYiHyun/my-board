package com.my_board.member.controller;

import com.my_board.member.dto.request.MemberLoginRequest;
import com.my_board.member.dto.request.MemberSignupRequest;
import com.my_board.member.service.MemberService;
import lombok.RequiredArgsConstructor;
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
    public void signup(@RequestBody MemberSignupRequest request) {
        memberService.signup(request);
    }

    @PostMapping("/login")
    public void login(@RequestBody MemberLoginRequest request) {
        memberService.login(request);
    }

}
