import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [readPosts, setReadPosts] = useState([]); // 읽은 글 ID 목록

    // localStorage에서 읽은 글 가져오기
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("readPosts") || "[]");
        setReadPosts(stored);
    }, []);

    const fetchPosts = (pageNum) => {
        axios
            .get(`http://localhost:8080/api/posts?page=${pageNum}`)
            .then((res) => {
                setPosts(res.data.result.list);
                setPageInfo({
                    pageNum: res.data.result.pageNum,
                    pageSize: res.data.result.pageSize,
                    total: res.data.result.total,
                    pages: res.data.result.pages,
                    hasNextPage: res.data.result.hasNextPage,
                    hasPreviousPage: res.data.result.hasPreviousPage,
                    navigatepageNums: res.data.result.navigatepageNums,
                });
                setPage(pageNum);
            })
            .catch((err) => {
                console.error("게시글 목록 조회 실패", err);
            });
    };

    useEffect(() => {
        fetchPosts(page);
    }, []);

    const handlePageClick = (pageNum) => {
        fetchPosts(pageNum);
    };

    const handlePostClick = (postId) => {
        // 클릭한 글을 읽음 처리
        if (!readPosts.includes(postId)) {
            const updated = [...readPosts, postId];
            setReadPosts(updated);
            localStorage.setItem("readPosts", JSON.stringify(updated));
        }
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
                                <th className="py-2 px-2 text-center w-1/5">작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, idx) => {
                                const isRead = readPosts.includes(post.postId);
                                return (
                                    <tr
                                        key={post.postId}
                                        className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                            }`}
                                    >
                                        <td className="py-2 px-2">
                                            <Link
                                                to={`/posts/${post.postId}`}
                                                onClick={() => handlePostClick(post.postId)}
                                                className={`font-medium ${isRead ? "text-gray-500 no-underline" : "text-blue-600 no-underline hover:underline"}`}
                                            >
                                                {post.title} {post.commentCount > 0 && `[${post.commentCount}]`}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-2 text-center text-gray-700">
                                            {post.nickname}
                                        </td>
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
                            className={`px-3 py-1 border rounded ${!pageInfo.hasPreviousPage ? 'text-gray-400 cursor-not-allowed' : ''}`}
                            disabled={!pageInfo.hasPreviousPage}
                            onClick={() => handlePageClick(page - 1)}
                        >
                            이전
                        </button>

                        {pageInfo.navigatepageNums?.map((num) => (
                            <button
                                key={num}
                                className={`px-3 py-1 border rounded ${page === num ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handlePageClick(num)}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            className={`px-3 py-1 border rounded ${!pageInfo.hasNextPage ? 'text-gray-400 cursor-not-allowed' : ''}`}
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
