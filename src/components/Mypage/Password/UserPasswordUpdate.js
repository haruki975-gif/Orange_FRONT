// 비밀번호 변경

import axios from "axios";

export const updateUserPassword = (userNo, newPassword, token, apiUrl) => {
  return axios.put(
    `${apiUrl}/api/info/password-update/${userNo}`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
