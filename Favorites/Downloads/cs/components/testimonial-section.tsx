import "../styles/testimonial-section.css"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Developer",
    content:
      "Innovatrix has completely transformed my workflow. Having all these tools in one place saves me hours every week.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Sarah Chen",
    role: "UX Designer",
    content:
      "The designer suite is incredible! The color palette generator and font previewer have become essential parts of my design process.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Rodriguez",
    role: "Student",
    content:
      "As a computer science student, the developer tools have been invaluable for my projects. The free tier offers everything I need.",
    avatar: "/placeholder.svg",
  },
]

export default function TestimonialSection() {
  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">What Our Users Say</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-content">"{testimonial.content}"</div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

