import React, { Component } from 'react';
import ImprovedCard from './ImprovedCard'


class DynamicMoviesList extends Component {
    constructor(){
        //ES6 syntax that wants us to use super() keyword
        super();
        //in order to use this keyword inside the constructor.
        this.state = {
            movies: [
                { title: "The Godfather", director: "Francis Coppola" },
                { title: "Star Wars", director: "Rian Johnson" },
                { title: "The Shawshank Redemption", director: "Frank Darabont" }
              ]
        }
    }
    deleteMovieHandler = (movieIndex)=>{
        //We can use spread operator to make copy of our state:
        const moviesCopy = [...this.state.movies];
        moviesCopy.splice(movieIndex, 1);
        //we are using .setState() to update the state itself.
        this.setState({
            movies: moviesCopy
        })
    }
    render (){
        // leave this console.log() so we can keep track of our state inside our browser's console
        console.log(this.state.movies);
        return (
            <div>
            {
                this.state.movies.map((oneMovie, index) => {
                    // Using spread operator ES6 feature, we can pass the whole oneMovie object 
                    // return <ImprovedCard key={index} {...oneMovie}/>}) //====> //as the props down to <ImprovedCard /> component
                    //Let's add a clickToDelete props that's being passed into our Component ImprovedCard
                    //This is actually passing deleteMovieHandler() that receives index as an argument
                    return <ImprovedCard key={index} {...oneMovie} clickToDelete ={() => this.deleteMovieHandler(index)}/>})
            }
            </div>
        );
    }

}


export default DynamicMoviesList;

