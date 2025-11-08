import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryMenu from "./CategoryMenu";
import { checkAuthStatus } from "../utils/auth";
import apiClient from "../utils/axios";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const [authenticated, setAuthenticated] = useState(false);

    // 인증 상태 확인
    useEffect(() => {
        const verifyAuth = async () => {
            const isLoggedIn = await checkAuthStatus(API_BASE_URL);
            setAuthenticated(isLoggedIn);
        };
        verifyAuth();
    }, [location, API_BASE_URL]); // 페이지 이동 시마다 확인

    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청
            await apiClient.post(`${API_BASE_URL}/member/logout`);
        } catch (err) {
            console.error("로그아웃 요청 실패", err);
        } finally {
            // localStorage에 저장된 memberId가 있다면 제거
            if (localStorage.getItem("memberId")) {
                localStorage.removeItem("memberId");
            }
            // 즉시 인증 상태를 false로 설정
            setAuthenticated(false);

            // 서버에서 인증 상태를 다시 확인 (비동기로 확인하여 나중에 업데이트)
            checkAuthStatus(API_BASE_URL).then(isLoggedIn => {
                setAuthenticated(isLoggedIn);
            });

            alert("로그아웃 되었습니다.");
            navigate("/login");
        }
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="navbar-left">
                <button className="logo-button" onClick={() => window.location.href = "/"}>
                    Dev Board
                </button>
                <CategoryMenu />
            </div>
            <div className="flex gap-3">
                {authenticated ? (
                    <>
                        <button
                            onClick={() => navigate("/create")}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                            글쓰기
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 text-sm"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            회원가입
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
