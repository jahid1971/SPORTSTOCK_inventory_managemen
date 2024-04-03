import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ labels, data, title }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Sales",
                data: data,
                fill: false,
                backgroundColor: "rgb(251 113 133)",
                borderColor: "rgb(251 113 133)",
                
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
