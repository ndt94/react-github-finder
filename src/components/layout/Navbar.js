// CLASS COMPONENT
// import React, { Component } from "react";

// export class Navbar extends Component {
//     static defaultProps = {
//         title: "Github - finder",
//         icon: "fab fa-github"
//     };

//     render() {
//         return (
//             <div className="navbar bg-primary">
//                 <h1>
//                     <i className={this.props.icon} /> {this.props.title}
//                 </h1>
//             </div>
//         );
//     }
// }

// export default Navbar;

// FUNCTIONAL COMPONENT
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Navbar(props) {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={props.icon} /> {props.title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </nav>
    );
}

Navbar.defaultProps = {
    title: "Github - finder",
    icon: "fab fa-github"
};
Navbar.propsType = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};
