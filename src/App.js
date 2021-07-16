import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import AddFavourites from './components/AddToFavourites';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
function App() {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);
	const getMovieRequest = async () => {
		const url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`;
		
		const response = await fetch(url);
		const responseJson = await response.json();
		console.log("Reasponse", response);
		console.log("ReasponseJSON", responseJson);
		if (responseJson.results) {
			setMovies(responseJson.results);
		}
	};
	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};


	useEffect(() => {
		getMovieRequest();
	}, [searchValue]);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
			<div className='row'>
				<MovieList movies={movies}
				favouriteComponent={AddFavourites}
				handleFavouritesClick={addFavouriteMovie}
				 />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList movies={favourites} favouriteComponent={AddFavourites} />
			</div>
		</div>
	);
};

export default App;