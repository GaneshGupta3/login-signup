import styles from "./App.module.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginCard from "./components/LoginCard";
import SignupCard from "./components/SignUpCard";
import TransparentCard from "./components/TransparentCard";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={ <LoginCard />  }></Route>
                    <Route path="/signup" element={<SignupCard />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
