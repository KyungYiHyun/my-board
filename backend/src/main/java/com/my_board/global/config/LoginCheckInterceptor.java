package com.my_board.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.my_board.common.dto.BaseResponseStatus;
import com.my_board.common.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Map;

@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession(false);

        String method = request.getMethod();

        if ("GET".equalsIgnoreCase(method)) {
            return true;
        }

        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }


        if (session == null || session.getAttribute("memberId") == null) {


            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> res = Map.of(
                    "isSuccess", false,
                    "code", 411,
                    "message", "로그인이 필요합니다."
            );

            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json; charset=UTF-8");
            response.setStatus(401); // UNAUTHORIZED
            response.getWriter().write(mapper.writeValueAsString(res));

            return false;
        }


        return true;
    }
}
