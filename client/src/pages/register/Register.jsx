import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.scss";

const Register = () => {
  const { error } = useContext(AuthContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="Register">
      <div className="rContainer">
        <input
          type="text"
          required
          ref={username}
          placeholder="username"
          className="rInput"
        />
        <input
          type="email"
          required
          ref={email}
          placeholder="email"
          className="rInput"
        />
        <input
          type="password"
          ref={password}
          placeholder="password"
          className="rInput"
          required
        />
        <input
          type="password"
          ref={passwordAgain}
          placeholder="Password Again"
          className="rInput"
          required
        />
        <button onClick={handleClick} className="rButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
