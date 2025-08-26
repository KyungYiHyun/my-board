import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function PostDetail() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const loggedInMemberId = localStorage.getItem("memberId"); // 로그인한 사용자 ID

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

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
                data: { memberId: loggedInMemberId },
            });
            alert("삭제 완료!");
            navigate("/"); // 삭제 후 목록으로 이동
        } catch (err) {
            console.error("삭제 실패", err);
            alert("삭제 실패");
        }
    };

    if (loading) return <p className="text-gray-500 text-center mt-10">로딩 중...</p>;
    if (!post) return <p className="text-gray-500 text-center mt-10">게시글을 찾을 수 없습니다.</p>;

    const isAuthor = loggedInMemberId === String(post.memberId); // 작성자 체크

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

                {/* 작성자만 수정/삭제 가능 */}
                {isAuthor && (
                    <>
                        <Link
                            to={`/posts/${postId}/edit`}
                            className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                        >
                            수정
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1.5 border border-red-400 text-red-500 rounded hover:bg-red-50 text-sm"
                        >
                            삭제
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
