/* Reactive Variables: https://www.apollographql.com/docs/react/local-state/reactive-variables/*/
import { isLoggedInVar } from "../apollo";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => isLoggedInVar(false)}>Log Out</button>
        </div>
    );
};

export default Home;
