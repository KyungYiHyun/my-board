package com.my_board.post.mapper;

import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PostMapper {


    void createPost(Post post);

    Optional<GetPostResponse> findById(@Param("postId") Long id);

    List<GetAllPostResponse> getAllPosts(@Param("sortIndex") String sortIndex, @Param("orderType") String orderType, @Param("keyword") String keyword,
                                         @Param("categoryParent")String categoryParent, @Param("categoryChild")String categoryChild,@Param("hot") Integer hot );

    int deletePost(Long postId);

    int updatePost(@Param("post") Post post, @Param("postId") Long postId);


    void incrementView(Long postId);

    List<GetAllPostResponse> getAllPostsByLike(@Param("sortIndex") String sortIndex, @Param("orderType") String orderType, @Param("keyword") String keyword);

}
