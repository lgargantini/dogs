import React from "react";
import "./App.css";
import { Breeds } from "./Breeds";
import Header from "./Header";

function App() {
    return (
        <div className="App">
            <img rel="icon" src="/public/favicon.ico" />
            <Header />
            <Breeds />
        </div>
    );
}

export default App;
