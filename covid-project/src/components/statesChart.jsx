import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-3';
import '../css/statesChart.css';


const StatesChart = (props) => {
    const { chartData } = props;

    const data = {
        labels: ['day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7'],
        datasets: [
            {
                label: '# of positive cases',
                data: chartData?.map((item) => item.positive),
                fill: true,
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    };

    return (
        <div className="all-states-chart">
            <h3>Case trends, 7 day period</h3>
            {chartData.length > 0 && <Line
                data={data}
                options={{
                    maintainAspectRatio: false,
                }}
            />}
        </div>
    );
}

export default StatesChart; 