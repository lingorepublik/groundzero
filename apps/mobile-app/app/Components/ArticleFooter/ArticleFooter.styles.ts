import styled from "@emotion/styled";
import { Colors } from "mobile-atoms";

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
`;

export const MenuBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  gap: 5px;
  position: relative;
  transition: all 0.3s;
  /* background-color: red; */
`;

export const ArticleInfo = styled.div`
  padding: 10px 10px 10px 72px;
  background-color: ${Colors.primary};
  position: relative;
`;

export const LanguageLevel = styled.div`
  position: absolute;
  top: -21px;
  left: 15px;
  width: 42px;
  height: 42px;
  background-color: ${Colors.orange};
  border: solid 2px ${Colors.light};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 24px;
  color: ${Colors.light};
`;

export const ArticleTitle = styled.div`
  font-size: 24px;
  color: ${Colors.deepTeal};
`;

export const ArticleTitleTranslation = styled.div`
  font-size: 20px;
  color: ${Colors.pastelMint};
  font-style: italic;
`;

export const GrammerPoint = styled.div`
  font-size: 22px;
  color: ${Colors.tropicalPine};
`;

export const Sheet = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  transition: all 0.3s;
`;
