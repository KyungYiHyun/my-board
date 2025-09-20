import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostEdit() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const { postId } = useParams();
    const navigate = useNavigate();
    const loggedInMemberId = localStorage.getItem("memberId");

    const [form, setForm] = useState({
        title: "",
        content: "",
        memberId: loggedInMemberId || "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 기존 글 내용 불러오기
        axios
            .get(`${API_BASE_URL}/posts/${postId}`)
            .then((res) => {
                const post = res.data.result;

                if (loggedInMemberId !== String(post.memberId)) {
                    alert("수정 권한이 없습니다.");
                    navigate("/");
                    return;
                }

                setForm({
                    title: post.title,
                    content: post.content,
                    memberId: post.memberId,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("게시글 조회 실패", err);
                setLoading(false);
            });
    }, [postId, loggedInMemberId, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // PATCH 요청
            await axios.patch(`${API_BASE_URL}/posts/${postId}`, {
                title: form.title,
                content: form.content,
                memberId: form.memberId,
            });
            alert("글 수정 완료!");
            navigate(`/posts/${postId}`);
        } catch (err) {
            console.error("글 수정 실패", err);
            alert("글 수정 실패");
        }
    };

    if (loading) return <p className="text-gray-500 text-center mt-10">로딩 중...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 text-center">글 수정</h2>
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
                    수정 완료
                </button>
            </form>
        </div>
    );
}
