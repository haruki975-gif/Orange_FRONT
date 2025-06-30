// 정규식 모음

export const validationRules = {
  userId: {
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,15}$/,
    message: "아이디는 영문+숫자 6~15자여야 합니다.",
  },
  userPw: {
    regex:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+=])[A-Za-z\d~`!@#$%^&*()_\-+=]{8,20}$/,
    message: "비밀번호는 8~20자 영문+숫자+특수문자를 포함해야 합니다.",
  },
  userName: {
    regex: /^[a-zA-Z가-힣]{2,10}$/,
    message: "이름은 2~10자 한글/영문이어야 합니다.",
  },
  userEmail: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "올바른 이메일 형식이 아닙니다.",
  },
  userPhone: {
    regex: /^[0-9]{11}$/,
    message: "연락처는 숫자 11자리여야 합니다.",
  },
};
