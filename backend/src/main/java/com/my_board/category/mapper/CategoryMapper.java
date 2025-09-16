package com.my_board.category.mapper;

import com.my_board.category.dto.response.GetCategoryParentResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    List<GetCategoryParentResponse> getCategory();
}
