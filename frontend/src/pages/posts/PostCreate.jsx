import { useState, useEffect, useRef } from "react";
import apiClient from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { checkAuthStatus } from "../../utils/auth";

export default function PostCreate() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [categories, setCategory] = useState([]);
    const quillRef = useRef(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        categoryParentId: "",
        categoryChildId: ""
    });

    const handleInsertToEditor = (type, url) => {
        const editor = quillRef.current?.getEditor();
        if (!editor) return;
        const range = editor.getSelection(true);
        if (type === "image") {
            editor.insertEmbed(range ? range.index : 0, "image", url, "user");
        } else if (type === "video") {
            editor.insertEmbed(range ? range.index : 0, "video", url, "user");
        }
        editor.setSelection((range ? range.index : 0) + 1);
    };

    const uploadFile = async (media) => {
        try {
            const formData = new FormData();
            formData.append("media", media);
            const res = await apiClient.post(`${API_BASE_URL}/posts/upload`, formData);
            // Expecting { result: { url: string } } from server
            return res?.data?.result?.url;
        } catch (e) {
            console.error("파일 업로드 실패", e);
            alert("파일 업로드에 실패했습니다.");
            return null;
        }
    };

    const selectLocalFile = (accept) => {
        return new Promise((resolve) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", accept);
            input.onchange = () => {
                const file = input.files && input.files[0];
                resolve(file || null);
            };
            input.click();
        });
    };

    const imageHandler = async () => {
        const file = await selectLocalFile("image/*");
        if (!file) return;
        const url = await uploadFile(file);
        if (url) handleInsertToEditor("image", url);
    };

    const videoHandler = async () => {
        const file = await selectLocalFile("video/*");
        if (!file) return;
        const url = await uploadFile(file);
        if (url) handleInsertToEditor("video", url);
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image", "video"],
                ["clean"],
            ],
            handlers: {
                image: imageHandler,
                video: videoHandler,
            },
        },
    };


    // 입력 값 변경
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await apiClient.get(`${API_BASE_URL}/category`);
                const data = res.data.result;
                setCategory(data);
            } catch (err) {
                console.log("카테고리 전체 조회 실패", err)
            }
        }
        fetchCategory();
    }, [API_BASE_URL])

    // 글쓰기 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isAuth = await checkAuthStatus(API_BASE_URL);
        if (!isAuth) {
            alert("로그인 후 글을 작성할 수 있습니다.");
            navigate("/login");
            return;
        }

        try {
            const editorHtml = quillRef.current?.getEditor()?.root?.innerHTML ?? form.content;
            await apiClient.post(`${API_BASE_URL}/posts`, {
                title: form.title,
                content: editorHtml,
                categoryParentId: Number(form.categoryParentId),
                categoryChildId: Number(form.categoryChildId),
            });
            alert("글 작성 완료!");
            navigate("/"); // 게시글 목록으로 이동
        } catch (err) {
            console.error("글 작성 실패", err);
            alert("글 작성 실패");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-10">
                <div className="w-[900px] bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h2 className="text-xl font-semibold">글 작성</h2>
                        <p className="text-sm text-gray-500 mt-1">제목, 카테고리, 본문을 작성하고 이미지/동영상을 업로드하세요.</p>
                    </div>

                    <div className="px-6 py-6 space-y-5">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">제목</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="제목을 입력하세요"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">대분류</label>
                                <select
                                    name="categoryParentId"
                                    value={form.categoryParentId}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">대분류 선택</option>
                                    {categories.map(cat => (
                                        <option key={cat.parentId} value={cat.parentId}>{cat.parentName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">소분류</label>
                                <select
                                    name="categoryChildId"
                                    value={form.categoryChildId}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">소분류 선택</option>
                                    {categories
                                        .find(cat => cat.parentId === Number(form.categoryParentId))
                                        ?.childNames.map(child => (
                                            <option key={child.id} value={child.id}>{child.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">본문</label>
                            <div className="rounded-lg border border-gray-300">
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    className="bg-white"
                                    style={{ height: "500px" }}
                                    value={form.content}
                                    onChange={(value) => setForm({ ...form, content: value })}
                                    modules={modules}
                                />
                                <div className="h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => navigate(-1)}
                        >
                            취소
                        </button>
                        <button
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            onClick={handleSubmit}
                        >
                            작성하기
                        </button>
                    </div>
                </div>
            </div>

        </>

    );


}
