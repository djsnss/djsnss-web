import "../styles/suite-marquee.css"

const suites = [
  { name: "General", icon: "👤" },
  { name: "Developer", icon: "💻" },
  { name: "Student", icon: "🎓" },
  { name: "Office", icon: "💼" },
  { name: "Designer", icon: "🎨" },
  { name: "Network", icon: "🌐" },
]

export default function SuiteMarquee() {
  return (
    <div className="suite-marquee-container">
      <h2 className="suite-marquee-title">Tailored for Everyone</h2>
      <div className="marquee">
        <div className="marquee-content">
          {[...suites, ...suites].map((suite, index) => (
            <div className="suite-item" key={index}>
              <div className="suite-icon">{suite.icon}</div>
              <span className="suite-name">{suite.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

