import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Navbar from "./components/navbar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from "./components/registerForm";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <main role="main" className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
