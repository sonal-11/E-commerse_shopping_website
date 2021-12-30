import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart,googleSignInStart} from './../../redux/User/user.actions';
import { Link, useHistory } from "react-router-dom";
import "./style.scss";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../form/FormInput";
import Button from "../form/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
      if(currentUser){
          resetForm();
          history.push("/");
      }
  }, [history, currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(emailSignInStart({email, password}));
  }

  const handleGoogleSignin = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formwrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="EMAIL"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="PASSWORD"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>

          <div className="SocialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignin}>Sign in With Google</Button>
            </div>
          </div>

          <div className="Links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
