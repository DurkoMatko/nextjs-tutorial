import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotification] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    debugger;
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((user) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err.code, err.message);
        setNotification(err.message);
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login</h1>
      {notify}
      <form onSubmit={handleLogin}>
        Email
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
