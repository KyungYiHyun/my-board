import { useNavigate } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

export default function Navbar() {
    const navigate = useNavigate();
    const memberId = localStorage.getItem("memberId"); // 로그인 상태 판단

    const handleLogout = () => {
        localStorage.removeItem("memberId"); // 로그아웃 처리
        alert("로그아웃 되었습니다.");
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="navbar-left">
                <button className="logo-button" onClick={() => window.location.href = "/"}>
                    My Board
                </button>
                <CategoryMenu />
            </div>
            <div className="flex gap-3">
                {memberId ? (
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
