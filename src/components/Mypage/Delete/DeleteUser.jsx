import axios from "axios";
import "../../Member/Form.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteUser = () => {
  const apiUrl = URL_CONFIG.API_URL;
  const navi = useNavigate();

  const handleDeleteUser = () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmed) return;

    const token = sessionStorage.getItem("accessToken");
    const userNo = sessionStorage.getItem("userNo");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    axios
      .delete(`${apiUrl}/api/members/${userNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("회원 탈퇴가 완료되었습니다.");
        sessionStorage.clear();
        window.location.replace("/");
      })
      .catch((error) => {
        console.log("회원 탈퇴 실패", error);
        alert("회원 탈퇴 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        <h2 className="title">회원탈퇴</h2>
        <p className="delete-warning">
          탈퇴 후 서비스 이용이 불가합니다. <br />
          회원정보 및 이용내역은 모두 삭제되며 복구가 불가능합니다. <br />
          탈퇴 후 동일 아이디로 재가입이 제한될 수 있습니다. <br />
          <br />위 내용을 확인하였으며 탈퇴를 진행하시겠습니까?
        </p>
        <button className="common-btn" onClick={handleDeleteUser}>
          탈퇴하기
        </button>
        <button className="back-btn" onClick={() => navi("/mypage-main")}>
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
