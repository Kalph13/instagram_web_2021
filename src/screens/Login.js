import { gql, useMutation } from "@apollo/client";
import { setLoginToken } from "../apollo";
import { useLocation } from "react-router-dom";

/* import { useState } from "react"; */
import styled from "styled-components";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
/* import { isLoggedInVar, darkModeVar } from "../apollo"; */

/* React Hook Form: https://react-hook-form.com */
/* Less Code and More Performance + Isolate Re-renders + Subscriptions + Faster Mount */
import { useForm } from "react-hook-form";

import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Notification = styled.div`
    color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            loginSucceed
            loginError
            loginToken
        }
    }
`;

const Login = () => {
    const location = useLocation();

    /* useForm: https://react-hook-form.com/api/useform */
    const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || ""
        }
    });

    const onCompleted = data => {
        const {
            login: {
                loginSucceed,
                loginError,
                loginToken
            }
        } = data;

        /* setError: https://react-hook-form.com/api/useform/seterror */
        /* Doesn't Work Well Alone (Kills the Form and Returns Nothing): Add clearErrors */
        if (!loginSucceed) {
            return setError("LoginResult", {
                message: loginError
            });
        }

        if (loginToken) {
            setLoginToken(loginToken);
        }
    }

    /* useMutation: https://www.apollographql.com/docs/react/data/mutations */
    /* login: Extract a Mutation Function from GraphQL */
    /* onCompleted (The Name Matters): A Callback Function Called When the Mutation Function Completes with No Error */
    const [ login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

    const clearLoginError = () => {
        clearErrors("LoginResult");
    };
    
    const onSubmitValid = data => {
        if (loading) {
            return;
        }

        /* Get Values from useForm */
        const { username, password } = getValues();
        
        /* Run the Mutation */
        login({ variables: { username, password } })
    }

    /* Replaced by useForm*/
    /* const onSubmitInvalid = (data) => {
        console.log("Invalid", data);
    } */

    /* Replaced by useForm */
    /* const [ username, setUsername ] = useState("");
    const [ usernameError, setUsernameError ] = useState("");
    
    const onUsernameChange = (event) => {
        setUsernameError("");
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (username === "") {
            setUsernameError("Username is empty");
        }

        if (username.length < 10) {
            setUsernameError("Username should be longer than 10 characters");
        }
    }; */

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <Notification>{location?.state?.message}</Notification>
                {/* Replaced by useForm
                <form onSubmit={handleSubmit}>
                    {usernameError}
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={onUsernameChange}
                    />
                    <Input type="password" placeholder="Password" />
                    <Button
                        type="submit"
                        value="Log in"
                        disabled={username === "" && username.length < 10}
                    />
                </form>
                */}
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username should be longer than 5 characters"
                            },
                            onChange: () => clearLoginError()
                        })}
                        hasError={Boolean(formState.errors?.username?.message)}
                    />
                    <FormError message={formState.errors?.username?.message} />
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password should be longer than 8 characters"
                            },
                            onChange: () => clearLoginError()
                        })}
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <FormError message={formState.errors?.password?.message} />
                    <Button type="submit" value="Log in" disabled={!formState.isValid} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox 
                cta="Don't have an account?"
                linkText="Sign up"
                link={routes.signUp}
            />
        </AuthLayout>
    );
};

export default Login;
