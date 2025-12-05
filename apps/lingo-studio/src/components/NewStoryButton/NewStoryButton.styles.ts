import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
`;

export const VerticalSeparator = styled.div`
  margin-left: 7px;
  width: 1px;
  height: 12px;
  background-color: gray;
`;

export const Button = styled.button`
  all: unset;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: cadetblue;
  border: solid 1px cadetblue;
  font-size: 18px;
  cursor: pointer;
`;
