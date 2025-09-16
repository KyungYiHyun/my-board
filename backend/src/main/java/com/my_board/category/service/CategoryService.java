package com.my_board.category.service;

import com.my_board.category.dto.response.GetCategoryParentResponse;
import com.my_board.category.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryMapper categoryMapper;

    public List<GetCategoryParentResponse> getCategory() {
        List<GetCategoryParentResponse> categories = categoryMapper.getCategory();
        System.out.println(categories);
        return categories;
    }
}
