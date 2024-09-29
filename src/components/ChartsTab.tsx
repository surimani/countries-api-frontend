import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Loader from './Loader'; 
import { getRandomColor } from '../utils/Util';

interface ChartsTabProps {
  countries: any[];
}

//Tab to show Charts specific to country data
const ChartsTab: React.FC<ChartsTabProps> = ({ countries }) => {
  const PIECHART_COLORS = ["#3e5bff", "#28a755", "#aab466", "#6f42c1", "#17a2a", "#ff55aa"];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // population by country Bar Chart
  const populationData = countries.map((country) => ({
    name: country.name,
    population: country.population,
  })).sort((a, b) => b.population - a.population).slice(0, 30);

  // Region countries count Pie Chart
  const regionCounts: { [key: string]: number } = {};
  countries.forEach((country) => {
    const region = country.region || 'Unknown';
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });
  const regionData = Object.keys(regionCounts).map((region) => ({
    name: region,
    value: regionCounts[region],
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-4xl underline font-semibold mb-4">Charts</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Population by Country (Top 30)</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={populationData} margin={{ top: 20, right: 30, left: 35, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="population" fill={getRandomColor()}>
                    {populationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRandomColor()} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
      </div> 

      <div>
        <h3 className="text-lg font-medium mb-2">Region Countries Count Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={regionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                    {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIECHART_COLORS[index % PIECHART_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsTab;
