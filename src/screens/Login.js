import { faFacebook, faFacebookF, faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
import { isLoggedInVar, darkModeVar } from "../apollo";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid rgb(219, 219, 219);
    width: 100%;
`;

const TopBox = styled(WhiteBox)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        width: 100%;
        margin-top: 35px;
        input {
            background-color: #fafafa;
            width: 100%;
            box-sizing: border-box;
            border: 0.5px solid rgb(219, 219, 219);
            border-radius: 3px;
            margin-top: 5px;
            padding: 7px;
            &::placeholder {
                font-size: 12px;
            }
            &:last-child {
                background-color: #0095f6;
                color: white;
                border: none;
                margin-top: 12px;
                padding: 8px 0px;
                font-weight: 600;
                text-align: center;
            }
        }
    }
`;

const BottomBox = styled(WhiteBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        color: #0095f6;
    }
`;

const Separator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px 0px 30px 0px;
    text-transform: uppercase;
    div {
        width: 100%;
        height: 1px;
        background-color: rgb(219, 219, 219);
    }
    span {
        margin: 0px 10px;
        font-weight: 600;
        color: #8e8e8e;
    }
`;

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <input type="submit" value="Log in" />
                    </form>
                    <Separator>
                        <div></div>
                        <span>Or</span>
                        <div></div>
                    </Separator>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span> <a href="#">Sign up</a>
                </BottomBox>
            </Wrapper>
        </Container>
    );
};

export default Login;
