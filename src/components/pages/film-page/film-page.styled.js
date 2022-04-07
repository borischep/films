import styled from 'styled-components';

export const FilmTitle = styled.div`
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

export const FilmDescription = styled.div`
    font-size: 18px;
    text-align: left;
    width: 500px;
    color: ${(props) => props.theme.textColor};
`;

export const FilmInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    color: ${(props) => props.theme.textColor};
`;
