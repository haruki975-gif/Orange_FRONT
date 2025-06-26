import React from "react";

const Step3ResetPassword = ({
  newPassword,
  setNewPassword,
  newPasswordConfirm,
  setNewPasswordConfirm,
  errorMsg,
  successMsg,
  handlePasswordResetSubmit,
}) => {
  return (
    <form onSubmit={handlePasswordResetSubmit} className="login-form">
      <input
        type="password"
        name="newPassword"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        name="newPasswordConfirm"
        placeholder="새 비밀번호 확인"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
      />
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <button type="submit" className="login-btn">
        확인
      </button>
    </form>
  );
};

export default Step3ResetPassword;
