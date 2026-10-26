'use client';

import React from 'react';
import Link from 'next/link';
import { AnuragLabsLogo } from '@/components/AnuragLabsLogo';
import { ecosystemInfo, initialBotsList } from '@/config/botsData';

interface HeroProps {
  totalBotsCount: number;
  supportServerUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ totalBotsCount, supportServerUrl }) => {
  return (
    <header className="hero-section">
      <div className="container">
        {/* Status Pill */}
        <div className="hero-pill">
          <AnuragLabsLogo size={20} useImage={true} />
          <span className="hero-pill-status" />
          <span className="hero-pill-text">Official Fleet • {totalBotsCount} Verified Bots Ready to Deploy</span>
        </div>

        {/* Clean, Solid-Ink Roman Headline (Anti-AI-Slop) */}
        <h1 className="hero-title">
          Scale &amp; Elevate Your Discord Server<br />
          <span className="hero-title-accent">With AnuragLabs</span>
        </h1>

        {/* Honest, Domain-Specific Copy */}
        <p className="hero-subtitle">
          Direct 1-click invite links for competitive esports scrims, heuristic community auto-moderation, and studio-grade 320kbps voice audio streaming. Zero configuration needed to get started.
        </p>

        {/* Action Buttons */}
        <div className="hero-ctas">
          <a href="#bots" className="btn btn-primary btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Choose &amp; Add Bot
          </a>

          <Link href="/playground" className="btn btn-secondary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Test in Live Studio
          </Link>

          <Link href="/commands" className="btn btn-outline btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            Slash Commands
          </Link>
        </div>

        {/* Quick Bot Switcher Strip */}
        <div className="hero-bot-selector-strip">
          <span className="strip-label">Direct Bot Profiles:</span>
          <div className="hero-bot-mini-pills">
            {initialBotsList.map((b) => (
              <Link
                key={b.id}
                href={`/bots/${b.id}`}
                className="hero-bot-pill"
                style={{ '--bot-accent': b.accentColor } as React.CSSProperties}
              >
                <img src={b.avatar} alt={b.name} className="hero-pill-avatar" />
                <span className="hero-pill-name">{b.name}</span>
                <span className="hero-pill-tag">{b.category}</span>
                <span className="hero-pill-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fleet Live Metrics (Honest data from ecosystemInfo) */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">{totalBotsCount}</span>
            <span className="stat-label">Specialized Bots</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{ecosystemInfo.stats.totalServers}</span>
            <span className="stat-label">Active Servers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{ecosystemInfo.stats.totalUsers}</span>
            <span className="stat-label">Total Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{ecosystemInfo.stats.uptime}</span>
            <span className="stat-label">Uptime Guarantee</span>
          </div>
        </div>
      </div>
    </header>
  );
};
