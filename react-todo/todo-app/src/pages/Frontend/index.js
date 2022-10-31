import React from "react";
import { Routes, Route } from 'react-router-dom'
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from './Home'
import Todos from './Todos'
 import About from "./About"
import Contact from "./Contact"

export default function index() {
    return (
        <>
            <Header/>
            <main>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="todos" element={<Todos/>} />
                    <Route path="about" element={<About/>} />
                    <Route path="contact" element={<Contact/>} />


                </Route>
            </Routes>
            </main>
            <Footer />
        </>
    );
}
