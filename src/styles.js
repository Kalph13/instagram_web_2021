import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    bgColor: "#fafafa",
    fontColor: "rgb(38, 38, 38)",
    borderColor: "rgb(219, 219, 219)"
};
  
export const darkTheme = {
    accent: "#777777",
    bgColor: "#222222",
    fontColor: "#ffffff",
    borderColor: "rgb(219, 219, 219)"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    input {
        all: unset;
    }
    body {
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.fontColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
    }
    a {
        text-decoration: none;
    }
`;
