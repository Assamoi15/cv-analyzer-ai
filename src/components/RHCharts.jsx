import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

function RHCharts() {

  const data = [
    { name: "Python", value: 95 },
    { name: "SQL", value: 80 },
    { name: "Docker", value: 65 },
    { name: "React", value: 55 },
  ];

  return (
    <div className="charts-grid">

      <div className="chart-card">
        <h2>Top Skills</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>Skill Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default RHCharts;