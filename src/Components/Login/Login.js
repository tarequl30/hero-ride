import firebase from "firebase/app"
import "firebase/auth"
import React, { useContext } from "react"
import { useHistory, useLocation } from "react-router"
import { UserContext } from "../../App"
import firebaseConfig from './firebase.config';
// import { UserContext } from "../App"
// import { firebaseConfig } from "../firebase.config"
// import {firebaseConfig} from '../Login/firebase.config'

// //icons
import facebookIcon from "../Images/fb.png"
import googleIcon from "../Images/google.png"
// import googleIcon from "../Images/google.png"
import './Login.css'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else {
    firebase.app()
}
const Login = () => {
    const [user, setUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } }

    const toggleForm = () => {
        const container = document.querySelector(".container")
        container.classList.toggle("active")
    }

    const handleGoogleSignIn = (event) => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const user = {
                    name: result?.user?.displayName,
                    error: null,
                    loggedIn: true,
                }
                setUser(user)
                history.replace(from)
            })
            .catch((error) => {
                const user = {
                    name: null,
                    email: null,
                    error: error.message,
                    loggedIn: false,
                }
                setUser(user)
            })
        event.preventDefault()
    }

    const handleFbSignIn = (event) => {
        const fbProvider = new firebase.auth.FacebookAuthProvider()
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const user = {
                    name: result?.user?.displayName,
                    error: null,
                    loggedIn: true,
                }
                setUser(user)
                history.replace(from)
            })
            .catch((error) => {
                const user = {
                    name: null,
                    error: error.message,
                    loggedIn: false,
                }
                setUser(user)
            })
        event.preventDefault()
    }

    const handleBlur = (event) => {
        let isFieldValid
        if (event.target.name === "name") {
            isFieldValid = event.target.value.length > 2
        }
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const fieldUser = { ...user }
            fieldUser[event.target.name] = event.target.value
            setUser(fieldUser)
        }
    }
    const handleSubmit = (event) => {
        if (user.name && user.email && user.password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const fieldUser = {...user}
                    fieldUser.error = null
                    fieldUser.name = user.name
                    fieldUser.loggedIn = true
                    fieldUser.email = user.email
                    fieldUser.password = user.password
                    setUser(fieldUser)
                    history.replace(from)
                })
                .catch((error) => {
                    const fieldUser = {...user}
                    fieldUser.error = error.message
                    fieldUser.name = null
                    fieldUser.loggedIn = false
                    fieldUser.email = null
                    fieldUser.password = null
                    setUser(fieldUser)
                })
        }
        event.preventDefault()
    }
    
    return (
        <section className="login-section">
            <div className="container">
                <div className="user signinBx">
                    <div className="imgBx">
                        <img
                            src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                            alt=""
                        />
                    </div>
                    <div className="formBx">
                        <form onSubmit={handleSubmit}>
                            <h2>Sign In</h2>
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                onBlur={handleBlur}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onBlur={handleBlur}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onBlur={handleBlur}
                                required
                            />
                            {user.error && <p className="error-message">{user.error}</p>}
                            <input type="submit" name="" value="Login" />
                            <p className="signup">
                                Don't have an account ?
                                <button type="button" onClick={toggleForm}>
                                    Sign Up.
                                </button>
                            </p>
                            <div className="brand-sign-in">
                                <p>OR SIGN IN WITH </p>
                                <div className="button-container">
                                    <button
                                        onClick={handleGoogleSignIn}
                                        type="submit"
                                    >
                                        <img src={googleIcon} alt="google" />
                                    </button>
                                    <button
                                        onClick={handleFbSignIn}
                                        type="submit"
                                    >
                                        <img
                                            src={facebookIcon}
                                            alt="facebook" 
                                        />
                                    </button>

                                    <button type="submit">
                                        {/* <img src={githubIcon} alt="github" /> */}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">
                    <div className="formBx">
                        <form>
                            <h2>Create an account</h2>
                            <input type="text" name="" placeholder="Username" />
                            <input
                                type="email"
                                name=""
                                placeholder="Email Address"
                            />
                            <input
                                type="password"
                                name=""
                                placeholder="Create Password"
                            />
                            <input
                                type="password"
                                name=""
                                placeholder="Confirm Password"
                            />
                            <input type="submit" name="" value="Sign Up" />
                            <p className="signup">
                                Already have an account ?
                                <button type="button" onClick={toggleForm}>
                                    Sign in.
                                </button>
                            </p>
                        </form>
                    </div>
                    <div className="imgBx">
                        <img
                            src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
// import React, { useContext, useState} from 'react';
// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';
// import {UserContext} from '../../App'
// import './Login.css'
// import fb from '../Images/fb.png'
// import google from '../Images/google.png'
// import { useHistory, useLocation } from 'react-router';

// if(firebase.apps.length === 0){
//     firebase.initializeApp(firebaseConfig)
//   }
// const Login = () => {
//     const [newUser , setNewUser] = useContext(UserContext)
//     let history = useHistory();
//     let location = useLocation();
//     let { from } = location.state || { from: { pathname: "/" } };
// const [user , setUser] = useState({
//       signedIn: false,
//       name:'',
//       email:'',
//       password :'',
//       photo:'',
// })
//     var provider = new firebase.auth.GoogleAuthProvider();
//     const fbProvider = new firebase.auth.FacebookAuthProvider();
//     const handleClick = () => {
//       firebase.auth()
//       .signInWithPopup(provider)
//       .then((result) => {
//         const {displayName, photoURL, email} = result.user;
//         const signedInUser = {
//               signedIn: true,
//               name: displayName,
//               email: email,
//               photo: photoURL
//         }
//         setUser(signedInUser);
//         history.replace(from)
//          console.log(displayName, photoURL, email)
//         var credential = result.credential;
//         var token = credential.accessToken;
//         var user = result.user;
//       }).catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         var email = error.email;
//         var credential = error.credential;
//       });
//   }
//   const handleFbSignIn = () => {
//     firebase
//     .auth()
//     .signInWithPopup(fbProvider)
//     .then((result) => {
//       var credential = result.credential;
//       var user = result.user;
//       console.log('sign in' ,user) 
//       var accessToken = credential.accessToken;
//       const {displayName, photoURL, email} = result.user;
//       const signedInUser = {
//         signedIn: true,
//         name: displayName,
//         email: email,
//         photo: photoURL
//   }
//       setUser(signedInUser);
//       history.replace(from)
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       var email = error.email;
//       var credential = error.credential;
//     });
//   }
//   const handleSignOut = () => {
//     firebase.auth().signOut().then( res => {
//       const signOutUser = {
//         signedIn: false,
//         name:'',
//         email:'',
//         photo:'',
//         error: '',
//         success : false
//       };
//       setUser(signOutUser)
//       });
//     }
//     const handleChange = (event) => {
//        let isFormValid = true;
//         if(event.target.name === 'email') {
//         isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
//         }
//         if(event.target.name === 'password') {
//           const checkLength = event.target.value.length > 6;
//           const validPass = /\d{1}/.test(event.target.value)
//           isFormValid = checkLength && validPass;
//         }
//         if(isFormValid){
//              const newUserInfo = {...user}
//              newUserInfo[event.target.name] = event.target.value;
//              setUser(newUserInfo);
//         }
//       }
//     const handleSubmit = (event) => {
//       if(newUser && user.email && user.password){
//         firebase.auth()
//         .createUserWithEmailAndPassword(user.email, user.password)
//        .then((res) => {
//          const newUserInfo = {...user}
//          newUserInfo.error = '';
//          newUserInfo.success = true;
//          setUser(newUserInfo)
//          updateUserInfo(user.name)
//          history.replace(from)
//     })
//     .catch((error) => {
//       const newUserInfo = {...user}
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo)
//     });
//       }
//       if(!newUser && user.email && user.password){
//         firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           const newUserInfo = {...user}
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           setUser(newUserInfo)
//           console.log("sign in user ", res.user)
//         })
//         .catch((error) => {
//           const newUserInfo = {...user}
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo)
//         });
//       }
//       event.preventDefault();
//     }
//   const updateUserInfo = name => {
//     var user = firebase.auth().currentUser;
  
