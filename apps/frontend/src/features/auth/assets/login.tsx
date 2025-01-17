import React from 'react'

type IconLoginProps = {
  className?: string
}

const IconLogin: React.FC<IconLoginProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='157'
      height='204'
      viewBox='0 0 157 204'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <ellipse cx='78.5' cy='75.6387' rx='77.5867' ry='75.6387' fill='#D9D9D9' />
      <ellipse cx='78.5' cy='57.0199' rx='31.0347' ry='29.0918' fill='#979797' />
      <ellipse cx='78.5' cy='151.277' rx='53.7139' ry='52.3653' fill='#979797' />
    </svg>
  )
}

export default IconLogin
