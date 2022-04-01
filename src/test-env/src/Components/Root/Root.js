import React from 'react';
import './Root.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FirebaseStartup from "./Firebase/FirebaseStartup";
import serverConfig from "../../Config/SERVER_CONFIG.json";
import RolesScreen from "../../../../lib/index";
/**
 * Top-Level Component for the App.
 */
const Root = () => {
  const path = '/roles';

  return (
    <div id='Root'>
      <FirebaseStartup/>
      <BrowserRouter>
        <Routes>
          <Route path={path}><RolesScreen host={serverConfig.host}/></Route>
          <Route>{`Go to ${path}`}</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Root;
