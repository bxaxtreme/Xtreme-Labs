import React from 'react';

interface AnuragLabsLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  useImage?: boolean;
}

export const AnuragLabsLogo: React.FC<AnuragLabsLogoProps> = ({
  size = 32,
  showText = false,
  className = '',
  useImage = false
}) => {
  return (
    <div
      className={`anuraglabs-brand-lockup ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
    >
      {useImage ? (
        <img
          src="/images/anuraglabs-logo.jpg"
          alt="AnuragLabs Emblem"
          className="anuraglabs-logo-img"
          style={{
            width: size,
            height: size,
            borderRadius: '10px',
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(88, 101, 242, 0.35)',
            border: '1px solid rgba(88, 101, 242, 0.4)'
          }}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="anuraglabs-logo-svg"
          style={{ flexShrink: 0 }}
        >
          <defs>
            {/* Background Squircle Gradient */}
            <linearGradient id="al-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141729" />
              <stop offset="100%" stopColor="#0B0D18" />
            </linearGradient>

            {/* Indigo / Blurple Accent */}
            <linearGradient id="al-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7289DA" />
              <stop offset="50%" stopColor="#5865F2" />
              <stop offset="100%" stopColor="#4350DB" />
            </linearGradient>

            {/* Cyan Energy Gradient */}
            <linearGradient id="al-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="al-core-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Squircle Housing with subtle border */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="url(#al-bg-grad)"
            stroke="url(#al-primary-grad)"
            strokeWidth="1.5"
          />

          {/* Precision Beaker Flask Silhouette (Left / Core) */}
          <path
            d="M21 15H17V17.5L11.5 28.5C10.5 30.5 12 33 14.3 33H23.7C26 33 27.5 30.5 26.5 28.5L21 17.5V15Z"
            stroke="url(#al-cyan-grad)"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Flask Lip */}
          <path
            d="M15.5 15H22.5"
            stroke="url(#al-cyan-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right "A" Beam Stem */}
          <path
            d="M21 15L35 37"
            stroke="url(#al-primary-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Right Inner Accent Slit */}
          <line
            x1="27"
            y1="22"
            x2="33"
            y2="33"
            stroke="url(#al-cyan-grad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Quantum Energy Core inside Flask */}
          <g filter="url(#al-core-glow)">
            {/* Orbital Ring */}
            <ellipse
              cx="19"
              cy="27"
              rx="4"
              ry="2"
              transform="rotate(-25 19 27)"
              stroke="#00F0FF"
              strokeWidth="1.2"
              fill="none"
            />
            <ellipse
              cx="19"
              cy="27"
              rx="4"
              ry="2"
              transform="rotate(35 19 27)"
              stroke="#00F0FF"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Center Core Spark */}
            <circle cx="19" cy="27" r="1.4" fill="#FFFFFF" />
          </g>
        </svg>
      )}

      {showText && (
        <span className="anuraglabs-wordmark">
          <span className="wordmark-anurag">Anurag</span>
          <span className="wordmark-labs">Labs</span>
        </span>
      )}
    </div>
  );
};
