import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BaseBox } from "../shared";

const StyledBottomBox = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    background-color: ${props => props.theme.bgColor};
    a {
        font-weight: 600;
        margin-left: 5px;
        color: ${props => props.theme.accent};
    }
`;

const BottomBox = ({ cta, link, linkText }) => {
    return (
        <StyledBottomBox>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </StyledBottomBox>
    )
};

BottomBox.propTypes = {
    cta: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
};

export default BottomBox;
