package com.my_board.category.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetCategoryChildResponse {
    private Long id;
    private String name;
}
