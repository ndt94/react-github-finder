import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
class App extends Component {
    state = {
        users: [],
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
        console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);

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
        console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);

        this.setState({
            users: res.data.items,
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
        const { users, loading, alert } = this.state;
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
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
