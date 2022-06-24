/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables */
/* - Similar to Context (Same as Local Fields Using @client and Apollo Cache) */
/* - Not Use Apollo Client Cache */
/* - Can Store Any Type and Structure */
/* - GraphQL Syntax is Not Required */
/* - Automatically Trigger an Update of Every Active Query that Depends on That Variable */
import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const TOKEN = "LOGIN_TOKEN";
const DARK_MODE = "DARK_MODE"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const setLoginToken = loginToken => {
    localStorage.setItem(TOKEN, loginToken);
    isLoggedInVar(true);
}

export const removeLoginToken = loginToken => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
};

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

/* Authentication at Apollo Client: https://www.apollographql.com/docs/react/networking/authentication */
const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem(TOKEN)
        }
    };
});

/* typePolicies: https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-cache-ids */
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            User: {
                keyFields: obj => `User:${obj.username}`
            }
        }
    })
});

/* Request Header: https://www.apollographql.com/docs/react/networking/basic-http-networking#customizing-request-headers */
/* export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem(TOKEN)
    }
}); */
