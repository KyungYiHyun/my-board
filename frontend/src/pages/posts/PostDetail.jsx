import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import apiClient from "../../utils/axios";
import { format } from "date-fns";
import CommentTree from "../../components/comments/CommentTree";
import CommentForm from "../../components/comments/CommentForm";
import PostList from "./PostList";
import { isAuthenticated } from "../../utils/auth";

export default function PostDetail() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const { postId } = useParams();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1; // 현재 페이지 받기
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMemberId, setCurrentMemberId] = useState(null);

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [userReaction, setUserReaction] = useState(null); // "LIKE", "DISLIKE" or null

    const keyword = searchParams.get("keyword") || ""; // 검색어 가져오기



    // 검색어 하이라이팅 컴포넌트
    function HighlightText({ text, highlight }) {
        if (!highlight) return <>{text}</>;

        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, idx) =>
                    regex.test(part) ? (
                        <span key={idx} className="bg-yellow-200">{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    }


    // 현재 글의 추천/비추천 카운트 조회
    const fetchLikes = async () => {
        try {
            const res = await apiClient.get(`${API_BASE_URL}/posts/like/${postId}`);
            setLikeCount(res.data.result.likeCount);
            setDislikeCount(res.data.result.dislikeCount);
            setUserReaction(res.data.result.type);
        } catch (err) {
            console.error("좋아요/싫어요 조회 실패", err);
        }
    };

    const handleReaction = async (type) => {
        if (!isAuthenticated()) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        try {
            // 이미 같은 버튼 눌렀으면 토글 취소
            await apiClient.post(`${API_BASE_URL}/posts/like`, {
                postId,
                type,
            });

            // 서버에서 토글 처리 후 상태 갱신
            if (userReaction === type) {
                setUserReaction(null); // 취소
            } else {
                setUserReaction(type); // 새 반응
            }

            // 최신 카운트 다시 가져오기
            fetchLikes();
        } catch (err) {
            console.error("좋아요/싫어요 요청 실패", err);
        }
    };

    const fetchPost = async () => {
        try {
            const res = await apiClient.get(`${API_BASE_URL}/posts/${postId}`);
            setPost(res.data.result);
        } catch (err) {
            console.error("게시글 조회 실패", err);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await apiClient.get(`${API_BASE_URL}/comments/${postId}`);
            // 서버 응답에서 현재 사용자의 memberId를 받아옴 (있는 경우)
            if (res.data.currentMemberId) {
                setCurrentMemberId(String(res.data.currentMemberId));
            }
            setComments(buildCommentTree(res.data.result));
        } catch (err) {
            console.error("댓글 조회 실패", err);
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchPost(), fetchComments(), fetchLikes()]).finally(() => setLoading(false));
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
        if (!isAuthenticated()) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }
        try {
            await apiClient.post(`${API_BASE_URL}/comments/${postId}`, {
                content,
                parentId,
            });
            fetchComments();
        } catch (err) {
            console.error("댓글 작성 실패", err);
        }
    };

    const handleCommentUpdate = async (commentId, content) => {
        try {
            await apiClient.patch(`${API_BASE_URL}/comments/${commentId}`, {
                content,
            });
            fetchComments();
        } catch (err) {
            console.error("댓글 수정 실패", err);
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await apiClient.delete(`${API_BASE_URL}/comments/${commentId}`);
            fetchComments();
        } catch (err) {
            console.error("댓글 삭제 실패", err);
        }
    };

    if (loading) return <p className="text-gray-500 text-center mt-10">로딩 중...</p>;
    if (!post) return <p className="text-gray-500 text-center mt-10">게시글을 찾을 수 없습니다.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            <div className="border-b pb-3 mb-4">
                <h1 className="text-lg font-bold"><HighlightText text={post.title} highlight={keyword} /></h1>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">{post.nickname}</span>
                    <div className="text-right">
                        <span>{format(new Date(post.createdAt), "yyyy.MM.dd HH:mm")}</span>
                        <br />
                        <span>조회수 {post.views}</span>
                    </div>
                </div>
            </div>

            <div className="min-h-[200px] text-gray-800 text-base leading-relaxed">
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>

            <div className="mt-4 flex items-center space-x-4">
                <button
                    className={`px-3 py-1 border rounded ${userReaction === "LIKE" ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => handleReaction("LIKE")}
                >
                    👍 {likeCount}
                </button>
                <button
                    className={`px-3 py-1 border rounded ${userReaction === "DISLIKE" ? "bg-red-500 text-white" : ""}`}
                    onClick={() => handleReaction("DISLIKE")}
                >
                    👎 {dislikeCount}
                </button>
            </div>



            <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-md font-bold">댓글 {post.commentCount}개</span>
                </div>
                <CommentForm onSubmit={(content) => handleCommentCreate(content, null)} />
                <CommentTree
                    comments={comments}
                    currentMemberId={currentMemberId}
                    onDelete={handleCommentDelete}
                    onUpdate={handleCommentUpdate}
                    onReply={handleCommentCreate}
                />
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
