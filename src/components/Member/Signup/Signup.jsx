import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupInput from "./SignupInput";
import "./Signup.css";
// 정규식 모음
import { validationRules } from "./js/validationRules";
// validateField, validateForm
import { validateForm } from "./js/validationUtils";
// 아이디, 이메일, 연락처 중복체크용 커스텀 훅
import { useDuplicateCheck } from "./js/useDuplicateCheck";
import { validateField } from "./js/validationUtils";

function Signup() {
  const navi = useNavigate();
  const apiUrl = URL_CONFIG.API_URL;

  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userPwConfirm: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress1: "",
    userAddress2: "",
  });

  const [successMessages, setSuccessMessages] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // 중복 확인 여부
  const [isDuplicateChecked, setIsDuplicateChecked] = useState({
    userId: false,
    userEmail: false,
    userPhone: false,
  });

  // 비밀번호 보기/끄기
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // input값 변경되면 실행, 에러메시지 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value, formData);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // 중복확인 결과 상태 업데이트
  const setFieldStatus = (
    field,
    error = "",
    success = "",
    isDupChecked = false
  ) => {
    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
    setSuccessMessages((prev) => ({
      ...prev,
      [field]: success,
    }));
    setIsDuplicateChecked((prev) => ({
      ...prev,
      [field]: isDupChecked,
    }));
  };

  // 아이디, 이메일, 연락처 중복체크
  useDuplicateCheck(
    "userId",
    formData.userId,
    apiUrl,
    validationRules,
    setFieldStatus
  );
  useDuplicateCheck(
    "userEmail",
    formData.userEmail,
    apiUrl,
    validationRules,
    setFieldStatus
  );
  useDuplicateCheck(
    "userPhone",
    formData.userPhone,
    apiUrl,
    validationRules,
    setFieldStatus
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formData, validationRules);
    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      alert("입력한 정보를 다시 확인해주세요.");
      return;
    }

    const requestData = {
      userId: formData.userId,
      userPw: formData.userPw,
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhone: formData.userPhone,
      userAddress1: formData.userAddress1,
      userAddress2: formData.userAddress2,
    };

    axios
      .post(`${apiUrl}/api/members`, requestData)
      .then((response) => {
        console.log("회원가입 성공:", response.data);
        alert("회원가입이 완료되었습니다.");
        navi("/login");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <SignupInput
      formData={formData}
      validationErrors={validationErrors}
      successMessages={successMessages}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      toggleShowPassword={toggleShowPassword}
      showPassword={showPassword}
      setFormData={setFormData}
    />
  );
}

export default Signup;
