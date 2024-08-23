import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';

// Register the required components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
);

const ChartWidget = ({ widget }) => {
    const { type, data } = widget;

    const chartData = {
        labels: data.labels,
        datasets: [{
            label: widget.name,
            data: data.value,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],            
            borderWidth: 1,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    switch (type) {
        case 'doughnut':
            return <Doughnut data={chartData} options={chartOptions} />;
        case 'bar':
            return <Bar data={chartData} options={chartOptions} />;
        case 'line':
            return <Line data={chartData} options={chartOptions} />;
        case 'pie':
            return <Pie data={chartData} options={chartOptions} />;
        default:
            return <div>No chart available</div>;
    }
};

export default ChartWidget;
