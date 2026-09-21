import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch {
      setError("Incorrect email or password.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Welcome back to DEV@Deakin!</h1>
          <div className="auth-field">
            <label htmlFor="login-email">Your email</label>
            <input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">Your password</label>
            <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
            {error && <p className="auth-error auth-form-error" role="alert">{error}</p>}
          <button className="auth-button" type="submit">Login</button>
          <Link className="auth-switch" to="/signup">Sign up</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;