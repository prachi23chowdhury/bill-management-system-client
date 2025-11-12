import React, {  use, useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import useDocumentTitle from '../../useDocomentTitle';





const Login = () => {
  useDocumentTitle('Login | MyApp'); 
  const [error, setError] = useState("");
  const emailRef = useRef();
   const [showPassword, setShowPassword] = useState(false);
  const { signIn, SignInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
// validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 6 characters, including uppercase and lowercase letters."
      );
      toast.error("Invalid password format!");
      return;
    }

    
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        toast.success("Login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.code);
        setError(error.code);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  

     const handleTogglePasswordShow = (event) =>{
    event.preventDefault();
    setShowPassword(!showPassword)
  }
  const {signInWithGoogle} = use(AuthContext)
     const handleGoogleSignIn = () =>{
          signInWithGoogle()
          .then(result =>{
              console.log(result.user)
              navigate(location ?.state || "/")
          })
          .catch(error => {
            console.log(error)
          })
     }

  const handleForgetPassword = () =>{
    // console.log("forget",emailRef.current)
    const email = emailRef.current.value;
    // console.log(email)
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      alert("check your email")
    })
    .catch()
  }
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">Login Your Account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
          
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              ref={emailRef}
              placeholder="Email"
              required
            />
          
            <label className="label">Password</label>
           <div className='relative'>
             <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input"
              placeholder="Password"
              required
            />
          <button onClick={handleTogglePasswordShow} className="btn btn-xs absolute top-2 right-5">
            {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
          </button>
           </div>
            <div onClick={handleForgetPassword}>
              <a  className="link link-hover">Forgot password?</a>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit" className="button btn btn-neutral mt-4">
              Login
            </button>
            {/* Google */}
<button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
            <p className="text-gray-600 text-center pt-5">
              Don't Have An Account?{" "}
              <Link to="/register">
                <span className="text-red-500">Register</span>
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;