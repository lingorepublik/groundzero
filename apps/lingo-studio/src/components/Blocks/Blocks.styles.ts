import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 15px;
  width: 400px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

export const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background-color: white;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ebb570;
  color: #333;
`;

export const BlockContent = styled.div`
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
  gap: 10px;
`;

export const IdSeq = styled.div`
  font-size: 14px;
  font-style: italic;
  color: #999;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
