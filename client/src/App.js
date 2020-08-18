import React, { useState, useEffect } from 'react';
import {Route, useRouteMatch, useLocation} from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  const {path} = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
      let removeDupes = new Set([...saved]);
      removeDupes.add(id);
      let undupedArray = Array.from(removeDupes);
      
      setSaved([...undupedArray]);
  };

  return (
    <div>
        <SavedList list={saved} />
        <Route exact path="/">
          <MovieList movies={movieList}/>
        </Route>
        <Route path = '/movies/:id'>
          <Movie addToSavedList={addToSavedList}/>
        </Route>
        
      
    </div>
  );
};

export default App;
