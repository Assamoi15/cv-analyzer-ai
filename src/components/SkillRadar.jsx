import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

function SkillRadar({ skills }) {

  const defaultSkills = [
    { skill: "Python", value: 90 },
    { skill: "SQL", value: 75 },
    { skill: "ML", value: 85 },
    { skill: "Java", value: 70 },
    { skill: "React", value: 65 },
  ];

  const data = skills && skills.length > 0 ? skills : defaultSkills;

  return (

    <div className="radar-container">

      <h3>📊 Analyse Compétences</h3>

      <RadarChart
        outerRadius={80}
        width={350}
        height={250}
        data={data}
      >
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={false} 
          axisLine={false} 
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="var(--accent-primary)"
          fill="var(--accent-primary)"
          fillOpacity={0.5}
        />
      </RadarChart>

    </div>
  );
}

export default SkillRadar;