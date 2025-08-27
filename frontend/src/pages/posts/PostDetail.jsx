import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import CommentTree from "../../components/comments/CommentTree";
import CommentForm from "../../components/comments/CommentForm";

export default function PostDetail() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const loggedInMemberId = localStorage.getItem("memberId");

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/posts/${postId}`);
            setPost(res.data.result);
        } catch (err) {
            console.error("게시글 조회 실패", err);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/comments/${postId}`);
            setComments(buildCommentTree(res.data.result));
        } catch (err) {
            console.error("댓글 조회 실패", err);
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchPost(), fetchComments()]).finally(() => setLoading(false));
    }, [postId]);

    // ---------------- 댓글 트리 생성 ----------------
    const buildCommentTree = (flatComments) => {
        const map = {};
        flatComments.forEach((c) => (map[c.commentId] = { ...c, children: [] }));
        const tree = [];
        flatComments.forEach((c) => {
            if (c.parentId) {
                map[c.parentId]?.children.push(map[c.commentId]);
            } else {
                tree.push(map[c.commentId]);
            }
        });
        return tree;
    };

    // ---------------- 댓글 CRUD ----------------
    const handleCommentCreate = async (content, parentId = null) => {
        if (!loggedInMemberId) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/comments/${postId}`, {
                content,
                memberId: loggedInMemberId,
                parentId,
            });
            fetchComments();
        } catch (err) {
            console.error("댓글 작성 실패", err);
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`, {
                memberId: loggedInMemberId,
            });
            fetchComments();
        } catch (err) {
            console.error("댓글 삭제 실패", err);
        }
    };

    const handleCommentUpdate = async (commentId, content) => {
        try {
            await axios.patch(`http://localhost:8080/api/comments/${commentId}`, {
                content,
                memberId: loggedInMemberId,
            });
            fetchComments();
        } catch (err) {
            console.error("댓글 수정 실패", err);
        }
    };

    if (loading) return <p className="text-gray-500 text-center mt-10">로딩 중...</p>;
    if (!post) return <p className="text-gray-500 text-center mt-10">게시글을 찾을 수 없습니다.</p>;

    const isAuthor = loggedInMemberId === String(post.memberId);

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            {/* 게시글 제목 */}
            <div className="border-b pb-3 mb-4">
                <h1 className="text-lg font-bold">{post.title}</h1>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">{post.nickname}</span>
                    <span>{format(new Date(post.createdAt), "yyyy.MM.dd HH:mm")}</span>
                </div>
            </div>

            {/* 게시글 본문 */}
            <div className="min-h-[200px] text-gray-800 text-base leading-relaxed whitespace-pre-line">
                {post.content}
            </div>

            {/* 게시글 버튼 */}
            <div className="flex justify-end mt-6 space-x-2">
                <Link
                    to="/"
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                >
                    목록
                </Link>
                {isAuthor && (
                    <>
                        <Link
                            to={`/posts/${postId}/edit`}
                            className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                        >
                            수정
                        </Link>
                    </>
                )}
            </div>
            <div className="mt-6">
                {/* 최상위 댓글 작성란 */}
                <CommentForm onSubmit={(content) => handleCommentCreate(content, null)} />
                {/* 댓글 트리 */}
                <CommentTree
                    comments={comments}
                    loggedInMemberId={loggedInMemberId}
                    onDelete={handleCommentDelete}
                    onUpdate={handleCommentUpdate}
                    onReply={handleCommentCreate}
                />
            </div>
        </div>
    );
}
