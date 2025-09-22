import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function PostCreate() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const memberId = localStorage.getItem("memberId");
    const [categories, setCategory] = useState([]);
    const [form, setForm] = useState({
        title: "",
        content: "",
        categoryParentId: "",
        categoryChildId: ""
    });

    // 입력 값 변경
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/category`);
                const data = res.data.result;
                setCategory(data);
            } catch (err) {
                console.log("카테고리 전체 조회 실패", err)
            }
        }
        fetchCategory();
    }, [])

    // 글쓰기 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberId) {
            alert("로그인 후 글을 작성할 수 있습니다.");
            navigate("/login");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/posts`, {
                title: form.title,
                content: form.content,
                categoryParentId: Number(form.categoryParentId),
                categoryChildId: Number(form.categoryChildId),
                memberId: memberId
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
                <div className="flex space-x-4">
                    {/* 대분류 */}
                    <select
                        name="categoryParentId"
                        value={form.categoryParentId}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 text-sm w-1/2"
                        required
                    >
                        <option value="">대분류 선택</option>
                        {categories.map(cat => (
                            <option key={cat.parentId} value={cat.parentId}>
                                {cat.parentName}
                            </option>
                        ))}
                    </select>

                    {/* 소분류 */}
                    <select
                        name="categoryChildId"
                        value={form.categoryChildId}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 text-sm w-1/2"
                        required
                    >
                        <option value="">소분류 선택</option>
                        {categories
                            .find(cat => cat.parentId === Number(form.categoryParentId))
                            ?.childNames.map(child => (
                                <option key={child.id} value={child.id}>
                                    {child.name}
                                </option>
                            ))}
                    </select>
                </div>
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
