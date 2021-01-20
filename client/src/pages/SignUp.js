import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Mailer } from 'nodemailer-react';
import SignUpForm from "../components/SignUpForm";
import API from "../utils/API";
function Signup() {
    const [userState, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileUrl: ""
    });
//put this into it's own file but for now do this
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({
            ...userState,
            [name]: value
        });
    };
//WRITE THIS FUNc
    const handleFormSubmit = event => {
        event.preventDefault();
        console.log("email is " + userState.email);
        console.log("username is " + userState.username);
        console.log("password is " + userState.password);

        if (!userState.email || !userState.username || !userState.password) {
            alert("Fill out your results")
            return;
          }
          API.getRandomUserImage()
          .then(res => {
              console.log(res);
              setUser({
                ...userState,
                profileUrl: res.data.results[0].picture.thumbnail
            });
          })
          .catch(err => console.log(err));
        signUpUser(userState.email, userState.username, userState.password, userState.emailable, userState.profileUrl);
    };
    //picture.thumbnail

    const signUpUser = (email, username, password, profileUrl) => {
        API.signUpUser({
          email: email,
          username: username,
          password: password,
          profileUrl: profileUrl
        })
          .then(function(data) {
            // let history = useHistory();
            // history.push("/home");
          })
          .catch(console.log("ahhhhhh"));
      }
    return (
        <div>
            <SignUpForm
                handleInputChange={handleInputChange}
                handleFormSubmit = {handleFormSubmit}
                username = {userState.username}
                email = {userState.emai}
                password = {userState.password}
            >
            </SignUpForm>
        </div>
    )

}

export default Signup;