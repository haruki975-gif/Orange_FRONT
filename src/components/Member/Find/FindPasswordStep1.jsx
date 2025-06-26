import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1UserCheck from "./Step1UserCheck";
import Step2EmailVerify from "./Step2EmailVerify";
import Step3ResetPassword from "./Step3ResetPassword";
import "../Login/LoginForm.css";

const FindPassword = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToStep = (targetStep) => setStep(targetStep);

  return (
    <div className="login-wrapper">
      {step === 1 && (
        <Step1UserCheck
          userId={userId}
          setUserId={setUserId}
          goToNextStep={goToNextStep}
        />
      )}

      {step === 2 && (
        <Step2EmailVerify
          userId={userId}
          userName={userName}
          setUserName={setUserName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          verifyCode={verifyCode}
          setVerifyCode={setVerifyCode}
          goToNextStep={goToNextStep}
        />
      )}

      {step === 3 && (
        <Step3ResetPassword
          userId={userId}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newPasswordConfirm={newPasswordConfirm}
          setNewPasswordConfirm={setNewPasswordConfirm}
          goToStep={goToStep}
        />
      )}
    </div>
  );
};

export default FindPassword;
