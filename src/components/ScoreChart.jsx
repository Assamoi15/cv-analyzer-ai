import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ScoreChart({ history }) {
  const data = history.length > 0 ? history : [
    { day: "Lun", score: 40 },
    { day: "Mar", score: 65 },
    { day: "Mer", score: 50 },
    { day: "Jeu", score: 85 },
    { day: "Ven", score: 70 },
    { day: "Sam", score: 90 },
    { day: "Dim", score: 95 },
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4338ca" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              padding: '12px'
            }} 
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#4338ca"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorScore)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScoreChart;