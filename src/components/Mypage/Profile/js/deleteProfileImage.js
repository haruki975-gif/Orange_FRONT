// 이미지 제거

import axios from "axios";

export const deleteProfileImage = (userNo, token, apiUrl) => {
  return axios.delete(`${apiUrl}/api/profile/${userNo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
