package com.my_board.post.mapper;

import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.entity.Post;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface PostMapper {


    void createPost(Post post);

    Optional<GetPostResponse> findById(Long id);
}
