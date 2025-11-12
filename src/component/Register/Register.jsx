import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import useDocumentTitle from '../../useDocomentTitle';


const Register = () => {
useDocumentTitle('Register | MyApp'); 
  const [nameError, setNameError] =useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const {createUser, setUser, updateUser} = use(AuthContext)
     const location = useLocation();
    const navigate = useNavigate();
    // console.log(location)
   const handleRegister=(e)=>{
        e.preventDefault();
        // console.log(e.target);
        const form = e.target;
        const name =form.name.value;
        if(name.length < 5){
          setNameError("Name should be more then 5 character")
          return;
        }
        else{
          setNameError("")
        }
        const photo =form.photo.value;
        const email =form.email.value;
        const password =form.password.value;
        // console.log({name,photo, email, password})

        //  Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must have at least 6 characters, including uppercase & lowercase letters.");
      toast.error("Invalid password format!");
      return;
    } else {
      setPasswordError("");
    }
        createUser(email, password)
        .then((result) =>{
            const user = result.user;
            // console.log(user)
            navigate(`${location.state? location.state : "/"}`)
            updateUser({displayName: name, photoURL: photo}).then(()=>{
              setUser({...user, displayName: name, photoURL: photo})
            })
            .catch((error) =>{
              console.log(error)
              setUser(user)
            })
            

        })
        .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage)
    // ..
  });
    }

  const handleTogglePasswordShow = (event) =>{
    event.preventDefault();
    setShowPassword(!showPassword)
  }

  const {signInWithGoogle} = use(AuthContext);
    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result.user)
            navigate(location ?.state || "/")
            const newUser = {
                name : result.user.displayName,
                email : result.user.email,
                image : result.user.photoURL,
            }


            // create user in the database
            fetch("http://localhost:3000/users",{
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data =>{
                console.log("data after user save", data)
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
  
    return (
        <div>
             <div className='flex justify-center min-h-screen items-center'>
        <form onSubmit={handleRegister} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
            <h2 className='font-semibold text-2xl text-center '>Register your account</h2>
      <div className="card-body">
        <fieldset className="fieldset">
            {/* Name */}
          <label className="label">Your Name </label>
          <input name='name' type="text" className="input" placeholder="Enter your name" required />
          {nameError && <p className='text-xs text-error'>{nameError}</p>}
          {/* Photo */}
          <label className="label">Photo URL </label>
          <input name='photo' type="text" className="input" placeholder="Photo URL" required />
            {/* Email */}
          <label className="label">Email </label>
          <input name='email' type="email" className="input" placeholder="Enter your email address" required />
          {/* Password */}
          <label className="label">Password</label>
                     <div className='relative'>
                       <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input"
                        placeholder="Password"
                        required
                      />
                    <button onClick={handleTogglePasswordShow} className=" btn btn-xs absolute top-2 right-5">
                      {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                    </button>
                    {passwordError && <p className='text-xs text-error'>{passwordError}</p>}
                     </div>
          <button type='submit' className=" button btn btn-neutral mt-4">Register</button>

           {/* Google */}
<button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
          <p className='font-semibold text-center pt-5'>Already Have An Account ?{" "} <Link to="/login" className='text-secondary'>Login</Link></p>
        </fieldset>
      </div>
    </form>
       </div>
       <ToastContainer/>
        </div>
    );
};

export default Register;