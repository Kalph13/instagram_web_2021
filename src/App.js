/* React Router v6: https://reactrouter.com/docs/en/v6/routers/browser-router */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";

/* React Helmet: Manages Changes to the Document 'Head' (https://github.com/nfl/react-helmet)*/
/* react-helmet-async: A Fork of React Helmet (https://www.npmjs.com/package/react-helmet-async) */
import { HelmetProvider } from "react-helmet-async";

import routes from "./routes";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";

import Layout from "./components/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import NotFound from "./screens/NotFound";

const App = () => {
  /* Replaced by 'useReactiveVar' */
  /* const [ isLoggedIn, setIsLoggedIn ] = useState(false); */

  /* Storing Local State in Reactive Variables: https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables */
  /* useReactiveVar: A Simple Method that Replaces A Complex Method (Using gql, useQuery) */
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route path={routes.home} element={isLoggedIn ? 
                <Layout>
                  <Home />
                </Layout> 
                : <Login />}
              />
              {!isLoggedIn ? <Route path={routes.signUp} element={<SignUp />} /> : null }
              <Route path={`/users/:username`} element={
                <Layout>
                  <Profile />
                </Layout>
              } />
              <Route element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
