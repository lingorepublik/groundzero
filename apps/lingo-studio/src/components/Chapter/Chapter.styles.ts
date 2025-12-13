import styled from "@emotion/styled";

export const Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.isSelected ? "#ffe4c1" : "#ffe1f1")};
  border: 1px solid ${(props) => (props.isSelected ? "#ebb570" : "#f7b2d7")};
  padding: 5px;
  border-radius: 4px;
  color: #333;
`;

export const Tier = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  color: cadetblue;
`;

export const Title = styled.p`
  font-size: 18px;
`;

export const ChapterContent = styled.div`
  flex: 1;
  display: flex;

  flex-direction: column;
  gap: 10px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const UtilityButtons = styled.div`
  display: flex;
  gap: 15px;
`;

export const IdSeq = styled.div`
  font-size: 14px;
  font-style: italic;
  color: #999;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
