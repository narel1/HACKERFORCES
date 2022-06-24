import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import Student from "./components/Student";
import Problem from "./components/Problem";
import EditPanel from "./components/EditPanel";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/student" element={<Student />} />
                <Route path="/problems/:id" element={<Problem />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/edit-problem/:id" element={<EditPanel />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
