import { React, useEffect } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import '../css/statesListContainer.css';
import StatesList from "./statesList";


const ByState = () => {
    const [inputText, setInputText] = useState("");


    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };


    return (
        <div className="states-list-container">
            <h1>Data By State</h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search states"
                />
            </div>
            <StatesList input={inputText} />
        </div>
    );
}

export default ByState;