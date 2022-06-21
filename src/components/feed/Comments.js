import styled from "styled-components";
import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentsContainer = styled.div`
    margin-top: 20px;
`;

const CommentCount = styled.span`
    display: block;
    opacity: 0.7;
    margin: 10px 0px;
    font-weight: 600;
    font-size: 10px;
`;

const Comments = ({ author, caption, commentsNumber, comments }) => {
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption} />
            <CommentCount>
                {commentsNumber === 1 ? "1 comment" : `${commentsNumber} comments`}
            </CommentCount>
            {comments?.map(comment => 
                <Comment 
                    key={comment.id}
                    author={comment.user.username}
                    payload={comment.payload}
                />
            )}
        </CommentsContainer>
    );
};

Comments.propTypes = {
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentsNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.shape({
                avatar: PropTypes.string,
                username: PropTypes.string.isRequired
            }),
            payload: PropTypes.string.isRequired,
            isMine: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired
        })
    )
};

export default Comments;