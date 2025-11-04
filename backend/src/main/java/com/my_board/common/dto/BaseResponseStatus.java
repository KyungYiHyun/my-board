package com.my_board.common.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BaseResponseStatus {

    SUCCESS(true, HttpStatus.OK, 200, "요청에 성공하였습니다."),
    AUTHORIZATION_SUCCESS(true, HttpStatus.OK, 200, "토큰 발급에 성공하였습니다."),
    BAD_REQUEST(false, HttpStatus.BAD_REQUEST, 400, "입력값을 확인해주세요."),
    UNAUTHORIZED(false, HttpStatus.UNAUTHORIZED, 401, "인증이 필요합니다."),
    FORBIDDEN(false, HttpStatus.FORBIDDEN, 403, "권한이 없습니다."),
    NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "대상을 찾을 수 없습니다."),
    NOT_FOUND_REFRESH(false, HttpStatus.NOT_FOUND, 405, "리프레쉬 토큰을 찾을 수 없습니다."),
    EXPIRED_REFRESH(false, HttpStatus.NOT_FOUND, 406, "리프레쉬 토큰이 만료되었습니다."),
    INVALID_REFRESH(false, HttpStatus.NOT_FOUND, 407, "유효하지 않은 리프레쉬 토큰입니다."),
    NOT_VALID_TOKEN(false, HttpStatus.UNAUTHORIZED, 408, "유효하지 않은 토큰입니다."),
    NOT_VALID_AUTHORIZATION_HEADER(false, HttpStatus.UNAUTHORIZED, 409, "Authorization 헤더가 유효하지 않습니다."),


    INCORRECT_PASSWORD(false, HttpStatus.UNAUTHORIZED, 410, "비밀번호가 일치하지 않습니다"),
    INCORRECT_LOGIN_ID(false, HttpStatus.UNAUTHORIZED, 411, "일치하는 아이디를 찾을 수 없습니다."),

    DUPLICATE_LOGIN_ID(false, HttpStatus.UNAUTHORIZED, 412, "중복된 아이디가 있습니다."),
    FAIL_MEDIA_UPLOAD(false, HttpStatus.BAD_REQUEST, 413, "미디어 파일 업로드가 실패하였습니다."),

    INCORRECT_EMAIL_CODE(false, HttpStatus.BAD_REQUEST, 414, "이메일 인증코드가 일치하지 않습니다."),

    NOT_FOUND_POST(false, HttpStatus.NOT_FOUND, 1000, "글을 찾을 수 없습니다."),
    NOT_FOUND_COMMENT(false, HttpStatus.NOT_FOUND, 2000, "댓글을 찾을 수 없습니다."),
    NOT_FOUND_REACTION(false, HttpStatus.NOT_FOUND, 3000, "좋아요 / 싫어요를 찾을 수 없습니다."),
    ;


    private final boolean isSuccess;
    @JsonIgnore
    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    BaseResponseStatus(boolean isSuccess, HttpStatus httpStatus, int code, String message) {
        this.isSuccess = isSuccess;
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }
}
