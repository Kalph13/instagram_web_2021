import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import PropTypes from "prop-types";

import Avatar from "../../components/Avatar";
import { FatText } from "../../components/shared";
import Comments from "./Comments";

import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TOGGLE_LIKE_MUTATION = gql`
    mutation ToggleLike($toggleLikeId: Int!) {
        toggleLike(id: $toggleLikeId) {
            toggleLikeSucceed
            toggleLikeError
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: #ffffff;
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 4px;
    margin-bottom: 60px;
    max-width: 615px;
`;

const PhotoHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

const Likes = styled(FatText)`
    display: block;
    margin-top: 15px;
`;

const Photo = ({ id, user, file, isLiked, likes, caption, commentsNumber, comments }) => {
    /* readFragment, writeFrament: Read and Write Data to the Apollo Client Cache */
    /* - Docs: https://www.apollographql.com/docs/react/caching/cache-interaction/#using-graphql-fragments */
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: {
                    toggleLikeSucceed
                }
            }
        } = result;

        if (toggleLikeSucceed) {
            const fragmentID = `Photo:${id}`;
            
            const fragment = gql`
                fragment PhotoCache on Photo {
                    isLiked
                    likes
                }
            `;
            
            const fragmentResult = cache.readFragment({
                id: fragmentID,
                fragment
            });

            if ("isLiked" in fragmentResult && "likes" in fragmentResult) {
                const { isLiked: cacheIsLiked, likes: cacheLikes } = fragmentResult;

                cache.writeFragment({
                    id: fragmentID,
                    fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1
                    }
                });
            }
        }
    };
    
    /* update: Update the Apollo Client Cache After the Mutation Completes */
    /* - Docs: https://www.apollographql.com/docs/react/data/mutations/#the-update-function */
    const [ toggleLikeMutation ] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            toggleLikeId: id
        },
        update: updateToggleLike
    });

    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar lg url={user.avatar} />
                <Username>{user.username}</Username>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            <FontAwesomeIcon
                                style={{ color: isLiked ? "tomato" : "inherit" }}
                                icon={isLiked ? SolidHeart : faHeart}
                            />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>
                    {likes === 1 ? "1 like" : `${likes} likes`}
                </Likes>
                <Comments
                    author={user.username}
                    caption={caption}
                    commentsNumber={commentsNumber}
                    comments={comments}
                />
            </PhotoData>
        </PhotoContainer>
    );
};

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired
};

export default Photo;
