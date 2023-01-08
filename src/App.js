import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';

const App =()=> {
 const apiKey=process.env.REACT_APP_NOT_SECRET_CODE;
  const [progress, setprogress] = useState(0)

const  showProgress=(progress)=>{
    setprogress(progress)
      }
  return (
    <>
    <LoadingBar color="#0095a2" height="4px" progress={progress} onLoaderFinished={()=>{setprogress(0)}}/>
    <NavBar />
    <Routes>
       <Route exact path="/" element={<News setProgress={showProgress}  apiKey={apiKey} key="general" pageSize={9} country={"in"} category="general" />}></Route>
       <Route exact path="/entertainment" element={<News setProgress={showProgress} apiKey={apiKey} key="entertainment" pageSize={9} country={"in"} category="entertainment" />}></Route>
       <Route exact path="/business" element={<News setProgress={showProgress} apiKey={apiKey} key="business" pageSize={9} country={"in"} category="business" />}></Route>
       <Route exact path="/health" element={<News setProgress={showProgress} apiKey={apiKey} key="health" pageSize={9} country={"in"} category="health" />}></Route>
       <Route exact path="/science" element={<News setProgress={showProgress} apiKey={apiKey} key="science" pageSize={9} country={"in"} category="science" />}></Route>
       <Route exact path="/sports" element={<News setProgress={showProgress} apiKey={apiKey} key="sports" pageSize={9} country={"in"} category="sports" />}></Route>
       <Route exact path="/technology" element={<News setProgress={showProgress} apiKey={apiKey} key="technology" pageSize={9} country={"in"} category="technology" />}></Route>
       <Route exact path="/about" element={<News setProgress={showProgress} apiKey={apiKey} key="about" pageSize={9} country={"in"} category="about" />}></Route>

    </Routes>
    </>
  );
}

export default App
