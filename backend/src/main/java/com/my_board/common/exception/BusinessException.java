package com.my_board.common.exception;

import com.my_board.common.dto.BaseResponseStatus;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException{

    private final BaseResponseStatus baseResponseStatus;

    public BusinessException(BaseResponseStatus baseResponseStatus) {
        super(baseResponseStatus.getMessage());
        this.baseResponseStatus = baseResponseStatus;
    }
}
