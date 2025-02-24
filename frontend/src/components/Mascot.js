// Mascot.js
import React from 'react'

const Mascot = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem',
      }}
    >
      <svg
        width='256'
        height='256'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
        style={{ imageRendering: 'pixelated' }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .pixel { shape-rendering: crispEdges; }
              .bubble { fill: #ffffff; stroke: #000000; stroke-width: 0.1; }
              .text { font-family: 'Courier New', monospace; font-size: 1.5px; fill: #000000; }
            `,
          }}
        />
        {/* Dog Pixel Art */}
        {/* Head background */}
        <rect
          x='8'
          y='8'
          width='16'
          height='16'
          fill='#ffffff'
          className='pixel'
        />
        {/* Ears */}
        <rect
          x='7'
          y='6'
          width='3'
          height='3'
          fill='#ffffff'
          className='pixel'
        />
        <rect
          x='22'
          y='6'
          width='3'
          height='3'
          fill='#ffffff'
          className='pixel'
        />
        {/* Eyes */}
        <rect
          x='12'
          y='12'
          width='2'
          height='2'
          fill='#000000'
          className='pixel'
        />
        <rect
          x='18'
          y='12'
          width='2'
          height='2'
          fill='#000000'
          className='pixel'
        />
        {/* Nose */}
        <rect
          x='15'
          y='17'
          width='2'
          height='2'
          fill='#000000'
          className='pixel'
        />
        {/* Mouth */}
        <rect
          x='14'
          y='19'
          width='4'
          height='1'
          fill='#000000'
          className='pixel'
        />
        {/* Golden details */}
        <rect
          x='10'
          y='10'
          width='1'
          height='1'
          fill='#ffd700'
          className='pixel'
        />
        <rect
          x='21'
          y='10'
          width='1'
          height='1'
          fill='#ffd700'
          className='pixel'
        />

        {/* Speech Bubble */}
        <rect
          x='0'
          y='0'
          width='20'
          height='8'
          rx='1'
          ry='1'
          className='bubble'
        />
        <polygon
          points='10,8 12,8 11,10'
          fill='#ffffff'
          stroke='#000000'
          strokeWidth='0.1'
          className='pixel'
        />
        <text x='10' y='5' textAnchor='middle' className='text'>
          Junior Says Hi
        </text>
      </svg>
    </div>
  )
}

export default Mascot
