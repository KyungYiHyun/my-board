package com.my_board.post.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.my_board.common.exception.BusinessException;
import com.my_board.post.dto.request.CreateAndUpdatePostRequest;
import com.my_board.post.dto.response.CreateAndUpdatePostResponse;
import com.my_board.post.dto.response.GetAllPostResponse;
import com.my_board.post.dto.response.GetPostResponse;
import com.my_board.post.dto.response.UploadMediaFileResponse;
import com.my_board.post.entity.Post;
import com.my_board.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import static com.my_board.common.dto.BaseResponseStatus.*;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    private final static String MEDIA_BASE_URL = "/app/uploads";

    public CreateAndUpdatePostResponse createPost(CreateAndUpdatePostRequest request) {
        Post post = Post.toEntity(request);
        postMapper.createPost(post);
        return CreateAndUpdatePostResponse.of(post.getId());
    }

    public GetPostResponse getPost(Long postId) {

        GetPostResponse response = postMapper.findById(postId).orElseThrow(() -> {
            throw new BusinessException(NOT_FOUND_POST);
        });

        return response;
    }

    public PageInfo<GetAllPostResponse> getAllPosts(int page, String sortIndex, String orderType, String keyword, String categoryParent, String categoryChild, Integer hot) {
        final int PAGE_SIZE = 20;
        List<String> allowedSortColumns = List.of("created_at", "views", "likeCount");
        if (sortIndex == null || !allowedSortColumns.contains(sortIndex)) {
            sortIndex = "created_at"; // 기본값으로 안전하게 처리
        }

        if (orderType == null || !orderType.equalsIgnoreCase("ASC") && !orderType.equalsIgnoreCase("DESC")) {
            orderType = "DESC"; // 기본값
        }

        PageHelper.startPage(page, PAGE_SIZE);
        return new PageInfo<>(postMapper.getAllPosts(sortIndex, orderType, keyword, categoryParent, categoryChild, hot));
    }

/*    public PageInfo<GetAllPostResponse> getAllPostsByLike(int page, String sortIndex, String orderType, String keyword) {
        final int PAGE_SIZE = 20;
        List<String> allowedSortColumns = List.of("created_at", "views", "likeCount");
        if (sortIndex == null || !allowedSortColumns.contains(sortIndex)) {
            sortIndex = "created_at"; // 기본값으로 안전하게 처리
        }

        if (orderType == null || !orderType.equalsIgnoreCase("ASC") && !orderType.equalsIgnoreCase("DESC")) {
            orderType = "DESC"; // 기본값
        }

        PageHelper.startPage(page, PAGE_SIZE);
        return new PageInfo<>(postMapper.getAllPostsByLike(sortIndex, orderType, keyword));
    }*/

    public void deletePost(Long postId) {
        int row = postMapper.deletePost(postId);
        if (row == 0) {
            throw new BusinessException(NOT_FOUND_POST);
        }

    }

    public CreateAndUpdatePostResponse updatePost(Long postId, CreateAndUpdatePostRequest request) {
        Post post = Post.toEntity(request);
        int row = postMapper.updatePost(post, postId);
        if (row == 0) {
            throw new BusinessException(NOT_FOUND_POST);
        }
        return CreateAndUpdatePostResponse.of(postId);
    }

    public void incrementView(Long postId) {
        postMapper.incrementView(postId);
    }


    public UploadMediaFileResponse uploadMediaFile(MultipartFile image) {

        try {
            String filename = image.getOriginalFilename();

            String savedName = UUID.randomUUID() + "_" + filename;
            Path path = Paths.get(MEDIA_BASE_URL + savedName);

            Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            String fileUrl = "https://devboard.kr/media/" + savedName;
            return new UploadMediaFileResponse(fileUrl);
        } catch (IOException e) {
            throw new BusinessException(FAIL_MEDIA_UPLOAD);
        }


    }
}
