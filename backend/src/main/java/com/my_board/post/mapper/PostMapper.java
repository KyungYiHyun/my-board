package com.my_board.post.mapper;

import com.my_board.post.entity.Post;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {


    void createPost(Post post);
}
