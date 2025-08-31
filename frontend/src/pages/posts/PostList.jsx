import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function PostList({ highlightPostId, initialPage }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [readPosts, setReadPosts] = useState([]);

    const navigate = useNavigate();

    // URL에서 page 가져오기 (query 기반)
    const page = Number(searchParams.get("page")) || initialPage || 1;

    // localStorage에서 읽은 글 가져오기
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("readPosts") || "[]");
        setReadPosts(stored);
    }, []);

    // page가 바뀌면 서버에서 글 목록 fetch
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/posts?page=${page}`);
                const data = res.data.result;
                setPosts(data.list);
                setPageInfo({
                    pageNum: data.pageNum,
                    pageSize: data.pageSize,
                    total: data.total,
                    pages: data.pages,
                    hasNextPage: data.hasNextPage,
                    hasPreviousPage: data.hasPreviousPage,
                    navigatepageNums: data.navigatepageNums,
                });
            } catch (err) {
                console.error("게시글 목록 조회 실패", err);
            }
        };
        fetchPosts();
    }, [page]);

    const handlePageClick = (pageNum) => {
        setSearchParams({ page: pageNum });
    };

    const handlePostClick = (postId) => {
        if (!readPosts.includes(postId)) {
            const updated = [...readPosts, postId];
            setReadPosts(updated);
            localStorage.setItem("readPosts", JSON.stringify(updated));
        }
        navigate(`/posts/${postId}?page=${page}`);
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">게시판</h3>

            {posts.length > 0 ? (
                <>
                    <table className="w-full text-sm border-t">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="py-2 px-2 text-left w-3/5">제목</th>
                                <th className="py-2 px-2 text-center w-1/5">작성자</th>
                                <th className="py-2 px-2 text-center w-1/6">추천</th>
                                <th className="py-2 px-2 text-center w-1/5">작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, idx) => {
                                const isRead = readPosts.includes(post.postId);
                                const isHighlight = highlightPostId === post.postId;
                                return (
                                    <tr
                                        key={post.postId}
                                        className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"} 
                                            ${isHighlight ? "bg-yellow-50" : ""}`}
                                    >
                                        <td className="py-2 px-2">
                                            <button
                                                onClick={() => handlePostClick(post.postId)}
                                                className={`font-medium ${isRead
                                                    ? "text-gray-500 no-underline"
                                                    : "text-blue-600 no-underline hover:underline"
                                                    }`}
                                            >
                                                {post.title} {post.commentCount > 0 && `[${post.commentCount}]`}
                                            </button>
                                        </td>
                                        <td className="py-2 px-2 text-center text-gray-700">{post.nickname}</td>
                                        <td className="py-2 px-2 text-center text-gray-500">{post.likeCount || 0}</td>
                                        <td className="py-2 px-2 text-center text-gray-500">
                                            {format(new Date(post.createdAt), "yyyy.MM.dd")}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* 페이지네이션 */}
                    <div className="mt-4 flex justify-center space-x-1">
                        <button
                            className={`px-3 py-1 border rounded ${!pageInfo.hasPreviousPage ? "text-gray-400 cursor-not-allowed" : ""}`}
                            disabled={!pageInfo.hasPreviousPage}
                            onClick={() => handlePageClick(page - 1)}
                        >
                            이전
                        </button>

                        {pageInfo.navigatepageNums?.map((num) => (
                            <button
                                key={num}
                                className={`px-3 py-1 border rounded ${page === num ? "bg-blue-500 text-white" : ""}`}
                                onClick={() => handlePageClick(num)}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            className={`px-3 py-1 border rounded ${!pageInfo.hasNextPage ? "text-gray-400 cursor-not-allowed" : ""}`}
                            disabled={!pageInfo.hasNextPage}
                            onClick={() => handlePageClick(page + 1)}
                        >
                            다음
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center py-10">게시글이 없습니다.</p>
            )}
        </div>
    );
}
