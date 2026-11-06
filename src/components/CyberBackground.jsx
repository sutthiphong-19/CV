const towers = [
  [6, 30, 46, 0.2],
  [12, 18, 70, 1.5],
  [19, 38, 52, 2.8],
  [27, 24, 86, 0.8],
  [35, 42, 58, 3.4],
  [44, 16, 76, 2.1],
  [52, 34, 94, 4.1],
  [61, 20, 62, 1.1],
  [69, 40, 82, 3.1],
  [77, 26, 54, 0.4],
  [85, 36, 72, 2.4],
  [93, 22, 48, 3.8],
];

const particles = [
  [7, 18, 0.2, 5], [14, 64, 1.7, 4], [21, 37, 3.2, 3],
  [29, 79, 0.9, 5], [34, 23, 4.1, 3], [41, 55, 2.4, 4],
  [48, 12, 1.1, 3], [54, 72, 3.8, 5], [62, 31, 0.5, 4],
  [68, 87, 2.9, 3], [74, 46, 4.6, 5], [81, 16, 1.4, 4],
  [88, 69, 3.5, 3], [94, 35, 2.1, 5], [17, 91, 4.3, 3],
  [38, 87, 1.9, 4], [58, 48, 4.8, 3], [72, 7, 2.7, 4],
];

function CyberBackground() {
  return (
    <div className="cyber-background" aria-hidden="true">
      <div className="cyber-background__noise" />
      <div className="cyber-background__aurora cyber-background__aurora--one" />
      <div className="cyber-background__aurora cyber-background__aurora--two" />
      <div className="cyber-background__sun">
        <span />
        <span />
        <span />
      </div>
      <div className="cyber-background__grid" />

      <div className="cyber-background__city">
        {towers.map(([left, width, height, delay], index) => (
          <span
            className="cyber-tower"
            key={`${left}-${height}`}
            style={{
              "--tower-left": `${left}%`,
              "--tower-width": `${width}px`,
              "--tower-height": `${height}px`,
              "--tower-delay": `${delay}s`,
              "--tower-depth": `${14 + (index % 4) * 5}px`,
            }}
          />
        ))}
      </div>

      <div className="cyber-background__particles">
        {particles.map(([left, top, delay, size]) => (
          <span
            key={`${left}-${top}`}
            style={{
              "--particle-left": `${left}%`,
              "--particle-top": `${top}%`,
              "--particle-delay": `${delay}s`,
              "--particle-size": `${size}px`,
            }}
          />
        ))}
      </div>

      <div className="cyber-background__vignette" />
    </div>
  );
}

export default CyberBackground;
