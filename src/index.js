import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router>
        <p>A Copy of : https://threejs.org/examples/?q=panora#webxr_vr_panorama_depth</p>
        <p>Creator : Or Fleisher (https://orfleisher.com/)</p>
        Hosted by : Sodi Adikaram (Deakin University)
        <App/>
    </Router>,
    document.getElementById("root")
);