import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SingleUser from "./pages/singleuser/SingleUser";
import New from "./pages/new/New";
import List from "./pages/list/List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelInputs, roomInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const UserRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              index
              element={
                <UserRoute>
                  <Home />
                </UserRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <UserRoute>
                    <List columns={userColumns} />
                  </UserRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <UserRoute>
                    <SingleUser />
                  </UserRoute>
                }
              />
              <Route
                path="new"
                element={
                  <UserRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </UserRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <UserRoute>
                    <List columns={hotelColumns} />
                  </UserRoute>
                }
              />
              <Route
                path="new"
                element={
                  <UserRoute>
                    <NewHotel inputs={hotelInputs} title="Add New Hotel" />
                  </UserRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <UserRoute>
                    <List columns={roomColumns} />
                  </UserRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
