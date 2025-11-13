// src/components/auth/Register.jsx
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import useDocumentTitle from '../../useDocomentTitle';


const Register = () => {
  useDocumentTitle('Register | MyApp');

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { createUser, setUser, updateUser, signInWithGoogle } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location?.state?.from?.pathname || '/';

  const handleRegister = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const form = e.target;
      const name = form.name.value.trim();
      const photo = form.photo.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;

      if (name.length < 5) {
        setNameError('Name should be more than 5 characters');
        setSubmitting(false);
        return;
      } else {
        setNameError('');
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError('Password must have at least 6 characters, including uppercase & lowercase letters.');
        toast.error('Invalid password format!');
        setSubmitting(false);
        return;
      } else {
        setPasswordError('');
      }

      
      const result = await createUser(email, password);
      const user = result?.user;
      if (!user) throw new Error('User creation returned no user');


      try {
        await updateUser({ displayName: name, photoURL: photo || null });
       
        setUser && setUser({ ...user, displayName: name, photoURL: photo || null });
      } catch (updateErr) {
        console.error('updateUser error:', updateErr);
      
        setUser && setUser(user);
      }

      
      const newUser = {
        name,
        email,
        image: photo || null,
        provider: 'email'
      };

      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

   
      if (!res.ok) {
        const text = await res.text().catch(() => null);
        console.error('Server returned non-OK for /users:', res.status, text);
        toast.warn('Registered but failed to save user in DB.');
      
        navigate(redirectTo);
        return;
      }

      const data = await res.json();
      // console.log('user saved to DB:', data);
      toast.success('Registration successful!');
      navigate(redirectTo);
    } catch (error) {
      console.error('createUser/register error:', error);
      toast.error(error?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword((s) => !s);
  };

  const handleGoogleSignIn = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await signInWithGoogle();
      const u = result?.user;
      if (!u) throw new Error('Google sign-in returned no user');

      // save social user to DB (do not wait navigation until save completes)
      const newUser = {
        name: u.displayName || 'No Name',
        email: u.email,
        image: u.photoURL || null,
        provider: 'google'
      };

      try {
        const res = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });
        if (!res.ok) {
          console.error('Failed to save google user:', res.status, await res.text().catch(()=>null));
        } else {
          console.log('google user saved', await res.json());
        }
      } catch (saveErr) {
        console.error('Failed to save google user (network):', saveErr);
      }

      // set auth user in context then navigate
      setUser && setUser(u);
      toast.success('Signed in with Google');
      navigate(redirectTo);
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center min-h-screen items-center">
        <form onSubmit={handleRegister} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-2xl text-center">Register your account</h2>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Your Name </label>
              <input name="name" type="text" className="input" placeholder="Enter your name" required />
              {nameError && <p className="text-xs text-error">{nameError}</p>}

              <label className="label">Photo URL </label>
              <input name="photo" type="text" className="input" placeholder="Photo URL" />

              <label className="label">Email </label>
              <input name="email" type="email" className="input" placeholder="Enter your email address" required />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  placeholder="Password"
                  required
                />
                {/* important: type="button" so it doesn't submit the form */}
                <button type="button" onClick={handleTogglePasswordShow} className="btn btn-xs absolute top-2 right-5">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                {passwordError && <p className="text-xs text-error">{passwordError}</p>}
              </div>

              <button type="submit" className="button btn btn-neutral mt-4" disabled={submitting}>
                {submitting ? 'Please wait...' : 'Register'}
              </button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] mt-3"
                disabled={submitting}
              >
                {/* you can add an svg icon here */}
                Login with Google
              </button>

              <p className="font-semibold text-center pt-5">
                Already Have An Account ?{' '}
                <Link to="/login" className="text-secondary">Login</Link>
              </p>
            </fieldset>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
