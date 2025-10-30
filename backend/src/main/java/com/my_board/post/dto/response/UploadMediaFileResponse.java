package com.my_board.post.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UploadMediaFileResponse {
    private String url;

    public UploadMediaFileResponse(String url) {
        this.url = url;
    }
}
