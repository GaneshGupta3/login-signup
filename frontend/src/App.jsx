import styles from "./App.module.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginCard from "./components/LoginCard";

import TransparentCard from "./components/TransparentCard";
import ProfilePage from "./components/ProfilePage";
import SignUpCard from "./components/SignupCard";
// import SignUpCard from "./components/SignUpCard";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={ <LoginCard />  }></Route>
                    <Route path="/signup" element={<SignUpCard />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
