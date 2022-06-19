import styled from "styled-components";

const StyledSeparator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px 0px 30px 0px;
    text-transform: uppercase;
    div {
        width: 100%;
        height: 1px;
        background-color: ${props => props.theme.borderColor};
    }
    span {
        margin: 0px 10px;
        font-size: 12px;
        font-weight: 600;
        color: #8e8e8e;
    }
`;

const Separator = () => {
    return (
        <StyledSeparator>
            <div />
            <span>Or</span>
            <div />
        </StyledSeparator>
    )
};

export default Separator;
