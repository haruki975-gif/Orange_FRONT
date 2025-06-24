import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupInput from "./SignupInput";
import "./Signup.css";

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
  const [isDuplicateChecked, setIsDuplicateChecked] = useState({
    userId: false,
    userEmail: false,
    userPhone: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validationRules = {
    userId: {
      regex: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,15}$/,
      message: "아이디는 영문+숫자 6~15자여야 합니다.",
    },
    userPw: {
      regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@._^])[a-zA-Z\d!@._^]{8,20}$/,
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

  const validateField = (name, value) => {
    let error = "";

    if (name === "userPwConfirm") {
      if (value !== formData.userPw) {
        error = "비밀번호가 일치하지 않습니다.";
      }
    } else if (validationRules[name]) {
      if (!validationRules[name].regex.test(value)) {
        error = validationRules[name].message;
      }
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

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

  // 아이디 중복확인
  useEffect(() => {
    if (formData.userId.length >= 6) {
      const idRegex = validationRules.userId.regex;
      if (!idRegex.test(formData.userId)) {
        setFieldStatus("userId", validationRules.userId.message);
        return;
      }

      axios
        .get(`${apiUrl}/api/members/check-id/${formData.userId}`)
        .then((res) => {
          if (res.data?.message === "사용 가능한 아이디입니다.") {
            setFieldStatus("userId", "", "사용 가능한 아이디입니다.", true);
          } else {
            setFieldStatus("userId", "이미 사용중인 아이디입니다.");
          }
        })
        .catch((err) => {
          console.error("아이디 중복 확인 에러", err);
        });
    }
  }, [formData.userId]);

  // 이메일 중복확인
  useEffect(() => {
    if (formData.userEmail.length > 5) {
      const emailRegex = validationRules.userEmail.regex;
      if (!emailRegex.test(formData.userEmail)) {
        setFieldStatus("userEmail", validationRules.userEmail.message);
        return;
      }

      axios
        .get(`${apiUrl}/api/members/check-email/${formData.userEmail}`)
        .then((res) => {
          if (res.data?.message === "사용 가능한 이메일입니다.") {
            setFieldStatus("userEmail", "", "사용 가능한 이메일입니다.", true);
          } else {
            setFieldStatus("userEmail", "이미 사용중인 이메일입니다.");
          }
        })
        .catch((err) => {
          console.error("이메일 중복 확인 에러", err);
        });
    }
  }, [formData.userEmail]);

  // 연락처 중복확인
  useEffect(() => {
    if (formData.userPhone.length === 11) {
      const phoneRegex = validationRules.userPhone.regex;
      if (!phoneRegex.test(formData.userPhone)) {
        setFieldStatus("userPhone", validationRules.userPhone.message);
        return;
      }

      axios
        .get(`${apiUrl}/api/members/check-phone/${formData.userPhone}`)
        .then((res) => {
          if (res.data?.message === "사용 가능한 연락처입니다.") {
            setFieldStatus("userPhone", "", "사용 가능한 연락처입니다.", true);
          } else {
            setFieldStatus("userPhone", "이미 사용중인 연락처입니다.");
          }
        })
        .catch((err) => {
          console.error("연락처 중복 확인 에러", err);
        });
    }
  }, [formData.userPhone]);

  const validateForm = () => {
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
