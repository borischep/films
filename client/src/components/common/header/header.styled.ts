import styled from 'styled-components';

interface Props {
  theme: {
    headerBg: string;
    headerText: string;
  }
}

export const HeaderWrapper = styled.div<Props>`
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
  z-index: 1000;
`;

export const SwitchWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

export const HeaderText = styled.div<Props>`
  color: ${(props) => props.theme.headerText};
  font-size: 24px;
  margin-right: 30px;
  margin-left: 10px;
`;
