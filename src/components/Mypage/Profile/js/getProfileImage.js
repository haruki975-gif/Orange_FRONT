// 이미지 조회

import axios from "axios";

export const getProfileImage = (userNo, token, apiUrl) => {
  return axios.get(`${apiUrl}/api/profile/${userNo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
