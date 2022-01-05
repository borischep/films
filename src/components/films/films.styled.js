import styled from 'styled-components';

export const FilmListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 200px;
  height: 350px;
`;

export const FilmTitle = styled.div`
  margin-top: 10px;
  font-family: sans-serif;
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;

export const FilmPoster = styled.img`
  width: 200px;
  height: 300px;
`;
