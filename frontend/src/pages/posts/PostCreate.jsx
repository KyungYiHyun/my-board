import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const memberId = localStorage.getItem("memberId");

    const [form, setForm] = useState({
        title: "",
        content: "",
    });

    // 입력 값 변경
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 글쓰기 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberId) {
            alert("로그인 후 글을 작성할 수 있습니다.");
            navigate("/login");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/posts`, {
                ...form,
                memberId, // 글 작성자
            });
            alert("글 작성 완료!");
            navigate("/"); // 게시글 목록으로 이동
        } catch (err) {
            console.error("글 작성 실패", err);
            alert("글 작성 실패");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 text-center">글 작성</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 입력하세요"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    required
                />
                <textarea
                    name="content"
                    placeholder="내용을 입력하세요"
                    value={form.content}
                    onChange={handleChange}
                    rows={8}
                    className="w-full border rounded px-3 py-2 text-sm"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
                >
                    작성 완료
                </button>
            </form>
        </div>
    );
}
