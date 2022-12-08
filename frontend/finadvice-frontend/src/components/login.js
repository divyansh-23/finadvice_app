import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { LOGIN_API_URL } from "../api_config";
import { useAuth } from "./auth";
import axios from 'axios';

export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentialError, setCredentialError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const redirectPath = '/dashboard'

    const handleEmailChange = event => {
        if (event.target.value !== '') {
            setCredentialError(false)
        }
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        if (event.target.value !== '') {
            setCredentialError(false)
        }
        setPassword(event.target.value);
    }

    const validate = () => {
        if (email === '' || password === '') {
            setCredentialError(!credentialError)
        }
    }
    const handleSubmit = event => {
        event.preventDefault();
        validate();
        var data = JSON.stringify({
            "user": {
              "email": email,
              "password": password
            }
          });
        var config = {
            method: 'post',
            url: LOGIN_API_URL,
            headers: { 
              'Content-Type': 'application/json', 
            },
            data : data
        };
        axios(config)
        .then(
            res => {
                const data = res.data;
                if (data["logged_in"] !== undefined && data["logged_in"] === true) {
                    auth.login(data);
                    navigate(redirectPath,{replace: true})
                }
                else {
                    setCredentialError(true)
                }
                
            }
        )
        .catch( err => console.log(err))

    }
    return(
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="/static/images/finance.png"
                            className="w-full"
                            alt="FinAdvice"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <h1 className="flex text-5xl items-center mb-6"> Welcome to FinAdvice!</h1>
                            <form>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        onChange={handleEmailChange}
                                        value={email}
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        onChange={handlePasswordChange}
                                        value={password}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    onClick={handleSubmit}
                                >
                                Sign in
                                </button>
                                <div className="text-grey-dark mt-6">
                                    New to FinAdvice? &nbsp;  
                                  <a className="no-underline border-b border-blue text-blue">
                                    <Link to = "/signup">
                                    Sign Up
                                    </Link>
                                  </a>
                                 </div>
                                { credentialError && <h1 className="text-rose-700"> Invalid Credentials</h1>}
                            </form>
                    </div>
                </div>
            </div>
        </section>
    );



}