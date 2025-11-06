import apiClient from './axios';

export const sendEmailVerification = async (apiBaseUrl, email) => {
    const response = await apiClient.post(`${apiBaseUrl}/auth/email/send`, { email });
    return response.data;
};

// Normalize verify response to determine success reliably
export const verifyEmailVerification = async (apiBaseUrl, email, code) => {
    const response = await apiClient.post(`${apiBaseUrl}/auth/email/verify`, { email, code });
    const data = response.data;
    // Only consider isVerified flags
    const explicit = (data.result.isVerified === true);
    // If no body but 204, treat as success
    const inferred = response.status === 204 && !data ? true : false;
    return { ok: explicit === true || inferred === true, data };
};
