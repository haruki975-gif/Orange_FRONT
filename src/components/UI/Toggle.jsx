import { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
    display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
`;

const ToggleTrack = styled.div`
  width: 50px;
  height: 24px;
  border-radius: 30px;
  background-color: ${props => (props.isOn ? "red" : "green")};
  transition: background-color 0.5s;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 1px;
  left: ${props => (props.isOn ? "27px" : "1px")};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgb(255,254,255);
  transition: left 0.5s;
`;

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
      
    if(isOn){
        alert("활동중으로 변경되었습니다");
    }else{
        alert("정지로 변경되었습니다");
    }
    setIsOn(!isOn);
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <ToggleTrack isOn={isOn} />
        <ToggleCircle isOn={isOn} />
      </ToggleContainer>
    </>
  );
};

export default Toggle;