import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "userId":
        if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,15}$/.test(value)) {
          error = "아이디는 영문+숫자 6~15자여야 합니다.";
        }
        break;
      case "userPw":
        if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@._^])[a-zA-Z\d!@._^]{8,20}$/.test(
            value
          )
        ) {
          error = "비밀번호는 8~20자 영문+숫자+특수문자를 포함해야 합니다.";
        }
        break;
      case "userPwConfirm":
        if (value !== formData.userPw) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case "userName":
        if (!/^[a-zA-Z가-힣]{2,10}$/.test(value)) {
          error = "이름은 2~10자 한글/영문이어야 합니다.";
        }
        break;
      case "userEmail":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = "올바른 이메일 형식이 아닙니다.";
        }
        break;
      case "userPhone":
        if (!/^[0-9]{11}$/.test(value)) {
          error = "연락처는 숫자 11자리여야 합니다.";
        }
        break;
      default:
        break;
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // 아이디 자동 중복확인
  useEffect(() => {
    if (formData.userId.length >= 6) {
      const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,15}$/;
      if (!idRegex.test(formData.userId)) {
        setValidationErrors((prev) => ({
          ...prev,
          userId: "아이디는 영문+숫자 6~15자여야 합니다.",
        }));
        setIsDuplicateChecked((prev) => ({
          ...prev,
          userId: false,
        }));
        return;
      }

      axios
        .get(`${apiUrl}/api/members/check-id/${formData.userId}`)
        .then((res) => {
          if (res.data && res.data.message === "사용 가능한 아이디입니다.") {
            setValidationErrors((prev) => ({
              ...prev,
              userId: "",
            }));
            setSuccessMessages((prev) => ({
              ...prev,
              userId: "사용 가능한 아이디입니다.",
            }));
            setIsDuplicateChecked((prev) => ({
              ...prev,
              userId: true,
            }));
          } else {
            setValidationErrors((prev) => ({
              ...prev,
              userId: "이미 사용중인 아이디입니다.",
            }));
            setSuccessMessages((prev) => ({
              ...prev,
              userId: "",
            }));
            setIsDuplicateChecked((prev) => ({
              ...prev,
              userId: false,
            }));
          }
        })
        .catch((err) => {
          console.error("아이디 중복 확인 에러", err);
        });
    }
  }, [formData.userId]);

  // 이메일 자동 중복확인
  useEffect(() => {
    if (formData.userEmail.length > 5) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.userEmail)) {
        setValidationErrors((prev) => ({
          ...prev,
          userEmail: "올바른 이메일 형식이 아닙니다.",
        }));
        setIsDuplicateChecked((prev) => ({
          ...prev,
          userEmail: false,
        }));
        return;
      }

      axios
        .get(`${apiUrl}/api/members/check-email/${formData.userEmail}`)
        .then((res) => {
          if (res.data && res.data.message === "사용 가능한 이메일입니다.") {
            setValidationErrors((prev) => ({
              ...prev,
              userEmail: "",
            }));
            setSuccessMessages((prev) => ({
              ...prev,
              userEmail: "사용 가능한 이메일입니다.",
            }));
            setIsDuplicateChecked((prev) => ({
              ...prev,
              userEmail: true,
            }));
          } else {
            setValidationErrors((prev) => ({
              ...prev,
              userEmail: "이미 사용중인 이메일입니다.",
            }));
            setSuccessMessages((prev) => ({
              ...prev,
              userEmail: "",
            }));
            setIsDuplicateChecked((prev) => ({
              ...prev,
              userEmail: false,
            }));
          }
        })
        .catch((err) => {
          console.error("이메일 중복 확인 에러", err);
        });
    }
  }, [formData.userEmail]);

  // 연락처 자동 중복확인
  useEffect(() => {
    if (formData.userPhone.length === 11) {
      const phoneRegex = /^[0-9]{11}$/;
      if (!phoneRegex.test(formData.userPhone)) {
        setValidationErrors((prev) => ({
          ...prev,
          userPhone: "연락처는 숫자 11자리여야 합니다.",
        }));
        setIsDuplicateChecked((prev) => ({
          ...prev,
          userPhone: false,
        }));
        return;
      }

      axios
        .get(`${apiUrl}/api/members/check-phone/${formData.userPhone}`)
        .then((res) => {
          if (res.data && res.data.message === "사용 가능한 연락처입니다.") {
            setValidationErrors((prev) => ({
              ...prev,
              userPhone: "",
            }));
            setSuccessMessages((prev) => ({
              ...prev,
              userPhone: "사용 가능한 연락처입니다.",
            }));
            setIsDuplicateChecked((prev) => ({
              ...prev,
              userPhone: true,
            }));
          } else {
            setValidationErrors((prev) => ({
              ...prev,
              userPhone: "이미 사용중인 연락처입니다.",
            }));
            setSuccessMessages((prev) => ({
              ...prev,
              userPhone: "",
            }));
            setIsDuplicateChecked((prev) => ({
              ...prev,
              userPhone: false,
            }));
          }
        })
        .catch((err) => {
          console.error("연락처 중복 확인 에러", err);
        });
    }
  }, [formData.userPhone]);

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

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
    <div className="signup-wrapper">
      <h2 className="title">회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        {validationErrors.userId && (
          <p className="error-msg">{validationErrors.userId}</p>
        )}
        {successMessages.userId && (
          <p className="success-msg">{successMessages.userId}</p>
        )}

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="userPw"
            placeholder="비밀번호"
            value={formData.userPw}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FiEyeOff color="#FF8C00" size="24" />
            ) : (
              <FiEye color="#FF8C00" size="24" />
            )}
          </button>
        </div>
        {validationErrors.userPw && (
          <p className="error-msg">{validationErrors.userPw}</p>
        )}

        <input
          type="password"
          name="userPwConfirm"
          placeholder="비밀번호 확인"
          value={formData.userPwConfirm}
          onChange={handleChange}
          required
        />
        {validationErrors.userPwConfirm && (
          <p className="error-msg">{validationErrors.userPwConfirm}</p>
        )}

        <input
          type="text"
          name="userName"
          placeholder="이름"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        {validationErrors.userName && (
          <p className="error-msg">{validationErrors.userName}</p>
        )}

        <input
          type="text"
          name="userEmail"
          placeholder="이메일"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
        {validationErrors.userEmail && (
          <p className="error-msg">{validationErrors.userEmail}</p>
        )}
        {successMessages.userEmail && (
          <p className="success-msg">{successMessages.userEmail}</p>
        )}

        <input
          type="text"
          name="userPhone"
          placeholder="연락처 (숫자 11자리)"
          maxLength={11}
          value={formData.userPhone}
          onChange={handleChange}
          required
        />
        {validationErrors.userPhone && (
          <p className="error-msg">{validationErrors.userPhone}</p>
        )}
        {successMessages.userPhone && (
          <p className="success-msg">{successMessages.userPhone}</p>
        )}

        <div className="address-field">
          <input
            type="text"
            name="userAddress1"
            placeholder="주소"
            value={formData.userAddress1}
            onChange={handleChange}
            required
          />
          <button type="button" className="search-btn">
            <FiSearch size="20" color="#FF8C00" />
            <span>검색</span>
          </button>
        </div>

        <input
          type="text"
          name="userAddress2"
          placeholder="상세주소"
          value={formData.userAddress2}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-btn">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default Signup;
