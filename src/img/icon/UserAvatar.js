import React from 'react'

const UserAvatar = ({ className }) => (
  <svg className={className}width="171" height="171" viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="171" height="171">
        <circle cx="85.5" cy="85.5" r="84" fill="white" stroke="#5E97F3" stroke-width="3"/>
      </mask>
      <g mask="url(#mask0)">
        <rect y="-1" width="171" height="172" fill="#C4C4C4"/>
        <circle cx="85.5" cy="85.5" r="85.5" fill="white"/>
        <rect y="-1" width="171" height="172" fill="white"/>
        <path d="M127.294 61.0294C127.294 83.6893 108.806 102.059 86 102.059C63.1939 102.059 44.7059 83.6893 44.7059 61.0294C44.7059 38.3695 63.1939 20 86 20C108.806 20 127.294 38.3695 127.294 61.0294Z" fill="#C1CFE0"/>
        <path d="M53.8288 108.9C44.5632 115.52 38.5294 126.324 38.5294 138.529V175H133.471V138.529C133.471 126.324 127.437 115.52 120.171 108.9C108.31 116.065 97.152 120.294 86 120.294C75.848 120.294 63.6902 116.065 53.8288 108.9Z" fill="#C1CFE0"/>
        <circle cx="85.5" cy="85.5" r="84" stroke="#5E97F3" stroke-width="3"/>
      </g>
    </svg>
)
export default UserAvatar
