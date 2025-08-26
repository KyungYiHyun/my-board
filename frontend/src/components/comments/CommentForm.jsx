import { useState } from "react";

export default function CommentForm({ onSubmit }) {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content);
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
            <input
                type="text"
                placeholder="댓글을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
            >
                작성
            </button>
        </form>
    );
}
