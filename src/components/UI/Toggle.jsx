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
  background-color: ${props => (props.$isOn ? "green" : "red")};
  transition: background-color 0.5s;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 1px;
  left: ${props => (props.$isOn ? "1px" : "27px")};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgb(255,254,255);
  transition: left 0.5s;
`;

const Toggle = ({ checked, onChange }) => {
  return (
    <ToggleContainer onClick={onChange}>
      <ToggleTrack $isOn={checked} />
      <ToggleCircle $isOn={checked} />
    </ToggleContainer>
  );
};

export default Toggle;
