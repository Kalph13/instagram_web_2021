import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FatText } from "../shared";

/* sanitize-html: Prevent XSS Vulnerabilities (Malicious Tags Such as <Script /> */
/* - Docs: https://www.npmjs.com/package/sanitize-html */
/* - Example 1: https://dydals5678.tistory.com/99 */
/* - Example 2: https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pjok1122&logNo=221538363542 */
/* import sanitizeHtml from "sanitize-html"; */

const DELETE_COMMENT_MUTATION = gql`
    mutation DeleteComment($deleteCommentId: Int!) {
        deleteComment(id: $deleteCommentId) {
            deleteCommentSucceed
            deleteCommentError
        }
    }
`;

const CommentContainer = styled.div`
    margin-bottom: 7px;
    button {
        border-style: none;
        background-color: #ffffff;
        font-weight: 600;
        font-size: 12px;
        cursor: pointer;
    }
`;

const CommentCaption = styled.span`
    margin-left: 10px;
    /* mark */ a {
        background-color: inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Comment = ({ id, photoID, author, payload, isMine }) => {
    /* sanitizeHtml: Delete All Malicious Tags in the Payload */
    /* allowTags: Allow Selective Tags */
    /* const cleanedPayload = sanitizeHtml(
        payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
        {
            allowTags: ["mark"]
        }
    ) */

    const updateDeleteComment = (cache, result) => {
        const {
            data: {
                deleteComment: {
                    deleteCommentSucceed
                }
            }
        } = result;

        if (deleteCommentSucceed) {
            cache.evict({ id: `Comment:${id}` });
            cache.modify({
                id: `Photo:${photoID}`,
                fields: {
                    commentsNumber(prev) {
                        return prev - 1;
                    }
                }
            });
        }
    };

    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            deleteCommentId: id
        },
        update: updateDeleteComment
    });

    const onDeleteClick = () => {
        deleteCommentMutation();
    };

    /* RegExp (Regular Expression): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp */
    /* RegExp.prototype.test(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test */
    /* React.Fragment: Just </>, Used Here to Put Key Values in Map() */
    return (
        <CommentContainer>
            <Link to={`/users/${author}`}>
                <FatText>{author}</FatText>
            </Link>
            {/* <CommentCaption 
                dangerouslySetInnerHTML={{
                    __html: cleanedPayload
                }}
            /> */}
            <CommentCaption>
                {payload.split(" ").map((word, index) => 
                    /#[\w]+/g.test(word) ? (
                        <React.Fragment key={index}>
                            <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>
                            {word}{" "}
                        </React.Fragment>
                    )
                )}
            </CommentCaption>
            {isMine ? <button onClick={onDeleteClick}>X</button> : null}
        </CommentContainer>
    );
};

Comment.propTypes = {
    id: PropTypes.number,
    photoID: PropTypes.number,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
    isMine: PropTypes.bool
}

export default Comment;