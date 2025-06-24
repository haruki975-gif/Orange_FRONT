import React, { useState } from "react";
import { FiEye, FiEyeOff, FiSearch } from "react-icons/fi";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    name: "",
    address: "",
    addressDetail: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 데이터:", form);
  };

  return (
    <div className="signup-wrapper">
      <h2 className="title">회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={form.userId}
          onChange={handleChange}
        />
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <p className="error-msg">
          아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.
          <br />
          비밀번호: 8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
        </p>
        <input
          type="text"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="연락처"
          value={form.phone}
          onChange={handleChange}
        />
        <p className="error-msg">이메일/연락처를 확인해 주세요.</p>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
        />
        <div className="address-field">
          <input
            type="text"
            name="address"
            placeholder="주소"
            value={form.address}
            onChange={handleChange}
          />
          <button type="button" className="search-btn">
            <FiSearch size="20" color="#FF8C00" />
            <span>검색</span>
          </button>
        </div>
        <input
          type="text"
          name="addressDetail"
          placeholder="상세주소"
          value={form.addressDetail}
          onChange={handleChange}
        />
        <button type="submit" className="signup-btn">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default Signup;
