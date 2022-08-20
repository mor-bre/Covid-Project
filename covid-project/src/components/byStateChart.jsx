import { Bar } from 'react-chartjs-3';
import '../css/byStatesChart.css';

const ByStateChart = (props) => {
    const { chartData } = props;
    const data = {
        labels: ['hospitalized', 'in ICU', 'on ventilator'],
        datasets: [
            {
                label: 'Current stats',
                data: [chartData.hospitalizedCurrently, chartData.inIcuCurrently, chartData.onVentilatorCurrently],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }
        ]
    };
    return (
        <div className="by-state-chart">
            <h4>Current stats</h4>
            {<Bar
                data={data}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                }}
            />}
        </div>
    );
}

export default ByStateChart;