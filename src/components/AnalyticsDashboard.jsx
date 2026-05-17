import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

function AnalyticsDashboard({ candidates }) {

  if (!candidates || candidates.length === 0)
    return null;

  // =========================
  // BAR CHART DATA
  // =========================

  const scoreData = candidates.map(
    (c) => ({
      name:
        c.candidate_name ||
        c.name ||
        "Candidate",

      score: c.score
    })
  );

  // =========================
  // PIE CHART DATA
  // =========================

  const levels = {
    Junior: 0,
    "Mid-Level": 0,
    Senior: 0
  };

  candidates.forEach((c) => {

    if (levels[c.level] !== undefined) {

      levels[c.level]++;
    }
  });

  const pieData = Object.keys(levels).map(
    (key) => ({
      name: key,
      value: levels[key]
    })
  );

  // =========================
  // TOP SKILLS
  // =========================

  const skillCount = {};

  candidates.forEach((c) => {

    if (c.skills) {

      c.skills.forEach((skill) => {

        skillCount[skill] =
          (skillCount[skill] || 0) + 1;
      });
    }
  });

  const skillData = Object.keys(
    skillCount
  ).map((skill) => ({
    skill,
    count: skillCount[skill]
  }));

  // =========================
  // COLORS
  // =========================

  const COLORS = [
    "#6c63ff",
    "#10b981",
    "#f59e0b"
  ];

  return (

    <div className="analytics-dashboard">

      <h2>
        📊 AI CV Ranking Dashboard
      </h2>

      {/* ========================= */}
      {/* BAR CHART */}
      {/* ========================= */}

      <div className="chart-card">

        <h3>
          📈 Candidate Scores
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={scoreData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="score" />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* ========================= */}
      {/* PIE CHART */}
      {/* ========================= */}

      <div className="chart-card">

        <h3>
          🧠 Candidate Levels
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >

              {pieData.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* ========================= */}
      {/* AREA CHART */}
      {/* ========================= */}

      <div className="chart-card">

        <h3>
          🚀 Top Skills
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <AreaChart data={skillData}>

            <XAxis dataKey="skill" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="count"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsDashboard;