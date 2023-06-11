import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Librarian from "./pages/Librarian";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import ViewBooks from "./pages/ViewBooks";
import AddBook from "./pages/AddBook";
import { UserContext } from "./context/UserContext";


const App = () => {
    const [userRole, setUserRole] = useState('');

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/viewbooks" element={<ViewBooks />} />
                    <Route path="/pay" element={<Payment />} />
                    <Route path="/librarian" element={<Librarian />} />
                    <Route path="/add" element={<AddBook />} />
                    <Route path="/viewbooks/:username" element={<ViewBooks />} />

                </Routes>
            </Router>
        </UserContext.Provider>
    );
};

export default App;