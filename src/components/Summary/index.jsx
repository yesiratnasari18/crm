import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Card = ({ title, percentage, color, bgColor, onPercentageChange }) => {
    return (
        <div className={`shadow-md rounded-lg p-4 m-4 w-1/5 ${bgColor}`}>
            <h2 className="text-center text-lg font-bold mb-4">{title}</h2>
            <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                    stroke={color}
                    strokeDasharray={`${percentage}, 100`}
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage" fontSize="8">{percentage}%</text>
            </svg>
            <input
                type="range"
                min="0"
                max="100"
                value={percentage}
                onChange={(e) => onPercentageChange(e.target.value)}
                className="w-full mt-4"
            />
        </div>
    );
};

const App = () => {
    const [stages, setStages] = useState([
        { title: "Prospecting", percentage: 20, color: "#00bcd4", bgColor: "bg-pastel-blue" },
        { title: "Contacting", percentage: 40, color: "#8e44ad", bgColor: "bg-pastel-purple" },
        { title: "Discussion", percentage: 60, color: "#f39c12", bgColor: "bg-pastel-yellow" },
        { title: "Negotiation", percentage: 80, color: "#e74c3c", bgColor: "bg-pastel-red" },
        { title: "Complete", percentage: 100, color: "#2ecc71", bgColor: "bg-pastel-green" }
    ]);

    const handlePercentageChange = (index, newPercentage) => {
        const updatedStages = [...stages];
        updatedStages[index].percentage = newPercentage;
        setStages(updatedStages);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-wrap justify-center max-w-5xl">
                {stages.map((stage, index) => (
                    <Card
                        key={stage.title}
                        title={stage.title}
                        percentage={stage.percentage}
                        color={stage.color}
                        bgColor={stage.bgColor}
                        onPercentageChange={(newPercentage) => handlePercentageChange(index, newPercentage)}
                    />
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
