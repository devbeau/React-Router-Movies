import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useRouteMatch} from 'react-router-dom'
import MovieCard from './MovieCard'

const Movie = ({addToSavedList}) => {
  const [movie, setMovie] = useState();
  const routeMatch = useRouteMatch('/movies/:id')
  console.log(addToSavedList);
  useEffect(() => {
    const id = routeMatch.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[routeMatch.params.id]);
  
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = movie => {

    const id = routeMatch.params.id;
      addToSavedList(movie);

  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <MovieCard  movie = {movie}/>
      <div className="save-button"
           onClick={() => saveMovie(movie)}>
        Save
      </div>
    </div>
  );
}

export default Movie;
