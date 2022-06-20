import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { darkModeVar, enableDarkMode, disableDarkMode } from "../../apollo";

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

const Footer = styled.footer`
    margin-top: 20px;
`;

const DarkModeButton = styled.span`
    cursor: pointer;
`;

const AuthLayout = ({ children }) => {
    const darkMode = useReactiveVar(darkModeVar);

    return (
        <Container>
            <Wrapper>{children}</Wrapper>
            <Footer>
                <DarkModeButton onClick={darkMode ? disableDarkMode : enableDarkMode}>
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </DarkModeButton>
            </Footer>
        </Container>
    );
};

export default AuthLayout;
