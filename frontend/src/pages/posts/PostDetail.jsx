import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import CommentTree from "../../components/comments/CommentTree";
import CommentForm from "../../components/comments/CommentForm";
import PostList from "./PostList";

export default function PostDetail() {
    const { postId } = useParams();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1; // 현재 페이지 받기

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

    const buildCommentTree = (flatComments) => {
        const map = {};
        flatComments.forEach((c) => (map[c.commentId] = { ...c, children: [] }));
        const tree = [];
        flatComments.forEach((c) => {
            if (c.parentId) map[c.parentId]?.children.push(map[c.commentId]);
            else tree.push(map[c.commentId]);
        });
        return tree;
    };

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

    if (loading) return <p className="text-gray-500 text-center mt-10">로딩 중...</p>;
    if (!post) return <p className="text-gray-500 text-center mt-10">게시글을 찾을 수 없습니다.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            <div className="border-b pb-3 mb-4">
                <h1 className="text-lg font-bold">{post.title}</h1>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">{post.nickname}</span>
                    <span>{format(new Date(post.createdAt), "yyyy.MM.dd HH:mm")}</span>
                </div>
            </div>

            <div className="min-h-[200px] text-gray-800 text-base leading-relaxed whitespace-pre-line">
                {post.content}
            </div>

            <div className="mt-6">
                <CommentForm onSubmit={(content) => handleCommentCreate(content, null)} />
                <CommentTree comments={comments} loggedInMemberId={loggedInMemberId} />
            </div>

            {/* 하단 글목록 - 현재 페이지로 초기화, 현재 글 강조 */}
            <div className="mt-10 border-t pt-6">
                <h3 className="text-lg font-bold mb-4">글 목록</h3>
                <PostList
                    highlightPostId={Number(postId)}
                    initialPage={currentPage} // 초기 페이지 전달
                />
            </div>
        </div>
    );
}
