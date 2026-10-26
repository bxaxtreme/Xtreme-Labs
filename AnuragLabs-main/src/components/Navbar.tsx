'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnuragLabsLogo } from '@/components/AnuragLabsLogo';

interface NavbarProps {
  suiteName: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  supportServerUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  suiteName,
  theme,
  onToggleTheme,
  supportServerUrl = 'https://discord.gg/anurag-bots'
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [botsDropdownOpen, setBotsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="brand-link" onClick={() => setMobileOpen(false)}>
            <div className="brand-avatar-wrap">
              <AnuragLabsLogo size={34} useImage={true} />
              <span className="online-dot status-pulse" />
            </div>
            <span className="brand-title-text">
              <span>Anurag</span>
              <span className="brand-badge-pill">Labs</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            {/* Bots Dropdown on Desktop / Sublist on Mobile */}
            <li
              className="nav-item-has-dropdown"
              onMouseEnter={() => setBotsDropdownOpen(true)}
              onMouseLeave={() => setBotsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-link nav-dropdown-btn ${pathname.startsWith('/bots') ? 'active' : ''}`}
                onClick={() => setBotsDropdownOpen(!botsDropdownOpen)}
                aria-expanded={botsDropdownOpen}
              >
                <span>Bots</span>
                <svg className={`nav-chevron ${botsDropdownOpen ? 'rotated' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Floating Dropdown Card (Desktop) */}
              <div className={`nav-dropdown-menu ${botsDropdownOpen ? 'show' : ''}`}>
                <div className="nav-dropdown-header">Verified Fleet</div>
                <Link
                  href="/bots/tourney"
                  className="nav-dropdown-item"
                  onClick={() => { setBotsDropdownOpen(false); setMobileOpen(false); }}
                >
                  <span className="dropdown-dot" style={{ backgroundColor: '#FF4655' }} />
                  <div>
                    <div className="dropdown-title">TOURNEY - BY PRIME</div>
                    <div className="dropdown-desc">Esports, Scrims &amp; Brackets</div>
                  </div>
                </Link>
                <Link
                  href="/bots/shizuka"
                  className="nav-dropdown-item"
                  onClick={() => { setBotsDropdownOpen(false); setMobileOpen(false); }}
                >
                  <span className="dropdown-dot" style={{ backgroundColor: '#EB459E' }} />
                  <div>
                    <div className="dropdown-title">Shizuka !!</div>
                    <div className="dropdown-desc">AutoMod, Welcomer &amp; Leveling</div>
                  </div>
                </Link>
                <Link
                  href="/bots/ultra-music"
                  className="nav-dropdown-item"
                  onClick={() => { setBotsDropdownOpen(false); setMobileOpen(false); }}
                >
                  <span className="dropdown-dot" style={{ backgroundColor: '#57F287' }} />
                  <div>
                    <div className="dropdown-title">SONIC</div>
                    <div className="dropdown-desc">Lossless 320kbps Audio &amp; 24/7</div>
                  </div>
                </Link>
                <div className="nav-dropdown-divider" />
                <Link
                  href="/#bots"
                  className="nav-dropdown-item nav-dropdown-all"
                  onClick={() => { setBotsDropdownOpen(false); setMobileOpen(false); }}
                >
                  <span>Explore All Bots</span>
                  <span>→</span>
                </Link>
              </div>
            </li>

            <li>
              <Link
                href="/commands"
                className={`nav-link ${isActive('/commands') ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Commands
              </Link>
            </li>
            <li>
              <Link
                href="/playground"
                className={`nav-link ${isActive('/playground') ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Playground
              </Link>
            </li>
            <li>
              <Link
                href="/guide"
                className={`nav-link ${isActive('/guide') ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                href="/status"
                className={`nav-link ${isActive('/status') ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-status-indicator" />
                Status
              </Link>
            </li>

            {/* Mobile Drawer Support Link */}
            <li className="mobile-only-nav-item">
              <a
                href={supportServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block"
                onClick={() => setMobileOpen(false)}
              >
                Official Support Server ↗
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="btn-icon"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            {/* Quick Invite Button */}
            <Link href="/#bots" className="btn btn-primary nav-invite-btn" onClick={() => setMobileOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="nav-invite-text">Invite Bot</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile drawer */}
      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
    </>
  );
};
