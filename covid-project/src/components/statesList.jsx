import { React, useEffect } from "react";
import { useState } from "react";
import '../css/statesList.css';
import State from "./state";
import { API_URL } from '../config';
import { ThreeDots } from 'react-loading-icons';

const StatesList = (props) => {
    const [getStates, setGetStates] = useState([]);
    const [isStatesLoading, setIsStatesLoading] = useState(false);

    useEffect(() => {
        const getStatesData = async () => {
            setIsStatesLoading(true);
            const res = await fetch(API_URL + '/states',
                {
                    method: "get",
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                    }),
                }
            );
            const data = JSON.parse(await res.json());
            setGetStates(data);
            setIsStatesLoading(false);
        }
        getStatesData()
    }, [])

    const filteredData = getStates.filter((item) => {
        if (!props.input) return item;
        else {
            return item.state.toLowerCase().includes(props.input);
        }
    })

    return (
        <div className="states-list">
            {isStatesLoading ?
                <ThreeDots stroke="#4bc0c0" /> :
                filteredData.length > 0 ?
                    filteredData?.map((item) =>
                        <State item={item} key={item.state} />
                    ) :
                    <h2>There is no data to show at the moment</h2>
            }
        </div>
    );
}

export default StatesList; 