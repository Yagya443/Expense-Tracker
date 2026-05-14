import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

const IncomeGraph = () => {
    const [income, setIncome] = useState([]);

    const each_sum = income.reduce((prev, curr) => {
        if (!prev[curr.category]) {
            prev[curr.category] = 0;
        }

        prev[curr.category] += curr.amount;

        return prev;
    }, {});

    const convertChartData = Object.entries(each_sum).map(
        ([category, amount]) => ({
            category,
            amount,
        }),
    );

    const fetchIncome = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/income`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setIncome(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchIncome();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius="90%" data={convertChartData}>
                <PolarGrid />

                <PolarAngleAxis dataKey="category" />

                <PolarRadiusAxis 
                    stroke="#000000"
                 />

                <Radar
                    name="Income"
                    dataKey="amount"
                    stroke="#000000"
                    fill="#a855f7"
                    fillOpacity={1}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default IncomeGraph;
