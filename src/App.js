import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  
  const apiKey = process.env.REACT_APP_NEWS_API; 
  // state = {
  //   progress: 0
  // }
  // setProgress = (progress) => {
  //   setState({progress: progress})
  // }

  const [progress, setProgress] = useState(0);

  
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            height={2}
            color="#f11946"
            progress={progress}
            
          />
          {/* <Navbar /> */}
          {/* <News setProgress={setProgress} apiKey = {apiKey} pageSize = {6} country = "in" category = "sports"/> */}

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="general"
                  pageSize={6}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="business"
                  pageSize={6}
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="entertainment"
                  pageSize={6}
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/general"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="general"
                  pageSize={6}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="health"
                  pageSize={6}
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="science"
                  pageSize={6}
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="sports"
                  pageSize={6}
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News setProgress={setProgress} apiKey = {apiKey}
                  key="technology"
                  pageSize={6}
                  country="in"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;

