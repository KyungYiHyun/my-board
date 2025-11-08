import apiClient from './axios';

/**
 * 서버에 인증 상태 확인 요청
 * @param {string} apiBaseUrl API 베이스 URL
 * @returns {Promise<boolean>} 인증된 상태면 true
 */
export const checkAuthStatus = async (apiBaseUrl) => {

    try {
        const response = await apiClient.get(`${apiBaseUrl}/member/me`);
        return response.data?.result?.isLoggedIn === true;
    } catch (err) {
        // 에러 발생 시 인증되지 않은 것으로 간주
        return false;
    }
};

/**
 * JSESSIONID 쿠키 존재 여부 확인 (레거시 - 하위 호환성)
 * @returns {boolean} JSESSIONID 쿠키가 존재하면 true
 * @deprecated HttpOnly 쿠키는 JavaScript로 읽을 수 없으므로 checkAuthStatus를 사용하세요
 */
// export const isAuthenticated = () => {
//     // document.cookie에서 JSESSIONID 찾기
//     const cookies = document.cookie.split(';');
//     return cookies.some(cookie => cookie.trim().startsWith('JSESSIONID='));
// };

/**
 * 쿠키에서 특정 값을 가져오기
 * @param {string} name 쿠키 이름
 * @returns {string|null} 쿠키 값 또는 null
 */
export const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
};

