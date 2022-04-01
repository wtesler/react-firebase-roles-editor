import React, {Suspense} from 'react';
import './Root.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FirebaseStartup from "./Firebase/FirebaseStartup";
import serverConfig from "../../Config/SERVER_CONFIG.json";
import RolesScreen from "../../../../lib/index";

/**
 * Top-Level Component for the App.
 */
const Root = () => {
  const path = '/roles/*';

  const withSuspense = (component) => {
    return (
      <Suspense fallback={null}>
        {component}
      </Suspense>
    );
  }

  return (
    <div id='Root'>
      <FirebaseStartup/>
      <BrowserRouter>
        <Routes>
          <Route path={path} element={withSuspense(<RolesScreen host={serverConfig.host}/>)}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Root;
