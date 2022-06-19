import styled from "styled-components";

const StyledFormError = styled.span`
    margin: 5px 0px 10px 0px;
    color: tomato;
    font-size: 12px;
    font-weight: 600;
`;

const FormError = ({ message }) => {
    return message === "" || !message ? null : <StyledFormError>{message}</StyledFormError>;
};

export default FormError;