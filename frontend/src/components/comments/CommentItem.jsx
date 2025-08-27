import { useState } from "react";
import { format } from "date-fns";

export default function CommentItem({ comment, loggedInMemberId, onDelete, onUpdate }) {
    const isAuthor = loggedInMemberId === String(comment.memberId);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);

    const handleUpdate = () => {
        if (!content.trim()) return;
        onUpdate(comment.commentId, content);
        setEditing(false);
    };

    return (
        <div className="p-2 border rounded bg-gray-50">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{comment.nickname}</span>
                <div className="flex flex-col items-end">
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                    {comment.isEdited && (
                        <span className="text-gray-400 text-xs">
                            (수정됨: {new Date(comment.modifiedAt).toLocaleString()})
                        </span>
                    )}
                </div>
            </div>


            {editing ? (
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 border rounded px-2 py-1 text-sm"
                    />
                    <button
                        onClick={handleUpdate}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                        저장
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        className="px-2 py-1 border rounded text-sm"
                    >
                        취소
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 text-sm">{comment.content}</p>
                    {isAuthor && (
                        <div className="space-x-1">
                            <button
                                onClick={() => setEditing(true)}
                                className="text-blue-500 text-xs"
                            >
                                수정
                            </button>
                            <button
                                onClick={() => onDelete(comment.commentId)}
                                className="text-red-500 text-xs"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
