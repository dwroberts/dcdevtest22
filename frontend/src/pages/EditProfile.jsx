import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function EditProfile() {
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      updateUser();
    }
  }, [avatar]);

  useEffect(() => {
    setHasErrors(false);
    // Check if the file is a jpg or png
    if (file) {
      const filetype = file.type;
      if (filetype !== "image/jpeg" && filetype !== "image/png") {
        setHasErrors(true);
        setErrorMessage("Invalid image type");
      }
    }
  }, [file]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      await createAvatar();
    } else {
      updateUser();
    }
  };

  const updateUser = async (e) => {
    if (name == "" || email == "") {
      setHasErrors(true);
      setErrorMessage("Please fill in required fields");
      return;
    }

    const response = await fetch(
      `https://dcdevtest22.herokuapp.com//api/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          email,
          avatar,
        }),
      }
    );

    const data = await response.json();

    if (data.token) {
      setUser({ ...user, ...data });
      navigate("/");
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
      <h1>Edit Profile</h1>
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
          <label>Upload a profile picture</label>
          <input type="file" onChange={onFileChange} />
          <div className="form__footer">
            <button type="submit" className="btn">
              Update
            </button>
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
