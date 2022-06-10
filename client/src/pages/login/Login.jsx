import axios from "axios";
import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailLabelCss, setEmailLabelCss] = useState("");
  const [passLabelCss, setPassLabelCss] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const email = useRef();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleBlur = (e) => {
    if (e.target.type === "email") {
      if (e.target.value) setEmailLabelCss("rInputLabelActive");
      else setEmailLabelCss("");
    } else {
      if (e.target.value) setPassLabelCss("rInputLabelActive");
      else setPassLabelCss("");
    }
  };

  const handleVisible = (e) => {
    e.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="Login">
      <div className="lContainer">
        <div className="lLogo">
          <a href="/register">LOGO</a>
        </div>
        <div className="lTitleContainer">
          <h3 className="lTitle">Hi, Welcome Back</h3>
          <span className="lTitleMessage">
            Enter your credentials to continue
          </span>
        </div>
        <div className="lOption">
          <button className="rOptionGoogle">
            <FcGoogle />
            Sign In With Google
          </button>
          <div className="lOptionOr">
            <hr className="lOptionOrHr" />
            <button className="lOptionOrBtn">OR</button>
            <hr className="lOptionOrHr" />
          </div>
          <div className="lOptionEmail">
            <h6 className="lOtionEmailMessage">Sign up with Email address</h6>
          </div>
        </div>
        <div className={`lInputSetContainer`}>
          <div className={`lInputLabelContainer`}>
            <label
              htmlFor="email"
              className={`lInputLabel ${emailLabelCss} ${
                emailErr ? "labelErr" : ""
              }`}
            >
              Email Address
            </label>
            <div className={`lInputContainer`}>
              <input
                type="email"
                id="email"
                ref={email}
                className={`lInput ${emailErr ? "inputErr" : ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          {emailErr && <div className="lInputErr">{emailErr}</div>}
        </div>
        <div className={`lInputSetContainer`}>
          <div className={`lInputLabelContainer`}>
            <label
              htmlFor="password"
              className={`lInputLabel ${passLabelCss} ${
                passErr ? "labelErr" : ""
              }`}
            >
              Password
            </label>
            <div className="lInputContainer">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className={`lInput ${passErr ? "inputErr" : ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          {passErr && <div className="lInputErr">{passErr}</div>}
          <button className="lInputBtn" onClick={handleVisible}>
            {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
        <button className="lButton" disabled={loading} onClick={handleClick}>
          Login
        </button>
        {error && <span>{error.message}</span>}
        {/* <h2 className="lTitle">Hi, Welcome Back</h2>
        <p>Sign in with Email address</p>
        <input
          type="text"
          placeholder="yoshino"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="12345"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <p>Don't have an account?</p>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="register">Register</button>
        </Link>
        {error && <span>{error.message}</span>} */}
      </div>
    </div>
  );
};

export default Login;
