import firebase from "firebase/app"
import "firebase/auth"
import React, { useContext } from "react"
import { useHistory, useLocation } from "react-router"
import { UserContext } from "../../App"
import firebaseConfig from './firebase.config';
import './Login.css'
// //icons
import facebookIcon from "../Images/fb.png"
import googleIcon from "../Images/google.png"

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
    const handleLoginSubmit = (event) => {
        if (user.name && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
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
    const handleSignUp = (event) => {
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
                    <div className="formBx">
                        <form onSubmit={handleLoginSubmit}>
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
                                    <button onClick={handleGoogleSignIn} type="submit"><img src={googleIcon} alt="google" /></button>
                                    <button onClick={handleFbSignIn}  type="submit" > <img src={facebookIcon} alt="facebook"/></button>
                                    <button type="submit"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">
                    <div className="formBx">
                        <form  onSubmit={handleSignUp}>
                            <h2>Create an account</h2>
                            <input type="text" onBlur={handleBlur} name="name" placeholder="Username" />
                            <input
                                type="email"
                                onBlur={handleBlur}
                                name="email"
                                placeholder="Email Address"
                            />
                            <input
                                type="password"
                                name="password"
                                onBlur={handleBlur}
                                placeholder="Create Password"
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
                </div>
            </div>
        </section>
    )
}

export default Login
