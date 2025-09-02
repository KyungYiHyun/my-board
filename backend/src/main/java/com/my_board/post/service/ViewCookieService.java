package com.my_board.post.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashSet;

@Service
public class ViewCookieService {

    private static final String COOKIE_NAME = "viewedPosts";
    private static final int TTL_SECONDS = 5 * 60;

    public boolean checkAndUpdateViewPosts(Long postId, HttpServletResponse response, String viewedPosts) {
        HashSet<String> viewedSet = new HashSet<>();
        if (viewedPosts != null) {
            String decoded = URLDecoder.decode(viewedPosts, StandardCharsets.UTF_8);
            viewedSet = new HashSet<>(Arrays.asList(decoded.split(",")));
        }

        boolean isNewView = viewedSet.add(postId.toString());

        if (isNewView) {
            String value = URLEncoder.encode(String.join(",", viewedSet), StandardCharsets.UTF_8);
            Cookie cookie = new Cookie(COOKIE_NAME, value);
            cookie.setPath("/");
            cookie.setMaxAge(TTL_SECONDS);
            response.addCookie(cookie);
        }

        return isNewView;

    }
}
