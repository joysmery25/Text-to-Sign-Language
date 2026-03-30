import React from 'react'

export default function Avatar({size = 160}){
  return (
    <div className="flex items-center justify-center">
      <div className="avatar-box" style={{width: size, height: size}}>
        <div className="avatar-face">
          <div className="eye left" />
          <div className="eye right" />
          <div className="mouth" />
        </div>
        <div className="avatar-hand" />
      </div>
    </div>
  )
}
