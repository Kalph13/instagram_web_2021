import { gql, useApolloClient, useQuery, useMutation } from "@apollo/client"
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";

import styled from "styled-components";
import { FatText } from "../components/shared";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";

const FOLLOW_USER_MUTATION = gql`
    mutation FollowUser($username: String!) {
        followUser(username: $username) {
            FollowUserSucceed
            FollowUserError
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation UnfollowUser($username: String!) {
        unfollowUser(username: $username) {
            UnfollowUserSucceed
            UnfollowUserError
        }
    }
`;

const SEE_PROFILE_QUERY = gql`
    query SeeProfile($username: String!) {
        seeProfile(username: $username) {
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
    display: flex;
`;

const Avatar = styled.img`
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-right: 150px;
    margin-left: 50px;
    background-color: #2c2c2c;
`;

const Column = styled.div`
    
`;

const Username = styled.h3`
    font-size: 28px;
    font-weight: 400;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
`;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
    margin-right: 20px;
`;
const Value = styled(FatText)`
    font-size: 18px;
`;
const Name = styled(FatText)`
    font-size: 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

const Photo = styled.div`
    position: relative;
    background-image: url(${(props) => props.bg});
    background-size: cover;
`;

const Icons = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.span`
    display: flex;
    align-items: center;
    margin: 0px 5px;
    font-size: 18px;
    svg {
        font-size: 14px;
        margin-right: 5px;
    }
`;

const ProfileButton = styled(Button).attrs({as: "span"})`
    margin-left: 10px;
    margin-top: 0px;
    padding: 10px 10px;
    cursor: pointer;
`;

const Profile = () => {
    const { username } = useParams();
    const { data: userData } = useUser();
    const client = useApolloClient();
    
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username: username
        }
    });

    const unfollowUserUpdate = (cache, result) => {
        const {
            data: {
                unfollowUser: { UnfollowUserSucceed }
            }
        } = result;

        if (!UnfollowUserSucceed) {
            return;
        }

        cache.modify({
            id: `User:${username}`,
            fields: {
                isFollowing(prev) {
                    return false;
                },
                totalFollowers(prev) {
                    return prev - 1;
                }
            }
        })

        const { findMe } = userData;

        cache.modify({
            id: `User:${findMe.username}`,
            fields: {
                totalFollowing(prev) {
                    return prev - 1;
                }
            }
        })
    };

    const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: {
            username: username
        }, 
        update: unfollowUserUpdate
    });
    
    const followUserCompleted = data => {
        const {
            followUser: {
                FollowUserSucceed
            }
        } = data;

        if (!FollowUserSucceed) {
            return;
        }

        const { cache } = client;

        cache.modify({
            id: `User:${username}`,
            fields: {
                isFollowing(prev) {
                    return true;
                },
                totalFollowers(prev) {
                    return prev + 1;
                }
            }
        })

        const { findMe } = userData;

        cache.modify({
            id: `User:${findMe.username}`,
            fields: {
                totalFollowing(prev) {
                    return prev + 1;
                }
            }
        })
    };

    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {
            username: username
        },
        onCompleted: followUserCompleted
    })

    const getButton = seeProfile => {
        const { isMe, isFollowing } = seeProfile;

        if (isMe) {
            return <ProfileButton>Edit Profile</ProfileButton>
        }

        if (isFollowing) {
            return <ProfileButton onClick={unfollowUser}>Unfollow</ProfileButton>
        } else {
            return <ProfileButton onClick={followUser}>Follow</ProfileButton>
        }
    };
    
    return (
        <div>
            <PageTitle
                title={
                    loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
                }
            />
            <Header>
                <Avatar src={data?.seeProfile?.avatar} />
                <Column>
                    <Row>
                        <Username>{data?.seeProfile?.username}</Username>
                        {data?.seeProfile ? getButton(data.seeProfile) : null}
                    </Row>
                    <Row>
                        <List>
                            <Item>
                                <span>
                                    <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                                </span>
                            </Item>
                            <Item>
                                <span>
                                    <Value>{data?.seeProfile?.totalFollowing}</Value> following
                                </span>
                            </Item>
                        </List>
                    </Row>
                    <Row>
                        <Name>
                            {data?.seeProfile?.firstName}
                            {" "}
                            {data?.seeProfile?.lastName}
                        </Name>
                    </Row>
                    <Row>
                        {data?.seeProfile?.bio}
                    </Row>
                </Column>
            </Header>
            <Grid>
                {data?.seeProfile?.photos.map(photo => (
                    <Photo key={photo.id} bg={photo.file}>
                        <Icons>
                            <Icon>
                                <FontAwesomeIcon icon={faHeart} />
                                {photo.likes}
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faComment} />
                                {photo.commentsNumber}
                            </Icon>
                        </Icons>
                    </Photo>
                ))}
            </Grid>
        </div>
    );
};

export default Profile;