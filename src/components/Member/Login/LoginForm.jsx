import React, { useState } from "react";
import "./LoginForm.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [form, setForm] = useState({
    userId: "",
    password: "",
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
    console.log("로그인 데이터:", form);
  };

  return (
    <div className="login-wrapper">
      <h2 className="title">로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="userId"
          placeholder="아이디를 입력해주세요."
          value={form.userId}
          onChange={handleChange}
        />
        <p className="error-msg">아이디를 확인해 주세요.</p>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FiEyeOff size="24" color="#FF8C00" />
            ) : (
              <FiEye size="24" color="#FF8C00" />
            )}
          </button>
        </div>
        <p className="error-msg">비밀번호를 확인해 주세요.</p>

        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>

      <div className="login-links">
        <a href="#">비밀번호 찾기</a>
        <span>|</span>
        <a href="#">아이디 찾기</a>
        <span>|</span>
        <a href="#">회원가입</a>
      </div>
    </div>
  );
}

export default Login;
