import { useState } from "react";
import { format } from "date-fns";
import CommentForm from "../../components/comments/CommentForm";

export default function CommentItem({ comment, currentMemberId, onDelete, onUpdate, onReply, depth = 0 }) {
    // 서버에서 댓글 응답에 isAuthor 플래그가 포함되어 있으면 우선 사용, 없으면 currentMemberId로 판단
    const isAuthor = comment.isAuthor !== undefined ? comment.isAuthor : (currentMemberId && currentMemberId === String(comment.memberId));
    const [editing, setEditing] = useState(false);
    const [replying, setReplying] = useState(false);
    const [content, setContent] = useState(comment.content);

    const handleUpdate = () => {
        if (!content.trim()) return;
        onUpdate(comment.commentId, content);
        setEditing(false);
    };

    return (
        <div className="flex">
            {/* 왼쪽 화살표 영역 */}
            <div style={{ marginLeft: depth * 20 }} className="flex items-start">
                {depth > 0 && <span className="text-gray-400 text-lg">↳</span>}
            </div>

            {/* 댓글 박스 */}
            <div className="p-2 border rounded bg-gray-50 flex-1 mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{comment.nickname}</span>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>

                {editing ? (
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 text-sm"
                        />
                        <button onClick={handleUpdate} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                            저장
                        </button>
                        <button onClick={() => setEditing(false)} className="px-2 py-1 border rounded text-sm">
                            취소
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <p className="text-gray-800 text-sm">
                            {comment.isDeleted ? "(삭제된 댓글입니다.)" : comment.content}
                        </p>
                        <div className="space-x-1 flex">
                            {!comment.isDeleted && isAuthor && (
                                <>
                                    <button onClick={() => setEditing(true)} className="text-blue-500 text-xs">수정</button>
                                    <button onClick={() => onDelete(comment.commentId)} className="text-red-500 text-xs">삭제</button>
                                </>
                            )}
                            {!comment.isDeleted && (
                                <button onClick={() => setReplying(!replying)} className="text-gray-500 text-xs">답글</button>
                            )}
                        </div>
                    </div>

                )}

                {/* 답글 작성 영역 */}
                {replying && (
                    <div className="mt-2 ml-4">
                        <CommentForm
                            onSubmit={(text) => {
                                onReply(text, comment.commentId);
                                setReplying(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
