package com.my_board.category.controller;

import com.my_board.category.dto.response.GetCategoryParentResponse;
import com.my_board.category.service.CategoryService;
import com.my_board.common.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<BaseResponse<List<GetCategoryParentResponse>>> getCategory() {
        return ResponseEntity.ok(new BaseResponse<>(categoryService.getCategory()));
    }




}
