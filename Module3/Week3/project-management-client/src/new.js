render() {
    {this.fetchUser()}
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} />
            </Switch>
        </div>
      );
    }
  }