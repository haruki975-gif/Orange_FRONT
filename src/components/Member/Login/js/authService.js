import axios from "axios";

const apiUrl = URL_CONFIG.API_URL;

// 로그인 상태 확인
export const checkAuthStatus = () => {
  const token = sessionStorage.getItem("accessToken");
  return !!token;
};

// 로그인
export const login = (userId, userPw) => {
  return axios
    .post(`${apiUrl}/api/auth/tokens`, {
      userId,
      userPw,
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// 로그아웃
export const logout = () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    clearAuthData();
    alert("이미 로그인 만료 상태입니다.");
    navi("/");
    return;
  }

  return axios
    .post(
      `${apiUrl}/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      clearAuthData();
      window.location.replace("/");
    });
};

// 인증 데이터 제거
const clearAuthData = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("userNo");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userRole");

  // 로그인 상태 변경
  window.dispatchEvent(new Event("loginStateChanged"));
};

// 사용자 데이터 가져오기
export const getUserData = () => {
  return {
    no: sessionStorage.getItem("userNo"),
    id: sessionStorage.getItem("userId"),
    name: sessionStorage.getItem("userName"),
    role: sessionStorage.getItem("userRole"),
  };
};

// 토큰 갱신 함수(토큰 만료 시 사용)
export const refreshToken = () => {
  const refreshToken = sessionStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("리프레시 토큰이 존재하지 않습니다.");
  }

  // 서버에 갱신 요청
  return axios
    .post(`${apiUrl}/api/auth/refresh`, {
      refreshToken: refreshToken,
    })
    .then((response) => {
      // 새 토큰 세션에 저장
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);

      if (!refreshToken) {
        sessionStorage.setItem("refreshToken", newRefreshToken);
      }
      return response.data;
    })
    .catch((error) => {
      // 갱신 실패 시 로그아웃
      clearAuthData();
      throw error;
    });
};
