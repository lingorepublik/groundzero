import styled from "@emotion/styled";
import { Colors } from "../../constants";
export const Container = styled.div`
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
