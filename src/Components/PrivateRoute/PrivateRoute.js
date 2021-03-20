import React, { useContext } from "react"
import { Redirect, Route } from "react-router"
import { UserContext } from "../../App"
// import { UserContext } from "../App"

const PrivateRoute = ({children, ...rest}) => {

    const [user, setLoggedInUser] = useContext(UserContext)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.loggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
// import React, { useContext } from 'react';
// import { Redirect, Route } from 'react-router';
// import { UserContext } from '../../App';

// const PrivateRoute = ({ children, ...rest }) => {
//     const [newUser , setNewUser] = useContext(UserContext)
//     return (
//         <Route
//         {...rest}
//         render={({ location }) =>
//         newUser.email ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     );
// };

// export default PrivateRoute;