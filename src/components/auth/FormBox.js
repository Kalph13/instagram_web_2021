import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
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
    }
`;

const FormBox = ({ children }) => {
    return <Container>{children}</Container>
};

export default FormBox;
