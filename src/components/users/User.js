// CLASS COMPONENT
// import React, { Fragment, Component } from "react";
// import Spinner from "../layout/Spinner";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import Repos from "../repos/Repos";
// export class User extends Component {
//     componentDidMount() {
//         this.props.getUser(this.props.match.params.login);
//         this.props.getUserRepos(this.props.match.params.login);
//     }

//     static propTypes = {
//         loading: PropTypes.bool.isRequired,
//         getUser: PropTypes.func.isRequired,
//         user: PropTypes.object.isRequired,
//         getUserRepos: PropTypes.func.isRequired,
//         repos: PropTypes.array.isRequired
//     };
//     render() {
//         const {
//             name,
//             avatar,
//             url,
//             location,
//             bio,
//             blog,
//             login,
//             html_url,
//             followers,
//             following,
//             public_repos,
//             public_gists,
//             avatar_url,
//             hireable,
//             company
//         } = this.props.user;
//         const { loading, repos } = this.props;
//         if (loading) return <Spinner />;
//         return (
//             <Fragment>
//                 <Link to="/" className="btn btn-light">
//                     Back to search
//                 </Link>
//                 Hireable :{" "}
//                 {hireable ? (
//                     <i className="fas fa-check text-success" />
//                 ) : (
//                     <i className="fas fa-times-circle text-danger" />
//                 )}
//                 <div className="card grid-2">
//                     <div className="all-center">
//                         <img
//                             src={avatar_url}
//                             alt=""
//                             className="round-img"
//                             style={{ width: "150px" }}
//                         />
//                         <h1>Name: {name}</h1>
//                         <p>Location: {location}</p>
//                     </div>

//                     <div>
//                         {bio && (
//                             <Fragment>
//                                 <h3>Bio</h3>
//                                 <p>{bio}</p>
//                             </Fragment>
//                         )}
//                         <a href={html_url} className="btn btn-dark my-1">
//                             Visit Github Profile
//                         </a>
//                         <ul>
//                             <li>
//                                 {login && (
//                                     <Fragment>
//                                         <strong>Username: {login}</strong>
//                                     </Fragment>
//                                 )}
//                             </li>

//                             <li>
//                                 {company && (
//                                     <Fragment>
//                                         <strong>Company: {company}</strong>
//                                     </Fragment>
//                                 )}
//                             </li>

//                             <li>
//                                 {blog && (
//                                     <Fragment>
//                                         <strong>Web: {blog}</strong>
//                                     </Fragment>
//                                 )}
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="card text-center">
//                     <div className="badge badge-primary">
//                         Follower: {followers}
//                     </div>
//                     <div className="badge badge-success">
//                         Following: {following}
//                     </div>
//                     <div className="badge badge-light">
//                         Public repos: {public_repos}
//                     </div>
//                     <div className="badge badge-dark">
//                         Public gists: {public_gists}
//                     </div>
//                 </div>
//                 <Repos repos={repos} />
//             </Fragment>
//         );
//     }
// }

// export default User;

// FUNCTION COMPONENT
import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);

    const { loading, user, getUser, repos, getUserRepos } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        avatar_url,
        hireable,
        company
    } = user;
    if (loading) return <Spinner />;
    return (
        <Fragment>
            <Link to="/" className="btn btn-light">
                Back to search
            </Link>
            Hireable :{" "}
            {hireable ? (
                <i className="fas fa-check text-success" />
            ) : (
                <i className="fas fa-times-circle text-danger" />
            )}
            <div className="card grid-2">
                <div className="all-center">
                    <img
                        src={avatar_url}
                        alt=""
                        className="round-img"
                        style={{ width: "150px" }}
                    />
                    <h1>Name: {name}</h1>
                    <p>Location: {location}</p>
                </div>

                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: {login}</strong>
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: {company}</strong>
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Web: {blog}</strong>
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Follower: {followers}</div>
                <div className="badge badge-success">
                    Following: {following}
                </div>
                <div className="badge badge-light">
                    Public repos: {public_repos}
                </div>
                <div className="badge badge-dark">
                    Public gists: {public_gists}
                </div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    );
};

export default User;
