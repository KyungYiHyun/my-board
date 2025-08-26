import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/posts")
            .then((res) => {
                setPosts(res.data.result);
            })
            .catch((err) => {
                console.error("게시글 목록 조회 실패", err);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">게시판</h3>
            {posts.length > 0 ? (
                <table className="w-full text-sm border-t">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="py-2 px-2 text-left w-3/5">제목</th>
                            <th className="py-2 px-2 text-center w-1/5">작성자</th>
                            <th className="py-2 px-2 text-center w-1/5">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, idx) => (
                            <tr
                                key={post.postId}
                                className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                    }`}
                            >
                                <td className="py-2 px-2">
                                    <Link
                                        to={`/posts/${post.postId}`}
                                        className="hover:underline font-medium"
                                    >
                                        {post.title}
                                    </Link>
                                </td>
                                <td className="py-2 px-2 text-center text-gray-700">
                                    {post.nickname}
                                </td>
                                <td className="py-2 px-2 text-center text-gray-500">
                                    {format(new Date(post.createdAt), "yyyy.MM.dd")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center py-10">게시글이 없습니다.</p>
            )}
        </div>
    );
}
