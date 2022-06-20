import styled from "styled-components";

const StyledAvatar = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 15px;
    background-color: #2c2c2c;
    overflow: hidden;
`;

const Image = styled.img`
    max-width: 100%;
`;

const Avatar = ({ url = "" }) => {
    return (
        <StyledAvatar>
            {url !== "" ? <Image src={url} /> : null}
        </StyledAvatar>
    );
}

export default Avatar;
