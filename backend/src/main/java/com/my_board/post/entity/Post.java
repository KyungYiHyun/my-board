package com.my_board.post.entity;

import com.my_board.common.entity.BaseEntity;
import com.my_board.post.dto.request.CreatePostRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Post extends BaseEntity {

    private Long id;
    private String title;
    private String content;

    private int views;
    private Long member_id;

    @Builder
    public Post(Long id, String title, String content, int views, Long member_id) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.member_id = member_id;
    }

    public static Post toEntity(CreatePostRequest request) {
        return Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .member_id(request.getMemberId())
                .build();
    }


}
