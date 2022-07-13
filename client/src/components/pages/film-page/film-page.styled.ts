import styled from 'styled-components';

interface Props {
  theme: {
    textColor: string;
  }
}

export const FilmTitle = styled.div<Props>`
  font-size: 24px;
  font-family: sans-serif;
  text-align: center;
  margin: 20px;
  color: ${(props) => props.theme.textColor};
`;

export const FilmPoster = styled.img`
  width: 200px;
  height: 300px;
`;

export const FilmDescription = styled.div<Props>`
    font-size: 18px;
    text-align: left;
    width: 500px;
    color: ${(props) => props.theme.textColor};
`;

export const FilmInfo = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    color: ${(props) => props.theme.textColor};
`;
