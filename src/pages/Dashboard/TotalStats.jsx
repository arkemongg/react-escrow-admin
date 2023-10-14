import styles from './styles/TotalStats.module.css'
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
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
const TotalStats = () => {
    return (
        <>
            <div className={styles.totalStatsArea}>
                <OrderStats />

                <CustomerVsSeller />
            </div>
        </>
    )
}

export default TotalStats
const OrderStats = () => {
    const labels = ["Pending", "Complete","Failed"]
    const data = {
        labels: labels,
        datasets: [{
            label: "Orders",
            data: [65, 59,5],
            backgroundColor: [
                '#8B00FF',
                '#359E4E',
                '#F01767',
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
        responsive: true,
        maintainAspectRatio: false
    }
    return (
        <div className={styles.totalStats}>
            <div className="customersArea text-3xl p-2 py-5">
                Orders Summary
            </div>
            <hr />
            <div className='w-[350px] h-[350px] m-auto pt-2' >
                <Doughnut options={options} data={data} />
            </div>
        </div>
    )
}


const CustomerVsSeller = () => {
    const labels = ["Customers", "Sellers"]
    const data = {
        labels: labels,
        datasets: [{
            label: "Total",
            data: [65, 59],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
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
        responsive: true,
        maintainAspectRatio: false
    }
    return (
        <div className={styles.totalStats}>
            <div className="customersArea text-3xl p-2 py-5">
                Custromers vs Sellers
            </div>
            <hr />
            <div className='w-[350px] h-[350px] m-auto pt-2' >
                <Doughnut options={options} data={data} />
            </div>
        </div>
    )
}