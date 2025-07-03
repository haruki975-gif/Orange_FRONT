import axios from "axios";
import { useEffect, useState } from "react";
import { getProfileImage } from "./js/getProfileImage";
import { deleteProfileImage } from "./js/deleteProfileImage";
import { updateProfileImage } from "./js/updateProfileImage";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Member/Form.css";
import "./profileImage.css";

const ProfileImage = () => {
  const token = sessionStorage.getItem("accessToken");
  const userNo = sessionStorage.getItem("userNo");
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
      .then((url) => {
        if (url) {
          setProfileImage(url);
        } else {
          setProfileImage(null);
          setMessage("등록된 프로필 이미지가 없습니다.");
        }
      })
      .catch((error) => {
        console.log("프로필 이미지 조회 실패", error);
        setMessage("프로필 이미지를 불러오지 못했습니다.");
      });
  }, []);

  /* 이미지 선택 */
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

  /* 변경하기 */
  const handleUpdate = () => {
    if (!selectedFile) {
      setMessage("변경할 이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    updateProfileImage(userNo, formData, token, apiUrl)
      .then((response) => {
        alert("프로필 이미지가 성공적으로 변경되었습니다.");
        setPreviewUrl(null);
        setSelectedFile(null);

        // 변경된 이미지 다시 불러오기
        const updateUrl = response.data.items?.[0]; // 백엔드가 url을 줄 경우
        if (updateUrl) {
          setProfileImage(updateUrl);
        } else {
          // 재조회
          setProfileImage(profileImage + "?" + Date.now()); // 캐싱 방지용
        }
      })
      .catch((error) => {
        console.error("이미지 변경 실패", error);
        setMessage("이미지 변경에 실패했습니다.");
      });
  };

  /* 삭제하기 */
  const handleDelete = () => {
    if (!window.confirm("정말 이미지를 삭제하시겠습니까?")) return;

    deleteProfileImage(userNo, token, apiUrl)
      .then(() => {
        alert("프로필 이미지가 삭제되었습니다.");
        setProfileImage(null);
        setPreviewUrl(null);
        setSelectedFile(null);

        // 삭제 후 재조회로 UI 반영 보장
        setTimeout(() => {
          getProfileImage(userNo, token, apiUrl).then((url) => {
            if (url) {
              setProfileImage(`${url}?t=${Date.now()}`);
            } else {
              setProfileImage(null);
            }
          });
        }, 300);
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
