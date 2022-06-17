/* React Router v6: https://reactrouter.com/docs/en/v6/routers/browser-router */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";

import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";

const App = () => {
  /* Replaced by 'useReactiveVar' */
  /* const [ isLoggedIn, setIsLoggedIn ] = useState(false); */

  /* Storing Local State in Reactive Variables: https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables */
  /* useReactiveVar: A Simple Method that Replaces A Complex Method (Using gql, useQuery) */
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
