import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, removeLoginToken } from "../apollo";

const ME_QUERY = gql`
    query FindMe {
        findMe {
            id
            username
            avatar
        }
    }
`;

const useUser = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    
    const { data } = useQuery(ME_QUERY, {
        skip: !isLoggedIn
    });

    useEffect(() => {
        if (data?.findMe === null) {
            removeLoginToken();
        }
    }, [data]);

    return { data };
};

export default useUser;