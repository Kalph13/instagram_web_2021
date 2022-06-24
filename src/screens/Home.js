/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
/* import { removeLoginToken } from "../apollo"; */

import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query SeeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const Home = () => {
    /* useQuery: https://www.apollographql.com/docs/react/data/queries */
    const { data } = useQuery(FEED_QUERY, {
        variables: { offset: 0 }
    });
    
    return (
        <div>
            <PageTitle title="Home" />
            {data?.seeFeed?.map(photo => (
                <Photo key={photo.id} {...photo} />
            ))}
        </div>
    );
};

export default Home;
