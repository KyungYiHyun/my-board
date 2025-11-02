import { useState } from "react";
import apiClient from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [form, setForm] = useState({
        loginId: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post(`${API_BASE_URL}/member/login`, form);
            // 로그인 성공 시 JSESSIONID 쿠키가 자동으로 설정됨
            alert("로그인 성공!");
            navigate("/");
        } catch (err) {
            console.error("로그인 실패", err);
            alert("로그인 실패");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 text-center">로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="loginId"
                    placeholder="아이디"
                    value={form.loginId}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}
