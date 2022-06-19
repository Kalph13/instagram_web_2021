import styled from "styled-components";

/* const StyledButton = styled.input` */
const Button = styled.input`
    width: 100%;
    background-color: ${props => props.theme.accent};
    opacity: ${props => props.disabled ? "0.4" : "1"};
    color: white;
    border: none;
    border-radius: 3px;
    margin-top: 12px;
    padding: 8px 0px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
`;

/* 'props => {}' is Not Necessary */
/* const Button = props => {
    return <StyledButton {...props} />
}; */

export default Button;
