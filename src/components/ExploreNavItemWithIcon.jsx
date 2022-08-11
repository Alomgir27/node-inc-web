import React from 'react'
import { NavLink } from 'react-router-dom'

const ExploreNavItemWithIcon = ({ iconName, sub, sideNavLink, small, title }) => {
  return (
    <NavLink className={({ isActive }) => `item no-border d-flex ${isActive ? 'active' : ''}`} to={`/${sideNavLink}`}>
      <div className="img">
        <img src={`./assets/vectors/${iconName}.svg`} className="me-4" alt="" />
      </div>
      <div className="title">
        <div className="fs-14 fw-600">{title}</div>
        <div className="fs-12 fw-400 sub-title-text text-light-5">
          {sub}
        </div>
        {small && <div className="mt-1 title-label">{small}</div>}
      </div>
    </NavLink>
  )
}

export default ExploreNavItemWithIcon
