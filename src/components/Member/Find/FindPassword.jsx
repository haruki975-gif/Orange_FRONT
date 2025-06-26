import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1UserCheck from "./Step1UserCheck";
import Step2EmailVerify from "./Step2EmailVerify";
import Step3ResetPassword from "./Step3ResetPassword";
import "../../Member/Form.css";

const FindPassword = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [serverCode, setServerCode] = useState(""); // 서버에서 온 인증번호 저장

  return (
    <div className="page-container">
      <div className="login-wrapper">
        {/* 아이디 조회 */}
        {step === 1 && (
          <Step1UserCheck
            userId={userId}
            setUserId={setUserId}
            setStep={setStep}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        )}

        {/* 이메일 인증 */}
        {step === 2 && (
          <Step2EmailVerify
            userId={userId}
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            emailCode={emailCode}
            setEmailCode={setEmailCode}
            serverCode={serverCode}
            setServerCode={setServerCode}
            setStep={setStep}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        )}

        {/* 비밀번호 변경 */}
        {step === 3 && <Step3ResetPassword userId={userId} />}
      </div>
    </div>
  );
};

export default FindPassword;