//         user.updateProfile({
//           displayName: name
//         }).then(function() {
//           console.log("updated")
//         }).catch(function(error) {
//           console.log(error)
//         });
//         }
//   return (
//   <>
//     <div class="container">
//       <div class="form-container sign-in-container">
//           <form >
//           <h2>{newUser ? 'Sign Up' : 'Log In'}</h2>
//               <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id=""/> <label htmlFor="newUser">Click checkbox for Sign Up</label>
//              {newUser && <input type="text" name='name' onBlur={handleChange} placeholder="name"/>}
//               <br/>
//               <input type="text" placeholder="Email" name='email' onBlur={handleChange} required/>
//               <br/>
//               <input type="password" placeholder="Password" name="password" onBlur={handleChange} required />
//               <br/>
//               <input onClick={handleSubmit} className="signInBtn" type="Submit" value={newUser ? "Sign Up" : "Log In"} />
//               <p>{user.error}</p>
//               {
//                 user.success && <p style={{color:"green"}}>user {newUser ? 'Created' : "logged In"} Successfuly</p> 
//               }
//           </form>
//       </div>
//   <div class="overlay-container">
//       <div class="overlay">
//           <div class="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p> simply Sign In with</p>
//         {
//            user.signedIn ? <button onClick={handleSignOut}> sign out</button> :
//            <button onClick={handleClick}> <img src={google} alt="" width="20px"></img> sign in with Google</button>
       
//         }
//            <br/>
//            <button onClick={handleFbSignIn}><img src={fb} alt="" width="20px"></img>Sign In with facebook</button>
//         {
//           user.signedIn && <div><p>welcome {user.name}</p>
//           <p>Your Email: {user.email}</p> 
//           <img src={user.photo} alt="" width="50%"/>
//           </div> 
//         }
//           </div>
//       </div>
//   </div>
//   </div>
//   </>
//     );
//   }

// export default Login;