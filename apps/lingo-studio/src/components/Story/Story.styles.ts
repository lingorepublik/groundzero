import styled from "@emotion/styled";
import { NavLink } from "react-router";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
  color: #666;
`;

export const StoryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #666;
  padding: 3px;
`;

export const UtilityButtons = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 15px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
