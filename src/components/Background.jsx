const circuitPaths = [
  { d: 'M 80 120 L 200 120 L 250 170 L 250 280', delay: 0 },
  { d: 'M 120 70 L 120 200 L 170 250 L 280 250', delay: 0.5 },
  { d: 'M 300 160 L 250 160 L 220 190 L 220 300', delay: 1 },
  { d: 'M 920 180 L 780 180 L 730 230 L 730 350 L 680 400', delay: 1.5 },
  { d: 'M 880 80 L 880 250 L 830 300 L 750 300', delay: 2 },
  { d: 'M 100 720 L 250 720 L 300 670 L 450 670', delay: 2.5 },
  { d: 'M 900 680 L 700 680 L 650 630 L 500 630', delay: 3 },
  { d: 'M 300 780 L 300 650 L 380 570 L 500 570', delay: 0.8 },
  { d: 'M 50 450 L 200 450 L 280 370 L 450 370 L 500 320', delay: 3.5 },
  { d: 'M 950 450 L 750 450 L 680 380 L 550 380 L 500 430', delay: 1.2 },
  { d: 'M 400 100 L 400 300 L 450 350 L 450 500', delay: 4 },
  { d: 'M 600 50 L 600 200 L 550 250 L 550 450', delay: 2.2 },
  { d: 'M 80 600 L 200 600 L 250 550 L 450 550', delay: 4.5 },
  { d: 'M 920 550 L 800 550 L 750 500 L 600 500', delay: 3.2 },
]

const nodes = [
  { cx: 80, cy: 120 }, { cx: 200, cy: 120 }, { cx: 250, cy: 170 }, { cx: 250, cy: 280 },
  { cx: 120, cy: 70 }, { cx: 120, cy: 200 }, { cx: 170, cy: 250 }, { cx: 280, cy: 250 },
  { cx: 300, cy: 160 }, { cx: 220, cy: 190 }, { cx: 220, cy: 300 },
  { cx: 920, cy: 180 }, { cx: 780, cy: 180 }, { cx: 730, cy: 230 }, { cx: 730, cy: 350 }, { cx: 680, cy: 400 },
  { cx: 880, cy: 80 }, { cx: 880, cy: 250 }, { cx: 830, cy: 300 }, { cx: 750, cy: 300 },
  { cx: 100, cy: 720 }, { cx: 250, cy: 720 }, { cx: 300, cy: 670 }, { cx: 450, cy: 670 },
  { cx: 900, cy: 680 }, { cx: 700, cy: 680 }, { cx: 650, cy: 630 }, { cx: 500, cy: 630 },
  { cx: 300, cy: 780 }, { cx: 380, cy: 570 }, { cx: 500, cy: 570 },
  { cx: 50, cy: 450 }, { cx: 200, cy: 450 }, { cx: 280, cy: 370 }, { cx: 450, cy: 370 }, { cx: 500, cy: 320 },
  { cx: 950, cy: 450 }, { cx: 750, cy: 450 }, { cx: 680, cy: 380 }, { cx: 550, cy: 380 }, { cx: 500, cy: 430 },
  { cx: 400, cy: 100 }, { cx: 400, cy: 300 }, { cx: 450, cy: 350 }, { cx: 450, cy: 500 },
  { cx: 600, cy: 50 }, { cx: 600, cy: 200 }, { cx: 550, cy: 250 }, { cx: 550, cy: 450 },
  { cx: 80, cy: 600 }, { cx: 200, cy: 600 }, { cx: 250, cy: 550 }, { cx: 450, cy: 550 },
  { cx: 920, cy: 550 }, { cx: 800, cy: 550 }, { cx: 750, cy: 500 }, { cx: 600, cy: 500 },
]

const floatingParticles = [
  { left: '8%', delay: 0, duration: 10 },
  { left: '20%', delay: 1.5, duration: 13 },
  { left: '35%', delay: 3, duration: 11 },
  { left: '50%', delay: 0.8, duration: 14 },
  { left: '62%', delay: 2.5, duration: 9 },
  { left: '75%', delay: 4, duration: 12 },
  { left: '85%', delay: 1.2, duration: 11 },
  { left: '92%', delay: 3.5, duration: 10 },
  { left: '15%', delay: 5, duration: 13 },
  { left: '45%', delay: 2, duration: 8 },
  { left: '68%', delay: 4.5, duration: 12 },
  { left: '55%', delay: 6, duration: 10 },
]

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundColor: '#070d1f' }} />

      <div
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 opacity-[0.06]"
        style={{
          width: '1000px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, #4edea3 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] opacity-[0.04]"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle at center, #0566d9 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(78,222,163,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(78,222,163,0.8) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {circuitPaths.map((path, i) => (
          <path
            key={`glow-${i}`}
            d={path.d}
            fill="none"
            stroke="#4edea3"
            strokeWidth="4"
            strokeOpacity="0.06"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {circuitPaths.map((path, i) => (
          <path
            key={`trace-${i}`}
            d={path.d}
            fill="none"
            stroke="#4edea3"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {circuitPaths.map((path, i) => (
          <path
            key={`flow-${i}`}
            d={path.d}
            fill="none"
            stroke="#4edea3"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="4 14"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-data-flow"
            style={{ animationDelay: `${path.delay}s` }}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="none"
              stroke="#4edea3"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="1.5"
              fill="#4edea3"
              fillOpacity="0.35"
              className="animate-node-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          </g>
        ))}
      </svg>

      {floatingParticles.map((p, i) => (
        <div
          key={`float-${i}`}
          className="absolute w-[2px] h-[2px] rounded-full animate-float-particle"
          style={{
            left: p.left,
            bottom: '-10px',
            backgroundColor: i % 3 === 0 ? '#4edea3' : '#adc6ff',
            opacity: 0.15 + (i % 3) * 0.1,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(7,13,31,0.5) 100%)',
        }}
      />
    </div>
  )
}
