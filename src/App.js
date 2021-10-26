import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";


const WrapperColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`

const Text = styled.div`
    font-size: 24px;
    margin-bottom: 10px;
`

const Input = styled.input`
    width: 100px;
    height: 20px;
    border-radius: 10px;
`

const Button = styled.button`
    border-radius: 10px;
    margin-top: 20px;
`

const FilmListItem = styled.li`
  margin-top: 10px;
`

const Login = () => {
    const [username, setUsername] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem(`username`)) history.push("/films");
    }, []);

    return (
        <WrapperColumn>
            <Text>Username</Text>
            <Input name="user" value={username} onChange={(i) => setUsername(i.target.value)}></Input>
            <Link to="/films">
                <Button onClick={() =>localStorage.setItem(`username`, username)}>Confirm</Button>
            </Link>
        </WrapperColumn>
    )
}

const Films = () => {
    const [films, setFilms] = useState([]);
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular/?api_key=9ecc13a99e487f98d6e3a8d253d778b7')
            .then(res => res.json())
            .then(res => setFilms(res.results))
    }, []);
    
    const filmsList = films.map((film) => <FilmListItem>{film.title}</FilmListItem>)

    return (
        <WrapperColumn>
            <Text>Films</Text>
            <ul>
                {filmsList}
            </ul>
        </WrapperColumn>
    )
}

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/films">
                    <Films />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;