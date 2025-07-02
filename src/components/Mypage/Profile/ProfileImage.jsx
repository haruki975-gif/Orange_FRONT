import axios from "axios";
import { useEffect, useState } from "react";
import { getProfileImage } from "./js/getProfileImage";
import { deleteProfileImage } from "./js/deleteProfileImage";
import { updateProfileImage } from "./js/updateProfileImage";
import { uploadProfileImage } from "./js/uploadProfileImage";
import "../../Member/Form.css";
import "./profileImage.css";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileImage = () => {
  const token = sessionStorage.getItem("accessToken");
  const userNo = sessionStorage.getItem("userNo");
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const navi = useNavigate();
  const apiUrl = URL_CONFIG.API_URL;

  const [profileImage, setProfileImage] = useState(null); // 서버에서 불러온 이미지
  const [selectedFile, setSelectedFile] = useState(null); // 새로 업로드할 이미지
  const [previewUrl, setPreviewUrl] = useState(null); // 미리보기 URL
  const [message, setMessage] = useState(""); // 사용자 알림 메시지

  const formData = new FormData();
  formData.append("file", selectedFile);

  /* 프로필 이미지 조회 */
  useEffect(() => {
    getProfileImage(userNo, token, apiUrl)
      .then((response) => {
        const url = response.data.items?.[0]?.profileUrl;
        if (url) {
          setProfileImage(url); // 등록된 이미지가 있는 경우
        } else {
          setProfileImage(null); // 없으면 기본 이미지 보여주기
        }
      })
      .catch((error) => {
        console.log("프로필 이미지 조회 실패", error);
        setMessage("프로필 이미지를 불러오지 못했습니다.");
      });
  }, []);

  const handleUpload = (e) => {
    uploadProfileImage(userNo, formData, token, apiUrl)
      .then((response) => {
        setMessage("프로필 이미지가 등록되었습니다.");
        // setProfileImage(...); 필요 시 상태 갱신
      })
      .catch((error) => {
        console.error("이미지 등록 실패", error);
        setMessage("이미지 등록에 실패했습니다.");
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage("5MB 이하의 이미지만 업로드할 수 있습니다.");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setMessage("이미지 파일(jpeg, png)만 업로드 가능합니다.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage("");
    }
  };

  /* 변경하기 버튼 */
  const handleUpdate = () => {
    if (!selectedFile) {
      setMessage("변경할 이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    updateProfileImage(userNo, formData, token, apiUrl)
      .then((response) => {
        alert("프로필 이미지가 성공적으로 변경되었습니다.");
        setPreviewUrl(null);
        setSelectedFile(null);
        setProfileImage(response.data.items?.[0]?.profileUrl || "");
      })
      .catch((error) => {
        console.error("이미지 변경 실패", error);
        setMessage("이미지 변경에 실패했습니다.");
      });
  };

  /* 삭제하기 버튼 */
  const handleDelete = () => {
    if (!window.confirm("정말 이미지를 삭제하시겠습니까?")) return;

    deleteProfileImage(userNo, token, apiUrl)
      .then(() => {
        alert("프로필 이미지가 삭제되었습니다.");
        setProfileImage(null);
        setPreviewUrl(null);
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("이미지 삭제 실패", error);
        setMessage("이미지 삭제에 실패했습니다.");
      });
  };

  return (
    <div className="profile-container">
      <div className="wrapper">
        <h2 className="title">프로필 수정</h2>

        {/* 프로필 이미지 */}
        <div className="profile-image-box">
          {previewUrl || profileImage ? (
            <img
              src={previewUrl || profileImage}
              alt="프로필 이미지"
              className="profile-img"
            />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}
        </div>

        {/* 유저 정보 */}
        <div className="info-user">
          <p>
            {userName}({userId})
          </p>
        </div>

        {/* 파일 업로드 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileUpload"
        />
        <div className="button-group">
          <label htmlFor="fileUpload" className="profile-btn with-icon">
            <FaCamera style={{ marginRight: "6px", fontSize: "17px" }} /> 이미지
            선택
          </label>
          <button type="button" className="outline-btn" onClick={handleUpdate}>
            변경하기
          </button>
          <button type="button" className="outline-btn" onClick={handleDelete}>
            제거하기
          </button>
        </div>
        <button className="back-btn" onClick={() => navi("/mypage-main")}>
          뒤로가기
        </button>

        {/* 안내 메시지 */}
        {message && <p className="info-msg">{message}</p>}
      </div>
    </div>
  );
};

export default ProfileImage;
