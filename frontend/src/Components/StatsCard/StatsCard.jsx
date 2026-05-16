import "./StatsCard.css"


function StatsCard({ number, label, sublabel, color }) {
  return (
    <div className="stat-card">
        <p className="stat-label">{label}</p>
      <p className="stat-number" style={{color: color}}>{number}</p>
      <p className="stat-sublabel">{sublabel}</p>
    </div>
  )
}

export default StatsCard;