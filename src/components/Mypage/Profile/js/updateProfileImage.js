// 이미지 변경

import axios from "axios";

export const updateProfileImage = (userNo, formData, token, apiUrl) => {
  return axios.put(`${apiUrl}/api/profile/${userNo}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
