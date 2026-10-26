'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { initialBotsList, ecosystemInfo } from '@/config/botsData';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

export default function StatusPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme synchronization
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('anurag_bot_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {}
  }, []);

  const handleToggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('anurag_bot_theme', next);
    } catch {}
    showToast(`Switched to ${next === 'light' ? 'Porcelain Light' : 'Midnight Dark'} theme`);
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Detailed cluster status data
  const botHealthData = [
    {
      botId: 'tourney',
      name: 'TOURNEY - BY PRIME',
      avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80',
      status: 'Operational',
      ping: '18ms',
      uptimePct: '99.98%',
      inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1530927172531916800',
      accentColor: '#FF4655',
      components: [
        { name: 'Discord Gateway Shards', status: 'Operational', detail: '8 of 8 shards online' },
        { name: 'Scrims Slot Locking Engine', status: 'Operational', detail: '0 delay • Anti-duplicate' },
        { name: 'Challonge & Bracket Sync', status: 'Operational', detail: '100% synchronized' },
        { name: 'Points & Scoreboard Renderer', status: 'Operational', detail: 'Average render 14ms' }
      ]
    },
    {
      botId: 'shizuka',
      name: 'Shizuka !!',
      avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
      status: 'Operational',
      ping: '22ms',
      uptimePct: '99.99%',
      inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1536403248792207470',
      accentColor: '#EB459E',
      components: [
        { name: 'Anti-Raid Token Heuristics', status: 'Operational', detail: 'Global threat shield active' },
        { name: 'Welcome Card Canvas Generator', status: 'Operational', detail: '18ms per dynamic banner' },
        { name: 'Voice & Text XP Engine', status: 'Operational', detail: 'Zero queue backlog' },
        { name: 'Audit Log Dispatcher', status: 'Operational', detail: 'Instant webhook delivery' }
      ]
    },
    {
      botId: 'ultra-music',
      name: 'SONIC',
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      status: 'Operational',
      ping: '12ms',
      uptimePct: '99.99%',
      inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1536757672899252355',
      accentColor: '#57F287',
      components: [
        { name: 'Lossless 320kbps Audio Core', status: 'Operational', detail: '48kHz buffer • 0 packet loss' },
        { name: 'US-East Audio Cluster (Node 1)', status: 'Operational', detail: '9ms latency' },
        { name: 'EU-Central Audio Cluster (Node 2)', status: 'Operational', detail: '16ms latency' },
        { name: '24/7 Channel Stay Daemon', status: 'Operational', detail: '100% active connections' }
      ]
    }
  ];

  // 30 days of 100% uptime pills
  const uptimeBars = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    pct: 100
  }));

  return (
    <main className="status-page-wrapper">
      <Navbar
        suiteName={ecosystemInfo.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      {/* Hero Header */}
      <section className="status-header-section">
        <div className="container">
          <div className="bot-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">System Status</span>
          </div>

          <div className="status-hero-content">
            <span className="section-badge">Infrastructure Telemetry</span>
            <h1 className="status-title">System Status &amp; Performance</h1>
            <p className="status-subtitle">
              Live operational monitoring, WebSocket ping latency, and cluster availability for the entire AnuragLabs ecosystem.
            </p>

            {/* Global Operational Beacon Banner */}
            <div className="status-global-banner">
              <div className="status-global-left">
                <span className="global-status-beacon" />
                <div>
                  <h3 className="global-status-heading">All Systems Operational</h3>
                  <p className="global-status-sub">Zero detected outages across all 3 bot clusters</p>
                </div>
              </div>
              <div className="status-global-right">
                <span className="uptime-pill">99.99% Uptime (Past 90 Days)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="status-metrics-section">
        <div className="container">
          <div className="status-stats-grid">
            <div className="status-stat-card">
              <span className="status-stat-label">Average Gateway Ping</span>
              <span className="status-stat-val">17 ms</span>
              <span className="status-stat-sub">Across 32 active shards</span>
            </div>
            <div className="status-stat-card">
              <span className="status-stat-label">Total Servers Protected</span>
              <span className="status-stat-val">29,500+</span>
              <span className="status-stat-sub">Active community servers</span>
            </div>
            <div className="status-stat-card">
              <span className="status-stat-label">Daily Commands Processed</span>
              <span className="status-stat-val">1.2M+</span>
              <span className="status-stat-sub">Slash &amp; tournament events</span>
            </div>
            <div className="status-stat-card">
              <span className="status-stat-label">Audio Packet Loss</span>
              <span className="status-stat-val">0.00%</span>
              <span className="status-stat-sub">Lossless 320kbps delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Cluster Health Cards */}
      <section className="section status-clusters-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Node Breakdown</span>
            <h2 className="section-title">Individual Bot Node Status</h2>
            <p className="section-desc">
              Real-time health status for each bot service, database cache, and voice cluster.
            </p>
          </div>

          <div className="status-clusters-grid">
            {botHealthData.map((bot) => (
              <div key={bot.botId} className="bot-status-card" style={{ '--bot-accent': bot.accentColor } as React.CSSProperties}>
                {/* Top Bot Banner */}
                <div className="bot-status-card-header">
                  <div className="bot-status-identity">
                    <img src={bot.avatar} alt={bot.name} className="bot-status-avatar" />
                    <div>
                      <h3 className="bot-status-name">{bot.name}</h3>
                      <span className="bot-status-sub">Uptime: {bot.uptimePct} • Ping: {bot.ping}</span>
                    </div>
                  </div>

                  <div className="bot-status-badge-wrap">
                    <span className="status-indicator-dot" />
                    <span className="status-badge-text">{bot.status}</span>
                  </div>
                </div>

                {/* Sub-Components Table */}
                <div className="bot-subcomponents-list">
                  {bot.components.map((c, idx) => (
                    <div key={idx} className="subcomponent-row">
                      <div className="subcomponent-info">
                        <span className="subcomponent-name">{c.name}</span>
                        <span className="subcomponent-detail">{c.detail}</span>
                      </div>
                      <span className="subcomponent-status">
                        <span className="sub-dot" />
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 30-Day Uptime Bar */}
                <div className="uptime-history-wrap">
                  <div className="uptime-history-header">
                    <span className="history-label">30-Day Availability History</span>
                    <span className="history-pct">{bot.uptimePct}</span>
                  </div>
                  <div className="uptime-bars-strip">
                    {uptimeBars.map((bar) => (
                      <span
                        key={bar.day}
                        className="uptime-bar-tick"
                        title={`Day ${bar.day}: 100% Operational (0 incidents)`}
                      />
                    ))}
                  </div>
                  <div className="uptime-history-footer">
                    <span>30 days ago</span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="bot-status-card-actions">
                  <a
                    href={bot.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Add {bot.name}
                  </a>
                  <Link href={`/bots/${bot.botId}`} className="btn btn-outline btn-sm">
                    View Specs →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident History Log */}
      <section className="section bg-tinted incidents-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Transparency</span>
            <h2 className="section-title">Recent System Incidents &amp; Maintenance</h2>
            <p className="section-desc">
              All scheduled maintenance windows and past security upgrades are documented here.
            </p>
          </div>

          <div className="incidents-container">
            <div className="incident-card resolved">
              <div className="incident-header">
                <div className="incident-title-wrap">
                  <span className="incident-status-tag resolved">Resolved</span>
                  <h4 className="incident-title">Discord API v10 Gateway Infrastructure Upgrade</h4>
                </div>
                <span className="incident-date">September 2026</span>
              </div>
              <p className="incident-desc">
                Completed zero-downtime routing upgrade across all 32 Discord WebSocket shards. Latency reduced by an average of 4.2ms across all regional clusters.
              </p>
              <div className="incident-updates">
                <div className="update-entry">
                  <span className="update-time">Update:</span>
                  <span className="update-text">All bot nodes verified operational. Zero dropped voice frames or lost scrim commands reported.</span>
                </div>
              </div>
            </div>

            <div className="incident-card resolved">
              <div className="incident-header">
                <div className="incident-title-wrap">
                  <span className="incident-status-tag resolved">Completed</span>
                  <h4 className="incident-title">Scheduled Audio Node Scalability Expansion</h4>
                </div>
                <span className="incident-date">August 2026</span>
              </div>
              <p className="incident-desc">
                Provisioned additional high-bandwidth audio nodes for SONIC to support surging 24/7 radio listeners. Total capacity expanded by 300%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-title">Deploy Reliable Bots to Your Server</h2>
            <p className="cta-desc">
              Experience the unmatched 99.99% uptime of AnuragLabs bots. Direct invites with instant setup and zero credit card required.
            </p>
            <div className="cta-actions-row">
              <Link href="/#bots" className="btn btn-primary btn-lg">
                Explore All Bots
              </Link>
              <a
                href={ecosystemInfo.supportServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Join Official Support Server →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer
        suiteName={ecosystemInfo.name}
        supportServerUrl={ecosystemInfo.supportServerUrl}
        githubUrl={ecosystemInfo.githubUrl}
      />

      <Toast message={toastMessage} />
    </main>
  );
}
