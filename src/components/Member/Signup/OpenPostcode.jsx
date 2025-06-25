// kakao 주소 api

import DaumPostcode from "react-daum-postcode";

function OpenPostcode({ onClose, onComplete }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      if (extraAddress !== "") {
        fullAddress += ` (${extraAddress})`;
      }
    }

    onComplete(fullAddress); // 부모로 전달
    onClose(); // 창 닫기
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 100,
        border: "1px solid #000",
        background: "#fff",
        width: "450px",
        overflow: "auto",
      }}
    >
      <DaumPostcode onComplete={handleComplete} />
      <div
        style={{
          padding: "5px",
          marginRight: "20px",
          backgroundColor: "#ddd",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default OpenPostcode;
