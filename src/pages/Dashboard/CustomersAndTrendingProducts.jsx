import React, { useEffect, useState } from 'react';
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
import { Bar, Doughnut } from 'react-chartjs-2';

import styles from './styles/CustomersAndTrendingProducts.module.css'
import { getToken } from '../AxiosHeaders';
import { useAuth } from '../../AuthContext';


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
    const { logout } = useAuth()
    const months = ["MONTHS", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const [chartData, setChartData] = useState([])
    const [labels, setLabel] = useState([])

    useEffect(() => {
        const url = '/admin/customers-count/'
        getToken(url)
            .then(response => {
                if (response.status === 200) {
                    const labelD = []
                    const chartD = []
                    response.data.forEach(data => {
                        labelD.unshift(months[data.month])
                        chartD.unshift(data.count)
                    })
                    setLabel(labelD)
                    setChartData(chartD)
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        logout()
                    }
                }
            });

        return () => { }; //HANDLE MULTIPLE CALL ERROR

    }, [])

    const data = {
        labels: labels,
        datasets: [{
            label: "New Customers",
            data: chartData,
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
        responsive: true,
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
    
    const { logout } = useAuth()
    const [chartData, setChartData] = useState([])
    const [labels, setLabel] = useState([])

    useEffect(() => {
        const url = '/admin/trending-products/'
        getToken(url)
            .then(response => {
                if (response.status === 200) {
                    const labelD = []
                    const chartD = []
                    response.data.forEach(data => {
                        if (data.title.length > 15) {
                            labelD.unshift(data.title.slice(0, 10));
                        } else {
                            labelD.unshift(data.title);
                        }
                        chartD.unshift(data.sales)
                    })
                    setLabel(labelD)
                    setChartData(chartD)
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        logout()
                    }
                }
            });

        return () => { }; //HANDLE MULTIPLE CALL ERROR

    }, [])
    const data = {
        labels: labels,
        datasets: [{
            label: "Sales",
            data: chartData,
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
        responsive: true,
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