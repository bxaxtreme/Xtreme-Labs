import React from 'react';
import Link from 'next/link';
import { AnuragLabsLogo } from '@/components/AnuragLabsLogo';

interface FooterProps {
  suiteName: string;
  supportServerUrl?: string;
  githubUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  suiteName,
  supportServerUrl = 'https://discord.gg/anurag-bots',
  githubUrl = 'https://github.com/anurag/discord-bots'
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand-link">
              <div className="brand-avatar-wrap" style={{ width: 40, height: 40 }}>
                <AnuragLabsLogo size={40} useImage={true} />
                <span className="online-dot" />
              </div>
              <span className="brand-title-text" style={{ fontSize: '1.25rem' }}>
                <span>Anurag</span>
                <span className="brand-badge-pill">Labs</span>
              </span>
            </Link>
            <p>
              A premier fleet of specialized Discord bots designed for high-performance esports tournaments, automated community moderation, and lossless 24/7 audio streaming.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Our Bot Fleet</h4>
            <ul className="footer-links">
              <li><Link href="/bots/tourney" className="footer-link">TOURNEY - BY PRIME</Link></li>
              <li><Link href="/bots/shizuka" className="footer-link">Shizuka !!</Link></li>
              <li><Link href="/bots/ultra-music" className="footer-link">SONIC</Link></li>
              <li><Link href="/#bots" className="footer-link">Compare All Bots</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Ecosystem & Tools</h4>
            <ul className="footer-links">
              <li><Link href="/commands" className="footer-link">Slash Commands Suite</Link></li>
              <li><Link href="/playground" className="footer-link">Discord Live Studio</Link></li>
              <li><Link href="/guide" className="footer-link">Setup & Role Guide</Link></li>
              <li><Link href="/status" className="footer-link">Live System Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Support & Community</h4>
            <ul className="footer-links">
              {supportServerUrl && (
                <li>
                  <a
                    href={supportServerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Discord Support Server
                  </a>
                </li>
              )}
              {githubUrl && (
                <li>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    GitHub Source
                  </a>
                </li>
              )}
              <li>
                <a
                  href="https://discord.com/developers/applications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Discord Developer Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {suiteName}. Developed with Next.js.</p>
          <p>Not affiliated with Discord Inc. Discord is a registered trademark of Discord Inc.</p>
        </div>
      </div>
    </footer>
  );
};
