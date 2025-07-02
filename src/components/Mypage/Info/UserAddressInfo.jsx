import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import OpenPostcode from "../../Member/Signup/OpenPostcode";
import axios from "axios";

const UserAddressInfo = ({ formData, setFormData, setValidationErrors }) => {
  const [showPostcode, setShowPostcode] = useState(false);
  const [localAddress1, setLocalAddress1] = useState("");
  const [localAddress2, setLocalAddress2] = useState("");
  const userNo = sessionStorage.getItem("userNo");
  const token = sessionStorage.getItem("accessToken");
  const apiUrl = URL_CONFIG.API_URL;

  // 주소 조회
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/info/address/${userNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        const item = response.data.items[0];
        const addr1 = item?.userAddress1 || "";
        const addr2 = item?.userAddress2 || "";
        setLocalAddress1(addr1);
        setLocalAddress2(addr2);
        setFormData((prev) => ({
          ...prev,
          userAddress1: addr1,
          userAddress2: addr2,
        }));
      })
      .catch(() => {
        setValidationErrors((prev) => ({
          ...prev,
          userAddress1: "주소 조회에 실패했습니다.",
        }));
      });
  }, [userNo]);

  const handleAddressComplete = (address) => {
    setLocalAddress1(address);
    setFormData((prev) => ({ ...prev, userAddress1: address }));
    setShowPostcode(false);

    if (!address) {
      setValidationErrors((prev) => ({
        ...prev,
        userAddress1: "주소를 선택해주세요.",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, userAddress1: "" }));
    }
  };

  const handleDetailChange = (e) => {
    const value = e.target.value;
    setLocalAddress2(value);
    setFormData((prev) => ({ ...prev, userAddress2: value }));
  };

  return (
    <>
      <div className="address-field">
        <input
          type="text"
          name="userAddress1"
          placeholder="주소"
          value={localAddress1}
          disabled
          style={{ backgroundColor: "#ddd" }}
        />
        <button
          type="button"
          className="search-btn"
          onClick={() => setShowPostcode(true)}
        >
          <FiSearch size="20" color="#FF8C00" />
          <span>검색</span>
        </button>
      </div>
      <input
        type="text"
        name="userAddress2"
        placeholder="상세주소"
        value={localAddress2}
        onChange={handleDetailChange}
        required
      />
      {showPostcode && (
        <OpenPostcode
          onClose={() => setShowPostcode(false)}
          onComplete={handleAddressComplete}
        />
      )}
    </>
  );
};

export default UserAddressInfo;
