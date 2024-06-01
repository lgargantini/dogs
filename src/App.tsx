import React from "react";
import "./App.css";
import { Breeds } from "./Breeds";
import Header from "./Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Breeds />
        </div>
    );
}

export default App;
