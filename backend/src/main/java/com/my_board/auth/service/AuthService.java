package com.my_board.auth.service;

import com.my_board.auth.dto.request.VerifyEmailRequest;
import com.my_board.auth.dto.response.VerifyEmailResponse;
import com.my_board.common.dto.BaseResponseStatus;
import com.my_board.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import static com.my_board.common.dto.BaseResponseStatus.INCORRECT_EMAIL_CODE;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final JavaMailSender mailSender;

    private Map<String, Verification> store = new ConcurrentHashMap<>();

    private record Verification(String code, LocalDateTime expiration) {

    }

    public void sendVerificationEmail(String email) {
        String code = generateCode();
        store.put(email, new Verification(code, LocalDateTime.now().plusMinutes(5)));
        sendEmail(email, code);
    }

    public void sendEmail(String email, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.trim());
        log.info("email: {}", email);
        message.setSubject("이메일 인증 코드");
        message.setText("인증코드는 " + code + " 입니다. (5분간 유효)");
        mailSender.send(message);
    }

    public VerifyEmailResponse verifyCode(VerifyEmailRequest request) {
        String email = request.getEmail();
        String code = request.getCode();
        Verification v = store.get(email);
        log.info("email: {}", email);
        log.info("code: {}", code);
        if (v == null || v.expiration().isBefore(LocalDateTime.now())) {
            store.remove(email);
            throw new BusinessException(INCORRECT_EMAIL_CODE);
        }

        if (v.code().equals(code)) {
            store.remove(email);
            return new VerifyEmailResponse(true);
        }

        return new VerifyEmailResponse(false);
    }

    private String generateCode() {
        return String.format("%06d", new Random().nextInt(1000000));
    }
}
