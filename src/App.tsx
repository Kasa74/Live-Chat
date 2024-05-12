import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes, authRoutes } from "./routes";
import { PublicLayout } from "./Components/PublicLayout";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";

function App() {
  let isAuth = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
        </Route>
        {isAuth && <Route path="/account" element={<PersonalAccount />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
