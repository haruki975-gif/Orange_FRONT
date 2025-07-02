// 현재 비밀번호 확인

import axios from "axios";

export const UserPasswordCheck = (userNo, userPassword, token, apiUrl) => {
  return axios.post(
    `${apiUrl}/api/info/password-check/${userNo}`,
    { userPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
