import axios from 'axios';

// axios 기본 설정
const apiClient = axios.create({
    withCredentials: true, // 모든 요청에 쿠키 포함
});

// 응답 인터셉터: 401 에러 처리
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 세션이 없거나 만료된 경우
            // localStorage에 저장된 memberId가 있다면 제거
            if (localStorage.getItem('memberId')) {
                localStorage.removeItem('memberId');
            }
            // 로그인 페이지로 리다이렉트
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

