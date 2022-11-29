import React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
export default function SignUp () {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [role,setRole] = useState('');
    const [number, setNumber] = useState('');
    const [credentialError, setCredentialError] = useState(false);

    const current = new Date().toISOString().split("T")[0]
    const handleNameChange = e => {
      if (e.target.value !==''){
        setCredentialError(false)
         }
      setFullName(e.target.value)
     };
    const handleEmailChange = e => {
     if (e.target.value !==''){
            setCredentialError(false)
          }
     setEmail(e.target.value)
    };
    const handlePasswordChange = e => {
     if (e.target.value !==''){
            setCredentialError(false)
          }
        setPassword(e.target.value)
    };
    const handleConfirmPasswordChange = e => {
        if (e.target.value !==''){
            setCredentialError(false)
          }
        setConfirmPassword(e.target.value)
    };
    const handleDobChange = e => {
        if (e.target.value !==''){
            setCredentialError(false)
          }
        setDob(e.target.value)
    };
    const handleRoleChange = e => {
        console.log(e)
        setRole(e.target.value)
    };
    const handleNumberChange = e => {
        if (e.target.value !==''){
            setCredentialError(false)
          }
        setNumber(e.target.value)
    };
    const handleSignupSubmit = e => {
        console.log("Works")
    };
 return (   
    <section className="h-screen">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="flex text-5xl items-center mb-6">Sign up</h1>
                    <input 
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6"
                        name="fullname"
                        placeholder="Full Name" 
                        onChange = {handleNameChange}/>

                    <input 
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6"
                        name="email"
                        placeholder="Email" 
                        onChange={handleEmailChange}/>

                    <input 
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6"
                        name="password"
                        placeholder="Password" 
                        onChange={handlePasswordChange}/>
                    <input 
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6"
                        name="confirm_password"
                        placeholder="Confirm Password" 
                        onChange={handleConfirmPasswordChange}
                        />
                    {/* <input 
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6"
                        name="user_location"
                        placeholder="City" 
                        onChange={handleCityChange}
                    /> */}
                    <input 
                        type="text"
                         className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6"
                        name="phone_number"
                        placeholder="US Mobile Number" 
                        onChange={handleNumberChange}
                        /> 
                    <label className="text-xl font-normal w-half ">
                        Date of Birth : &nbsp;
                    <input type='date' 
                        className="inline-block form-control block w-half px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-6" 
                        placeholder='Enter BirthDate'
                        onChange={handleDobChange}
                        name='dob'
                        max={current}
                        />
                    </label>             
                    <select name="user_role"  value={role}  onChange={handleRoleChange} className= "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-500 focus:bg-white focus:border-blue-600 focus:outline-none mb-6">
                        <option >Select role</option>
                        <option value="instructor">Instructor</option>
                        <option value="student" >Student</option>
                    </select>
                    
                    <button
                        type="submit"
                        onClick={handleSignupSubmit}
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    >Create Account</button>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? &nbsp; 
                    <a className="no-underline border-b border-blue text-blue">
                    <Link to = "/login">
                        Log in
                        </Link>
                    </a>
                </div>
            </div>
        </div>
    </section>
 );
}