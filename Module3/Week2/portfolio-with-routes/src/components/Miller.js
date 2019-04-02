import React, { Component } from 'react';

class Miller extends Component {
    state = {
      name: 'Miller',
      lastName: 'Rosas',
      Class: 'WebDev',
      hobby: 'Soccer',
      favoriteLanguage: 'JS',

    };
    render() {
        const {addStudent, setFeaturedStudent} = this.props
        return (

            <div>
                <h1>Miller</h1>
                <button onClick={() => addStudent('Miller')}>Add</button>
                <button onClick={() => setFeaturedStudent(this.state)}>Add</button>
                <Link to={`${this.state.name}`}>{this.state.name}</Link>
            </div>
    );
 }
};

export default Miller;

// const {feature} = this.state;