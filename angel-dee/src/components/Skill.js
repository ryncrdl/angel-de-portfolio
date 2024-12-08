import React from "react"

const Skill = ({ title, icon }) => {
  return (
    <div className="skill-container">
      <img src={icon} alt={title} />
      <span>{title}</span>
    </div>
  )
}

export default Skill
