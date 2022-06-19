import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
/* useHistory is Deprecated (https://stackoverflow.com/questions/71884379/reactjs-in-react-rooter-dom-is-usehistory-deprecated) */
import { useNavigate } from "react-router-dom";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";

import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation CreateAccount($firstName: String!, $lastName: String, $username: String!, $email: String!, $password: String!) {
        createAccount(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
            createAccountSucceed
            createAccountError
        }
    }
`;

const SignUp = () => {
    const navigate = useNavigate();
    
    const onCompleted = data => {
        const { username, password } = getValues();

        const {
            createAccount: {
                createAccountSucceed,
                createAccountError
            }
        } = data;

        if (!createAccountSucceed) {
            return;
        }

        console.log("createAccountSucceed", createAccountSucceed);
        console.log("createAccountError", createAccountError);

        navigate(routes.home, {
            state: {
                username,
                password,
                message: "Account created: Please log in"
            }
        });
    };

    const [ createAccount, { loading }] = useMutation (CREATE_ACCOUNT_MUTATION, { onCompleted });

    const { register, handleSubmit, formState, getValues } = useForm({
        mode: "onChange"
    });

    const onSubmitValid = data => {
        if (loading) {
            return;
        }

        createAccount({
            variables: {
                ...data
            }
        });
    };

    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input 
                        type="text"
                        placeholder="First Name"
                        {...register("firstName", {
                            required: "First Name is required",
                        })}
                    />
                    <Input 
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName")}
                    />
                    <Input 
                        type="text" 
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    <Input 
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username should be longer than 5 characters"
                            },
                        })}
                    />
                    <Input 
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password should be longer than 8 characters"
                            },
                        })}
                    />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
        </AuthLayout>
    );
};

export default SignUp;
