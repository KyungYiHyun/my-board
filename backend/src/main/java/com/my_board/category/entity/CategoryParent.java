package com.my_board.category.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryParent {
    private Long id;
    private String name;
    private int sortOrder;

    @Builder
    public CategoryParent(Long id, Long parentId, String name, int sortOrder) {
        this.id = id;
        this.name = name;
        this.sortOrder = sortOrder;
    }


}
