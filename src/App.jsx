import { useState, useEffect } from "react";
import axios from "axios";

import IconsCard from "./assets/card_icons.png";

function App() {
  const dataLi = ["name", "email", "birthday", "location", "phone", "password"];

  const [userData, setUserData] = useState({});
  const [textDisplay, setTextDisplay] = useState({
    title: "",
    body: "",
  });
  const [lastActive, setLastActive] = useState(0);

  const fetchData = async () => {
    const result = await axios("https://randomuser.me/api/");
    setUserData(result.data.results[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData.name) {
      const dataToDisplay = [
        {
          title: "Hi, my name is",
          body: userData?.name?.first + " " + userData?.name?.last,
        },
        {
          title: "My email address is",
          body: userData?.email,
        },
        {
          title: "My birthday is",
          body: new Date(userData?.dob?.date).toLocaleDateString(),
        },
        {
          title: "My address is",
          body:
            userData?.location?.street?.number +
            " " +
            userData?.location?.street?.name,
        },
        {
          title: "My phone number is",
          body: userData?.phone,
        },
        {
          title: "My password is",
          body: userData?.login?.password,
        },
      ];

      setTextDisplay(dataToDisplay[lastActive]);
    }
  }, [lastActive, userData]);

  return (
    <div className="App">
      <h1>
        RANDOM USER GENERATOR{" "}
        <a
          href="https://randomuser.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>{" "}
      </h1>
      <div className="user">
        {userData.gender ? (
          <div className="card-profil">
            <div className="header">
              <img src={userData.picture.large} alt="profil" />
            </div>

            <div className="body">
              <h5>{textDisplay.title}</h5>
              <h3>{textDisplay.body}</h3>
            </div>

            <div className="footer">
              <ul>
                {dataLi.map((item, k) => {
                  return (
                    <li
                      key={k}
                      onMouseEnter={() => setLastActive(k)}
                      className={`${item} ${lastActive === k ? "active" : ""}`}
                    ></li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <h3>Loading ...</h3>
        )}
      </div>

      <div className="new-user">
        <button onClick={fetchData}>New User</button>
      </div>
      <div className="credit">
        <h3>
          By{" "}
          <a href="http://thicode.tech" target="_blank" rel="noopener noreferrer">
            Thicode
          </a>
        </h3>
      </div>
    </div>
  );
}

export default App;
