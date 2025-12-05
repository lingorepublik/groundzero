import styled from "@emotion/styled";

export const Container = styled.div`
  /* background-color: blue; */
  width: 400px;
  max-width: 400px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
`;

export const StoriesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Story = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
  color: #666;
`;

export const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
