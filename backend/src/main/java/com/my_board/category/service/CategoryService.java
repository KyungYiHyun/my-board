package com.my_board.category.service;

import com.my_board.category.dto.response.GetBlogUrlResponse;
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
        return categories;
    }


    public GetBlogUrlResponse getBlogUrl(String name) {
        return categoryMapper.getBlogUrl(name);
    }
}
