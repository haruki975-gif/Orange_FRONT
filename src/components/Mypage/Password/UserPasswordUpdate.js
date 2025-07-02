// 비밀번호 변경

import axios from "axios";

export const updateUserPassword = (
  userNo,
  userPassword,
  newPassword,
  token,
  apiUrl
) => {
  return axios.put(
    `${apiUrl}/api/info/password-update/${userNo}`,
    {
      userPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
