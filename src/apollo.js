/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables */
/* - Similar to Context (Same as Local Fields Using @client and Apollo Cache) */
/* - Not Use Apollo Client Cache */
/* - Can Store Any Type and Structure */
/* - GraphQL Syntax is Not Required */
/* - Automatically Trigger an Update of Every Active Query that Depends on That Variable */
import { makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);
