import styled from "@emotion/styled";

type ContainerProps = {
  isSelected: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
  color: #333;
  background-color: ${(props) => (props.isSelected ? "#ffe1f1" : "#e1fff4")};
  border: 1px solid ${(props) => (props.isSelected ? "#f7b2d7" : "#81c9ae")};
  border-radius: 4px;
`;

export const StoryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NavDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UtilityButtons = styled.div`
  display: flex;
  gap: 15px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 18px;
`;

export const LevelTier = styled.div`
  display: flex;
  gap: 10px;
`;

export const Level = styled.div`
  font-size: 20px;
  color: coral;
  border-right: 2px solid #ccc;
  padding-right: 10px;
`;

export const Tier = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  color: cadetblue;
`;

export const IdSeq = styled.div`
  font-size: 14px;
  font-style: italic;
  color: #999;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
