import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Listing from "./pages/Listing";
import PreviewList from "./pages/PreviewList";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/create-listing" element={<Listing />} />
          <Route path="/listing/:listingId" element={<PreviewList />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
