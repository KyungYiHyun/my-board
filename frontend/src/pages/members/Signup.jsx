import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [form, setForm] = useState({
        loginId: "",
        memberName: "",
        password: "",
        birth: "",
        nickname: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/member/signup`, form);
            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            console.error("회원가입 실패", err);
            alert("회원가입 실패");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 text-center">회원가입</h2>
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
                    type="text"
                    name="memberName"
                    placeholder="이름"
                    value={form.memberName}
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
                <input
                    type="date"
                    name="birth"
                    value={form.birth}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                    type="text"
                    name="nickname"
                    placeholder="닉네임"
                    value={form.nickname}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}
