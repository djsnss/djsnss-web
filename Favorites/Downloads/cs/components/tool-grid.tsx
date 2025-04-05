import "../styles/tool-grid.css"

interface Tool {
  name: string
  icon: string
  description: string
}

interface ToolGridProps {
  tools: Tool[]
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="tool-grid">
      {tools.map((tool, index) => (
        <div className="tool-card" key={index}>
          <div className="tool-icon">{tool.icon}</div>
          <h3 className="tool-name">{tool.name}</h3>
          <p className="tool-description">{tool.description}</p>
          <button className="use-tool-button">Use Tool</button>
        </div>
      ))}
    </div>
  )
}

