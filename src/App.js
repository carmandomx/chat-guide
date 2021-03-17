import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
function App() {
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios
      .post("https://academlo-chat.herokuapp.com/api/users/login", {
        email: "test@test.com",
        password: "random123",
      })
      .then((res) => setToken(res.data.user.token));
  }, []);

  useEffect(() => {
    if (token) {
      const connection = io("https://academlo-chat.herokuapp.com/", {
        query: {
          token,
        },
      });

      setSocket(connection);
    }
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.emit("join", { name: "test", room: "69" }, (error) => {
        if (error) {
          console.error(error);
        }
      });

      socket.on("roomData", (data) => {
        console.log(data);
      });
      socket.on("message", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  return <div className="App"></div>;
}

export default App;
