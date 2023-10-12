import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    
} from 'chart.js';
import { Bar,Doughnut } from 'react-chartjs-2';

import styles from './styles/CustomersAndTrendingProducts.module.css'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const CustomersAndTrendingProducts = () => {
    return (
        <>
            <div className={styles.customersAndTrendingProductsArea}>
                    <CustomersLastSixMonths />
                    <TrendingProductsDoughnut />
            </div>
        </>
    );
};

const CustomersLastSixMonths = () => {
    const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"]
    const data = {
        labels: labels,
        datasets: [{
            label: "New Customers",
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
            ],
            borderWidth: 2
        }],

    };
    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive:true,
        maintainAspectRatio: false
    }
    return (

        <div className={`${styles.customerChartArea} p-5`}>
            <div className="customersArea text-3xl p-2 py-5">
                New Customers
            </div>
            <hr />

            <div className='w-[100%] h-[320px] ' >
                <Bar options={options} data={data} />
            </div>
        </div>

    )
}

const TrendingProductsDoughnut = () => {
    const labels = ["Cards", "Keys", "Coins", "BTC", "LTC", "JUN"]
    const data = {
        labels: labels,
        datasets: [{
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 5, 100)',
                'rgb(54, 162, 300)',
                'rgb(255, 105, 100)'
            ],
            hoverOffset: 4
        }],

    };
    const options = {
        plugins: {
            legend: {
                display: true
            }
        },
        responsive:true,
        maintainAspectRatio: false
    }
    return (

        <div className={`${styles.trendingChartArea} p-5`}>
            <div className="customersArea text-3xl p-2 py-5">
                Trending Products
            </div>
            <hr />
            <div className='w-[100%] h-[320px] pt-2' >
                <Doughnut options={options} data={data} />
            </div>
            
        </div>

    )
}

export default CustomersAndTrendingProducts;