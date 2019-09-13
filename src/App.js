import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    };
    async componentDidMount() {
        this.setState({
            loading: true
        });

        const res = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({
            users: res.data,
            loading: false
        });
        console.log(res.data);
    }

    // Search github user
    searchUser = async text => {
        this.setState({
            loading: true
        });
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({
            users: res.data.items,
            loading: false
        });
    };

    // Get a single github user
    getUser = async username => {
        this.setState({
            loading: true
        });
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({
            user: res.data,
            loading: false
        });
    };

    // Get user repo
    getUserRepos = async username => {
        this.setState({
            loading: true
        });
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({
            repos: res.data,
            loading: false
        });
    };
    // Clear user from state
    clearUser = () => {
        this.setState({
            users: [],
            loading: false
        });
    };

    // Set alert when username is empty string
    setAlert = (message, type) => {
        this.setState({
            alert: { message, type }
        });
        setTimeout(
            () =>
                this.setState({
                    alert: null
                }),
            2000
        );
    };

    render() {
        const { users, loading, alert, user, repos } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navbar title="Github-finder" icon="fab fa-github" />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUser={this.searchUser}
                                            clearUser={this.clearUser}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />

                            <Route exact path="/about" component={About} />
                            <Route
                                exact
                                path="/user/:login"
                                render={props => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
