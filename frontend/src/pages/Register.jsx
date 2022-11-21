import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  // Already registered so back to dash
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      registerUser();
    }
  }, [avatar]);

  useEffect(() => {
    setHasErrors(false);
    // Check if passwords match
    if (password !== confirmPassword) {
      setHasErrors(true);
      setErrorMessage("Passwords do not match.");
    }
    // Check if the file is a jpg or png
    if (file) {
      const filetype = file.type;
      if (filetype !== "image/jpeg" && filetype !== "image/png") {
        setHasErrors(true);
        setErrorMessage("Invalid image type");
      }
    }
  }, [name, email, password, confirmPassword, file]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (file) {
      await createAvatar();
    } else {
      registerUser();
    }
  };

  const registerUser = async () => {
    if (name == "" || email == "" || password == "") {
      setHasErrors(true);
      setErrorMessage("Please fill in required fields");
      return;
    }

    const response = await fetch("http://localhost:5050/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar,
      }),
    });

    const data = await response.json();

    if (data.token) {
      data.sessionId = "123456789";
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } else {
      setHasErrors(true);
      setErrorMessage("Your profile could not be created.");
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const createAvatar = async () => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(
      "https://public-api.mirror-ai.net/v2/generate?style=kenga",
      {
        method: "POST",
        headers: {
          "X-Token": "537d94ae98d34bd5b62aac32eac9455e",
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (data.ok) {
      await setAvatar(data.face.url);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div className="form-container">
        {hasErrors && <div className="error-text">{errorMessage}</div>}
        <form onSubmit={submitHandler} className="form">
          <label>Name</label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Upload a profile picture</label>
          <input type="file" onChange={onFileChange} />
          <div className="form__footer">
            <button type="submit" className="btn">
              Register
            </button>
            <span>Already have an account?</span>
            <Link to="/login">Log in here</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
