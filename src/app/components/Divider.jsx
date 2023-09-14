import React from 'react'

export default function Divider({ dark }) {
  return (
    <div className={dark ? 'divider_black' : 'divider_white'} style={{ margin: "50px 0" }}></div>
  )
}
