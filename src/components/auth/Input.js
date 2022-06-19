import styled from "styled-components";

/* const StyledInput = styled.input` */
const Input = styled.input`
    background-color: #fafafa;
    width: 100%;
    box-sizing: border-box;
    border: 0.5px solid ${props => props.hasError ? "tomato" : props.theme.borderColor};
    border-radius: 3px;
    margin-top: 5px;
    padding: 7px;
    /* '&' Nest Selector Modifier (https://stackoverflow.com/questions/13608855/what-does-an-before-a-pseudo-element-in-css-mean)*/
    /* '::' Pseudo Elements (https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) */
    &:focus {
        border-color: rgb(38, 38, 38);
    }
    &::placeholder {
        font-size: 12px;
    }
`;

/* 'props => {}' is Not Necessary */
/* const Input = props => {
    return <StyledInput {...props} />
} */

export default Input;
