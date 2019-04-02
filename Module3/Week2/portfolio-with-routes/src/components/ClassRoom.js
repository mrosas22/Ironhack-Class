import React, { Component, Fragment } from 'react';
import IronhackStudents from './IronhackStudents';
import Miller from './Miller';
import { Route, Switch } from 'react-router-dom';
import IronhackFeaturedStudent from './IronhackFeaturedStudent';

export class ClassRoom extends Component {
  state = {
    StudentsToday: [],
    featuredStudent: {},
  };

  addStudent = student => {
    const newStudents = [...this.state.StudentsToday, student];
    this.setState({
      StudentsToday: newStudents,
    });
  };

  setFeaturedStudent = student => {
    this.setState({ featuredStudent: student });
  };

  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/student/:student" component={IronhackFeaturedStudent} />
        </Switch>
        <Miller
          addStudent={this.addStudent}
          setFeaturedStudent={this.setFeaturedStudent}
        />
        <IronhackStudents students={this.state.StudentsToday} />
        <IronhackFeaturedStudent student={this.state.featuredStudent} />
      </Fragment>
    );
  }
}