import "../styles/dashboard-overview.css"

export default function DashboardOverview() {
  return (
    <div className="overview-container">
      <div className="overview-card current-plan">
        <h2 className="card-title">Current Plan</h2>
        <div className="plan-details">
          <div className="plan-name">Free Tier</div>
          <div className="plan-description">Access to essential tools</div>
          <button className="upgrade-button">Upgrade to Pro</button>
        </div>
      </div>

      <div className="overview-card usage-overview">
        <h2 className="card-title">Usage Overview</h2>
        <div className="usage-chart">
          <div className="chart-icon">📊</div>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: "60%" }}></div>
            <div className="chart-bar" style={{ height: "80%" }}></div>
            <div className="chart-bar" style={{ height: "40%" }}></div>
            <div className="chart-bar" style={{ height: "70%" }}></div>
            <div className="chart-bar" style={{ height: "50%" }}></div>
          </div>
        </div>
      </div>

      <div className="overview-card tools-used">
        <h2 className="card-title">Most Used Tools</h2>
        <ul className="tools-list">
          <li className="tool-item">
            <span className="tool-name">JSON Formatter</span>
            <span className="tool-count">32 uses</span>
          </li>
          <li className="tool-item">
            <span className="tool-name">Password Generator</span>
            <span className="tool-count">18 uses</span>
          </li>
          <li className="tool-item">
            <span className="tool-name">Color Palette</span>
            <span className="tool-count">15 uses</span>
          </li>
        </ul>
      </div>

      <div className="overview-card recent-activity">
        <h2 className="card-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-time">2 hours ago</div>
            <div className="activity-description">Used JSON Formatter</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">Yesterday</div>
            <div className="activity-description">Generated QR Code</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">2 days ago</div>
            <div className="activity-description">Used Markdown Editor</div>
          </div>
        </div>
      </div>
    </div>
  )
}

