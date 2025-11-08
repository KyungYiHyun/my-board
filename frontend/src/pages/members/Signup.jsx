import { useEffect, useState } from "react";
import apiClient from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, verifyEmailVerification } from "../../utils/emailAuth";

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

    const [emailCode, setEmailCode] = useState("");
    const [emailCodeSent, setEmailCodeSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [emailLocal, setEmailLocal] = useState("");
    const [emailDomain, setEmailDomain] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 입력값 확인
        const fieldLabels = {
            loginId: "이메일(아이디)",
            memberName: "이름",
            password: "비밀번호",
            birth: "생년월일",
            nickname: "닉네임",
        };
        const requiredKeys = ["loginId", "memberName", "password", "birth", "nickname"];
        const missing = requiredKeys.filter((k) => !String(form[k] || "").trim());
        if (missing.length > 0) {
            alert(`다음 항목을 입력해주세요: ${missing.map((k) => fieldLabels[k]).join(", ")}`);
            return;
        }

        // 이메일 형식 간단 확인
        const emailPattern = /.+@.+\..+/;
        if (!emailPattern.test(form.loginId)) {
            alert("올바른 이메일 주소를 입력해주세요.");
            return;
        }

        if (!emailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        try {
            await apiClient.post(`${API_BASE_URL}/member/signup`, form);
            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            console.error("회원가입 실패", err);
            const status = err?.response?.status;
            const data = err?.response?.data;
            const serverMessage = data?.message || data?.result?.message;
            // 상태 코드별 안내 메시지 보강
            const fallback =
                status === 412 ? "이미 사용 중인 아이디입니다." : undefined;
            alert(serverMessage || fallback || "회원가입 실패");
        }
    };

    const handleSendCode = async () => {
        if (!form.loginId) {
            alert("이메일을 입력해주세요.");
            return;
        }
        try {
            setIsSending(true);
            await sendEmailVerification(API_BASE_URL, form.loginId);
            setEmailCodeSent(true);
            setEmailVerified(false);
            setRemainingSeconds(300);
            alert("인증 코드가 전송되었습니다. 5분 내에 인증해주세요.");
        } catch (err) {
            console.error("인증 코드 전송 실패", err);
            alert("인증 코드 전송에 실패했습니다.");
        } finally {
            setIsSending(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!emailCode) {
            alert("인증 코드를 입력해주세요.");
            return;
        }
        try {
            const result = await verifyEmailVerification(API_BASE_URL, form.loginId, emailCode);
            const ok = result?.ok === true; // normalized to isVerified only (or 204)
            if (!ok) {
                alert("인증코드가 일치하지 않습니다.");
                return;
            }
            setEmailVerified(true);
            setRemainingSeconds(0);
            alert("이메일 인증이 완료되었습니다.");
        } catch (err) {
            console.error("인증 실패", err);
            alert("인증에 실패했습니다. 코드와 시간을 확인해주세요.");
        }
    };

    useEffect(() => {
        if (!emailCodeSent || emailVerified) return;
        if (remainingSeconds <= 0) return;
        const timer = setInterval(() => {
            setRemainingSeconds((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [emailCodeSent, emailVerified, remainingSeconds]);

    // 이메일 파트 입력 시 loginId를 동기화: {local}@{domain}
    useEffect(() => {
        const local = emailLocal.trim();
        const domain = emailDomain.trim();
        const combined = local && domain ? `${local}@${domain}` : "";
        setForm((prev) => (prev.loginId === combined ? prev : { ...prev, loginId: combined }));
    }, [emailLocal, emailDomain]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow relative">
            {isSending && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <span className="text-sm font-medium">인증코드 전송중...</span>
                </div>
            )}
            <h2 className="text-lg font-bold mb-4 text-center">회원가입</h2>
            <form onSubmit={handleSubmit} className="space-y-3" aria-busy={isSending}>
                {/* 아이디(이메일) 입력 및 인증: local@domain */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="이메일 이름"
                            value={emailLocal}
                            onChange={(e) => setEmailLocal(e.target.value)}
                            className="flex-1 min-w-0 border rounded px-3 py-2 text-sm"
                            disabled={emailVerified || isSending}
                            autoComplete="off"
                            inputMode="email"
                        />
                        <span className="px-1 text-gray-500 select-none">@</span>
                        <input
                            type="text"
                            placeholder="example.com"
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            className="flex-1 min-w-0 border rounded px-3 py-2 text-sm"
                            disabled={emailVerified || isSending}
                            autoComplete="off"
                            inputMode="email"
                        />
                        {(() => {
                            // 카운트다운 중에도 재전송 허용: 전송 중이거나 이미 인증완료인 경우만 비활성화
                            const isResendDisabled = isSending || emailVerified;
                            const disabledClasses = "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 pointer-events-none";
                            const enabledClasses = "bg-gray-200 hover:bg-gray-300";
                            return (
                                <button
                                    type="button"
                                    onClick={handleSendCode}
                                    className={`ml-2 px-4 h-[38px] text-sm rounded whitespace-nowrap ${isResendDisabled ? disabledClasses : enabledClasses}`}
                                    disabled={isResendDisabled}
                                    aria-disabled={isResendDisabled}
                                >
                                    {isSending ? "전송중" : (emailVerified ? "인증완료" : emailCodeSent ? "재전송" : "인증코드 전송")}
                                </button>
                            );
                        })()}
                    </div>
                    {emailCodeSent && !emailVerified && (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="인증코드 입력"
                                value={emailCode}
                                onChange={(e) => setEmailCode(e.target.value)}
                                className="flex-1 border rounded px-3 py-2 text-sm"
                                disabled={isSending}
                            />
                            <button
                                type="button"
                                onClick={handleVerifyCode}
                                className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 whitespace-nowrap"
                                disabled={isSending}
                            >
                                인증하기
                            </button>
                            <span className="text-xs text-gray-500 w-20 text-right">
                                {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, '0')}
                            </span>
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    name="memberName"
                    placeholder="이름"
                    value={form.memberName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    disabled={isSending}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    disabled={isSending}
                />
                <input
                    type="date"
                    name="birth"
                    value={form.birth}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    disabled={isSending}
                />
                <input
                    type="text"
                    name="nickname"
                    placeholder="닉네임"
                    value={form.nickname}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    disabled={isSending}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
                    disabled={isSending || !emailVerified}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}
