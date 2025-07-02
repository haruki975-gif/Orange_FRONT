import axios from "axios";

/**
 * 프로필 이미지 최초 등록 (POST)
 * @param {string | number} userNo - 사용자 번호
 * @param {FormData} formData - 업로드할 이미지 데이터 (FormData로 전송)
 * @param {string} token - 인증 토큰
 * @param {string} apiUrl - API 기본 URL
 * @returns {Promise} axios 응답
 */
export const uploadProfileImage = (userNo, formData, token, apiUrl) => {
  return axios.post(`${apiUrl}/api/profile/${userNo}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
