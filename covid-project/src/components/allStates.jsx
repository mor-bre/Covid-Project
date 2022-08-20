import { useEffect } from "react";
import { useState } from "react";
import '../css/allStates.css';
import '../css/App.css';
import '../css/infoBox.css';
import '../css/totalResults.css';
import StatesChart from "./statesChart";
import InfoBox from "./infoBox";
import TotalResults from "./totalResults";
import { API_URL } from '../config';
import { ThreeDots } from 'react-loading-icons';


const AllStates = () => {
    const [USData, setUSData] = useState({});
    const [priorUSData, setPriorUSData] = useState([]);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [isStatsLoading, setIsStatsLoading] = useState(false);

    useEffect(() => {
        const getUSData = async () => {
            setIsStatsLoading(true);
            const res = await fetch(API_URL + '/current-usa',
                {
                    method: "get",
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                    }),
                }
            );
            const data = JSON.parse(await res.json());
            setUSData(data);
        }
        getUSData()
    }, [])

    useEffect(() => {
        const getpriorUSData = async () => {
            setIsChartLoading(true);
            const res = await fetch(API_URL + '/last-week-usa',
                {
                    method: "get",
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                    }),
                }
            );
            const data = JSON.parse(await res.json());
            setPriorUSData(data)
        }
        getpriorUSData()
        setTimeout(function () {
            setIsStatsLoading(false);
        }, 2500)
    }, [])

    return (
        <div className="all-states-container">
            <h1>Daily Update for the United States</h1>
            {isStatsLoading ?
                <div className="stats">
                    <ThreeDots stroke="#4bc0c0" />
                </div> :
                <div className="states-container">
                    <div className="stats">
                        {isStatsLoading ?
                            <ThreeDots stroke="#4bc0c0" /> :
                            <div className="info-container">
                                <InfoBox
                                    mainTitle='Cases'
                                    secondaryTitle='New Cases'
                                    content={USData.positiveIncrease}
                                    isBig={true}>
                                </InfoBox>
                                <InfoBox
                                    mainTitle='Hospitalizations'
                                    secondaryTitle='Currently Hospitalized'
                                    content={USData.hospitalizedCurrently}
                                    isBig={true}>
                                </InfoBox>
                                <InfoBox
                                    mainTitle='Deaths'
                                    secondaryTitle='New Deaths'
                                    content={USData.deathIncrease}
                                    isBig={true}>
                                </InfoBox>
                                <InfoBox
                                    mainTitle='Tests'
                                    secondaryTitle={['Positive Increase', 'Negative Increase']}
                                    content={[USData.positiveIncrease, USData.negativeIncrease]}
                                    isBig={true}>
                                </InfoBox>
                            </div>
                        }
                    </div>
                    <div className="total-results">
                        <TotalResults
                            title='Total Cases'
                            content={USData.positive}
                        ></TotalResults>
                        <TotalResults
                            title='Total Hospitalizations'
                            content={USData.hospitalizedCurrently}
                        ></TotalResults>
                        <TotalResults
                            title='Total Deaths'
                            content={USData.death}
                        ></TotalResults>
                        <TotalResults
                            title='Total Tests'
                            content={USData.totalTestResults}
                        ></TotalResults>
                    </div>
                    <div className="chart-container">
                        {
                            priorUSData.length > 0 ? <StatesChart chartData={priorUSData} /> : ''
                        }
                    </div>
                </div>
            }

        </div>
    );
}

export default AllStates;