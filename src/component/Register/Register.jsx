import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const { createUser, updateUser, setUser, signInWithGoogle } = useContext(AuthContext);

  //  Google Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log(" Google Sign-in user:", user);

      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      const res = await fetch("https://bill-managment-system-api-server.vercel.app/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log(" Google user saved to DB:", data);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error(" Google Sign-in error:", error);
      toast.error("Google Sign-in failed!");
    }
  };

  //  clicking button Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    console.log(" Submitting Register form:", { name, email });

    // Validation
    if (name.length < 5) {
      setNameError("Name must be at least 5 characters");
      return;
    } else setNameError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      setPasswordError("Password must have uppercase & lowercase letters.");
      return;
    } else setPasswordError("");

    try {
      console.log(" Creating Firebase user...");
      const result = await createUser(email, password);
      console.log(" Firebase user created:", result.user);

      await updateUser({ displayName: name, photoURL: photo });
      console.log("Profile updated");

      const newUser = { name, email, image: photo };
      console.log(" Sending to MongoDB:", newUser);

      const res = await fetch("https://bill-managment-system-api-server.vercel.app/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log(" MongoDB response:", data);

      setUser({ ...result.user, displayName: name, photoURL: photo });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(" Error during register:", err);
      toast.error(err.code || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">Register your account</h2>

        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Your Name</label>
            <input name="name" type="text" className="input" placeholder="Enter your name" required />
            {nameError && <p className="text-xs text-error">{nameError}</p>}

            <label className="label">Photo URL</label>
            <input name="photo" type="text" className="input" placeholder="Photo URL" />

            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Enter your email" required />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute top-2 right-5"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <label className="label">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Confirm Password"
                required
              />
            </div>

            {passwordError && <p className="text-xs text-error">{passwordError}</p>}

            <button type="submit" className="btn gradient-btn btn-neutral mt-4">
              Register
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn gradient-btn bg-white text-black border-[#e5e5e5]"
            >
              Continue with Google
            </button>

            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;