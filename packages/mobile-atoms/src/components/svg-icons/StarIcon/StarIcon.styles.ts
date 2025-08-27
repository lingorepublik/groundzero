import styled from "@emotion/styled";

type ContainerProps = {
    rotation: number;
}

export const Container = styled.svg<ContainerProps>`
    position: absolute;
    top: -7px;
    left: -20%;
    transform: rotate(${props => props.rotation}deg);
    z-index: 2;
`;