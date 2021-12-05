import styled from 'styled-components';

export const WrapperColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
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
`;

export const Input = styled.input`
    width: 150px;
    border-radius: 10px;
    border: none;
    margin: 10px;
    padding: 5px;
    font-size: 20px;
    background: #3131310f;
`;

export const ButtonWithBorderRadius = styled.button`
    border-radius: 10px;
    padding: 10px;
    border: none;
    cursor: pointer;
`;
