package com.my_board.category.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryChild {
    private Long id;
    private Long categoryParentId;
    private String name;
    private int sortOrder;

    @Builder
    public CategoryChild(Long id, Long categoryParentId, String name, int sortOrder) {
        this.id = id;
        this.categoryParentId = categoryParentId;
        this.name = name;
        this.sortOrder = sortOrder;
    }
}
