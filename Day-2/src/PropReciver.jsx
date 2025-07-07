import React from 'react'

export const PropReciver = ({Sending}) => {
  return (
    <div>
        <p>PropReciver</p>
        <p>{Sending.name}</p>
        <p>{Sending.role}</p>
        <p>{Sending.age}</p>
    </div>
  )
}
