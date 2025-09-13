package com.my_board.category.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetCategoryParentResponse {
    private String parentName;
    private List<GetCategoryChildResponse> childNames;
}
