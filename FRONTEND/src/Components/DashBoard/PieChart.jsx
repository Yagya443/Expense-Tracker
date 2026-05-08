import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const FinancialPieChart = () => {
    const [recentTran, setRecentTran] = useState([]);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const COLORS = [
      "#ef4444",
      "#facc15", 
      "#8b5cf6 ",
      ];

    const fetchTotalIncome = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/totalIncome`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setTotalIncome(res.data.total);
        } catch (error) {
            console.error(error);
        }
    }, []);
    const fetchTotalExpense = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/totalExpense`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setTotalExpense(res.data.total);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchTotalIncome();
        fetchTotalExpense();
    }, []);

    const chartData = [
      {
        name: "Expense",
        value: Math.abs(totalExpense),
      },
      {
        name: "Income",
        value: totalIncome,
      },
      {
          name: "Total",
          value: Math.abs(totalExpense) + totalIncome,
      },
    ];

    return (
        <div className=" p-4 rounded-lg ">
            <h1 className="text-2xl font-semibold mb-4">Financial Overview</h1>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        innerRadius={130}
                        outerRadius={170}
                        dataKey="value"
                       
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FinancialPieChart;
