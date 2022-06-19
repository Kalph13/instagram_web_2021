/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
import { removeLoginToken } from "../apollo";

const Home = () => {
    return (
        <div>
            <h1>You're logged in!</h1>
            <button onClick={() => removeLoginToken()}>Log Out</button>
        </div>
    );
};

export default Home;
