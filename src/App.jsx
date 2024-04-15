import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import AppRouter from "./routers/Approuter";
import { ConfigProvider } from "antd";
import Header from "./Components/Header";
import useNotification from "antd/es/notification/useNotification";
import FooterList from "./Components/FooterList";
import api from "./api";
import { getAccessToken } from "./api/core";
import NotificationContext from "./context/NotificationContext";
import AntdConfigProvider from "./context/AntdContext";
function App() {
  const [currentUser, setCurrentUser] = useState();
  const [notify, notifyContextHolder] = useNotification();

  useEffect(() => {
    (async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        return;
      }

      api.auth.invoke({}).then((res) => {
        console.log(res);
        setCurrentUser(res.data);
      });
    })();
  }, []);

  return (
    <BrowserRouter>
      <AntdConfigProvider>
        {/* <ConfigProvider> */}
        <NotificationContext.Provider value={{ notify, notifyContextHolder }}>
          <AuthContext.Provider
            value={{
              currentUser,
              setCurrentUser,
            }}
          >
            {notifyContextHolder}
            <Header />
            <AppRouter />
          </AuthContext.Provider>
        </NotificationContext.Provider>
        {/* </ConfigProvider> */}
      </AntdConfigProvider>
      <FooterList />
    </BrowserRouter>
  );
}

export default App;
