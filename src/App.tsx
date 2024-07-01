import React, { Suspense } from "react";
import "./App.css";
import { Breeds } from "./Breeds";
import Header from "./Header";
import { Logo } from "./Header/Logo";

function App() {
    return (
        <div className="App">
            <Header />
            <Suspense fallback={
                <Logo />
            }>
                <Breeds />
            </Suspense>
        </div>
    );
}

export default App;
