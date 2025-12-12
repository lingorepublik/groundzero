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
`;

export const BlockContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
