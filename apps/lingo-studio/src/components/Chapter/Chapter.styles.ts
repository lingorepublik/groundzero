import styled from "@emotion/styled";
import { NavLink } from "react-router";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChapterContent = styled.div`
  flex: 1;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const UtilityButtons = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 15px;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #666;
  padding: 3px;
`;
