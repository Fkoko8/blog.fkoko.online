interface RouteThumbnailProps {
  seed?: string;
  distance?: number;
  elevation?: number;
  className?: string;
}

export default function RouteThumbnail({ seed = 'route', distance = 20, elevation = 500, className }: RouteThumbnailProps) {
  const seedNum = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const points: string[] = [];
  const numPoints = 24;
  const width = 120;
  const height = 80;

  for (let i = 0; i < numPoints; i++) {
    const x = (i / (numPoints - 1)) * width;
    const baseY = height / 2;
    const variance = Math.sin(i * 0.5 + seedNum) * (elevation / 30);
    const trend = Math.sin(i * 0.15) * (distance / 8);
    const y = baseY + variance + trend;
    points.push(`${x.toFixed(1)},${Math.max(5, Math.min(height - 5, y)).toFixed(1)}`);
  }

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className || 'w-full h-full'}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${seed})`} />
      <path d={pathD} fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => {
        if (i === 0 || i === numPoints - 1) {
          const [x, y] = p.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="2.5" fill="hsl(var(--accent))" />;
        }
        return null;
      })}
    </svg>
  );
}
