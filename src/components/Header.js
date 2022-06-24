import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 18px 0px;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    background-color: ${props => props.theme.bgColor};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 930px;
    width: 100%;
`;

const Column = styled.div`

`;

const Icon = styled.span`
    margin-left: 15px;
`;

const Button = styled.span`
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    color: white;
    font-weight: 600;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Header = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    
    return (
        <StyledHeader>
            <Wrapper>
                <Column>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </Column>
                <Column>
                    {isLoggedIn ?
                        <IconContainer>
                            <Icon>
                                <Link to={routes.home}>
                                    <FontAwesomeIcon icon={faHome} size="lg" />
                                </Link>
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faCompass} size="lg" />
                            </Icon>
                            <Icon>
                                <Link to={`/users/${data?.findMe?.username}`}>
                                    <Avatar url={data?.findMe?.avatar} />
                                </Link>
                            </Icon>
                        </IconContainer>
                    :
                        <Link href={routes.home}>
                            <Button>Login</Button>
                        </Link>
                    }
                </Column>
            </Wrapper>
        </StyledHeader>
    );
};

export default Header;
