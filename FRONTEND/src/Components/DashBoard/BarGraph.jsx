import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Bargraph = () => {
    const [expense, setExpense] = useState([]);

    const each_sum = expense.reduce((prev, curr) => {
        if (!prev[curr.category]) {
            prev[curr.category] = 0;
        }

        prev[curr.category] += curr.amount;

        return prev;
    }, {});

    const convertChartData = Object.entries(each_sum).map(
        ([category, amount]) => ({
            category,
            amount: Math.abs(amount),
        }),
    );

    const fetchExpense = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/expense`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setExpense(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchExpense();
    }, []);

    return (
        <>
            <div className="expense-chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={convertChartData}>
                        <CartesianGrid
                            strokeDasharray="4 4"
                            className="expense-chart-grid"
                        />

                        <XAxis
                            dataKey="category"
                            className="expense-chart-xaxis "
                        />

                        <YAxis className="expense-chart-yaxis" />

                        <Tooltip className="expense-chart-tooltip " />

                        <Bar dataKey="amount" className="expense-chart-bar">
                            {convertChartData.map((entry, index) => (
                                <Cell key={index} fill={"#a855f7"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Bargraph;
