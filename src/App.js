import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import Loader from "./components/Loader";
//
function App() {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  //
  useEffect(() => {
    if (!loading && !user) history.push("/login");
    console.log(user);
  }, [user, loading, error, history]);
  //
  return (
    <Loader loading={loading}>
      <h1>Hello {(user || { displayName: "" }).displayName}!</h1>
    </Loader>
  );
}

export default App;
