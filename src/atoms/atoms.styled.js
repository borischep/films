import styled from 'styled-components';

export const WrapperColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    background: ${(props) => props.theme.mainBg};
`;

export const WrapperRowWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.div`
    font-size: 24px;
    color: ${(props) => props.theme.textColor};
`;

export const Input = styled.input`
    width: 150px;
    border-radius: 10px;
    border: none;
    margin: 10px;
    padding: 5px;
    font-size: 20px;
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.inputText};
`;

export const ButtonWithBorderRadius = styled.button`
    border-radius: 10px;
    padding: 10px;
    border: none;
    cursor: pointer;
    background: ${(props) => props.theme.btnBg};
    color: ${(props) => props.theme.btnText};
    margin: ${(props) => props.withMargin};
`;
