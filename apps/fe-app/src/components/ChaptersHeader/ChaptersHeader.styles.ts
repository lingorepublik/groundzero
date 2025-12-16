import styled from "@emotion/styled";
import { Colors } from "mobile-atoms";

export const Container = styled.header`
  padding: 20px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ArticleNavigatorContainer = styled.div`
  flex: 1;
  width: 130px;
  display: flex;
  align-items: center;
`;

export const ArticalNavigatorEnd = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${Colors.primaryDull};
`;

export const ArticalNavigator = styled.div`
  overflow-y: auto;
  display: flex;
  position: relative;
  /* height: 48px; */
  padding-right: 2px;
`;

export const ArticalNavigatorInner = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 4px 0 6px;
`;

export const TestCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #eaeaea;
  cursor: pointer;
`;

export const Trophies = styled.div`
  /* width: 52px;
  height: 46px; */
  display: flex;
  /* padding-top: 8px; */
  gap: 4px;
`;

export const Trophy = styled.div`
  width: 24px;
  height: 24px;
`;
