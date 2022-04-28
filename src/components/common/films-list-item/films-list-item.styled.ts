import styled from 'styled-components';

interface Props {
  theme: {
    textColor: string;
  }
}

export const FilmListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 200px;
  height: 350px;
`;

export const FilmTitle = styled.div<Props>`
  margin-top: 10px;
  font-family: sans-serif;
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;
