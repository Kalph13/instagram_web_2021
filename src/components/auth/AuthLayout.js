import styled from "styled-components";

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

const AuthLayout = ({ children }) => {
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
        </Container>
    );
};

export default AuthLayout;
