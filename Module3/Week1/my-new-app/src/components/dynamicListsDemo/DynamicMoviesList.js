import React, { Component } from 'react';
import ImprovedCard from './ImprovedCard'
import AddMovie from './AddMovie'


class DynamicMoviesList extends Component {
    constructor(){
        //ES6 syntax that wants us to use super() keyword
        super();
        //in order to use this keyword inside the constructor.
        this.state = {
            movies: [
                { title: "The Godfather", director: "Francis Coppola", hasOscars: true, IMDbRating: 9.2 },
                { title: "Star Wars", director: "Rian Johnson" , hasOscars: true, IMDbRating: 8.7 },
                { title: "The Shawshank Redemption", director: "Frank Darabont", hasOscars: false, IMDbRating: 9.3 }
              ],
            showOscarAwarded: false // <== add
        }
    }
    //Create an event that only changes the state of showOscarAwarded
    toggleMovies = () => {
        this.setState({ showOscarAwarded: !this.state.showOscarAwarded });
    }
    deleteMovieHandler = (movieIndex)=>{
        //We can use spread operator to make copy of our state:
        const moviesCopy = [...this.filteredMovies];
        moviesCopy.splice(movieIndex, 1);
        //we are using .setState() to update the state itself.
        this.setState({
            movies: moviesCopy
        })
    }
    //create button that will Add another movie to the list
    addMovieHandler = (theMovie) => {
        // console.log('adding:', newProduct)
        const moviesCopy = [...this.state.movies];
        //you need to mutate the data to render the changes
        moviesCopy.push(theMovie);
        this.setState({//<==== event listener to re render the component
            movies: moviesCopy
        })
    }

    filteredMovies;
    render (){
        
        // leave this console.log() so we can keep track of our state inside our browser's console
        console.log(this.state.movies);
        const {showOscarAwarded} = this.state;
        this.filteredMovies = this.state.movies.filter(theMovie => theMovie.hasOscars == showOscarAwarded);
        return (
            <div>
                <AddMovie addTheMovie={this.addMovieHandler} />
            {
                this.filteredMovies.map((oneMovie, index) => {
                    // Using spread operator ES6 feature, we can pass the whole oneMovie object 
                    // return <ImprovedCard key={index} {...oneMovie}/>}) //====> //as the props down to <ImprovedCard /> component
                    //Let's add a clickToDelete props that's being passed into our Component ImprovedCard
                    //This is actually passing deleteMovieHandler() that receives index as an argument
                    return <ImprovedCard key={index} {...oneMovie} clickToDelete ={() => this.deleteMovieHandler(index)}/>
                })
            }
            <button onClick={() => this.toggleMovies() }>
                    {showOscarAwarded ? 'Hide Oscar Awarded' : 'Show Oscar Awarded'}
            </button>
            </div>
        );
    }

}


export default DynamicMoviesList;


