import "../styles/feature-section.css"

const suiteFeatures = [
  {
    title: "Developer Suite",
    icon: "💻",
    description: "Essential tools for developers to streamline coding workflows",
    features: ["JSON/XML/YAML Formatter", "REST API Client", "Code Beautifier", "Base64 Encoder/Decoder"],
    proFeatures: ["JWT Decoder", "Regex Tester", "API Rate Limits Increase"],
  },
  {
    title: "Student Suite",
    icon: "🎓",
    description: "Tools designed for academic success and productivity",
    features: ["Unit & Currency Converter", "Markdown Editor", "Timer & Pomodoro", "Notepad"],
    proFeatures: ["PDF Tools", "Random Name Generator", "Enhanced Summarization"],
  },
  {
    title: "Office Suite",
    icon: "💼",
    description: "Boost your productivity with essential office tools",
    features: ["CSV ↔ Excel Converter", "JSON ↔ Table Viewer", "Text Summarizer"],
    proFeatures: ["Secure Notes", "File Converter", "Email Header Parser"],
  },
  {
    title: "Designer Suite",
    icon: "🎨",
    description: "Creative tools for designers and content creators",
    features: ["Color Palette Generator", "QR Code Generator", "Font Previewer"],
    proFeatures: ["Image Converter", "Favicon Generator", "Vector to Raster Conversion"],
  },
  {
    title: "Network & Security Suite",
    icon: "🌐",
    description: "Essential tools for network diagnostics and security",
    features: ["IP & DNS Lookup", "Password Generator"],
    proFeatures: ["Ping/Traceroute", "Hash Generator", "WHOIS Lookup"],
  },
]

export default function FeatureSection() {
  return (
    <div className="feature-section">
      <h2 className="feature-section-title">Why Choose Innovatrix?</h2>
      <div className="feature-grid">
        {suiteFeatures.map((suite, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-header">
              <div className="feature-icon">{suite.icon}</div>
              <h3 className="feature-title">{suite.title}</h3>
            </div>
            <p className="feature-description">{suite.description}</p>
            <div className="feature-tiers">
              <div className="feature-tier free">
                <h4 className="tier-title">Free</h4>
                <ul className="feature-list">
                  {suite.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-tier pro">
                <h4 className="tier-title">Pro</h4>
                <ul className="feature-list">
                  {suite.proFeatures.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

