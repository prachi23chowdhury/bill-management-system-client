import React, { useRef, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const { signInUser, signInWithGoogle } = useContext(AuthContext); // corrected names
  const location = useLocation();
  const navigate = useNavigate();

  //  Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 6 characters, including uppercase and lowercase letters."
      );
      toast.error("Invalid password format!");
      return;
    }

    try {
      const result = await signInUser(email, password);
      const user = result.user;
      console.log(" Firebase login success:", user);

      // Save user to MongoDB
      const res = await fetch("https://bill-managment-system-api-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "",
          email: user.email,
          photo: user.photoURL || "",
        }),
      });
      const data = await res.json();
      console.log(" User saved to DB:", data);

      toast.success("Login successful!");
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  //  Google Login
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log(" Google login success:", user);

    
      const res = await fetch("https://bill-managment-system-api-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "",
          email: user.email,
          photo: user.photoURL || "",
        }),
      });
      const data = await res.json();
      console.log(" Google user saved to DB:", data);

      toast.success("Google login successful!");
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error(" Google login error:", err);
      toast.error("Google login failed!");
    }
  };

  //  Toggoling
  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">Login Your Account</h2>

        <form onSubmit={handleLogin} className="card-body">
          {/* Email */}
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
            ref={emailRef}
            required
          />

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={handleTogglePasswordShow}
              className="btn btn-xs absolute top-2 right-5"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

          <button
            type="submit"
            className="btn gradient-btn btn-neutral mt-4 w-full"
          >
            Login
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn gradient-btn bg-white text-black border-[#e5e5e5] mt-2 w-full flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-gray-600 text-center pt-5">
            Don't Have An Account?{" "}
            <Link to="/register">
              <span className="text-red-500">Register</span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;