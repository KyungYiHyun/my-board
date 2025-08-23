package com.my_board.common.handler;


import com.my_board.common.dto.BaseResponse;
import com.my_board.common.dto.BaseResponseStatus;
import com.my_board.common.exception.BusinessException;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(0)
@RestControllerAdvice(annotations = RestController.class)
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<BaseResponse<BaseResponseStatus>> handleBusinessException(BusinessException e) {

        return ResponseEntity.status(e.getBaseResponseStatus().getHttpStatus())
                .body(new BaseResponse<>(e.getBaseResponseStatus()));
    }
}
