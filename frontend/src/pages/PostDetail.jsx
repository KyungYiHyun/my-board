import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

export default function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/posts/${postId}`)
            .then((res) => {
                setPost(res.data.result);
                setLoading(false);
            })
            .catch((err) => {
                console.error("게시글 상세 조회 실패", err);
                setLoading(false);
            });
    }, [postId]);

    if (loading) return <p className="text-gray-500">로딩 중...</p>;
    if (!post) return <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            {/* 제목 */}
            <div className="border-b pb-3 mb-4">
                <h1 className="text-lg font-bold">{post.title}</h1>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>
                        <span className="font-medium text-gray-700">{post.nickname}</span>
                    </span>
                    <span>{format(new Date(post.createdAt), "yyyy.MM.dd HH:mm")}</span>
                </div>
            </div>

            {/* 본문 */}
            <div className="min-h-[200px] text-gray-800 text-base leading-relaxed whitespace-pre-line">
                {post.content}
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end mt-6 space-x-2">
                <Link
                    to="/"
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                >
                    목록
                </Link>
                <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm">
                    수정
                </button>
                <button className="px-3 py-1.5 border border-red-400 text-red-500 rounded hover:bg-red-50 text-sm">
                    삭제
                </button>
            </div>
        </div>
    );
}
