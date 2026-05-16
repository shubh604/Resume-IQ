import "./ProgressBar.css"

function ProgressBar({ label, value, color }) {
  return (
    <div className="progress-item">
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%`, background: color }}></div>
      </div>
    </div>
  )
}

export default ProgressBar;