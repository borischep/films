import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    background: ${(props) => props.theme.headerBg};
    color: ${(props) => props.theme.headerText};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 30px;
    font-size: 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

export const SwitchWrapper = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
`;

export const HeaderText = styled.div`
    color: ${(props) => props.theme.headerText};
    font-size: 24px;
    margin-right: 30px;
    margin-left: 10px;
`;
