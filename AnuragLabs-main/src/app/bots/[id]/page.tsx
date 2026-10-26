'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { initialBotsList, ecosystemInfo } from '@/config/botsData';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

interface BotPageProps {
  params: Promise<{ id: string }>;
}

export default function BotDetailPage({ params }: BotPageProps) {
  const resolvedParams = use(params);
  const botId = resolvedParams.id;
  const bot = initialBotsList.find((b) => b.id === botId);

  if (!bot) {
    notFound();
  }

  const otherBots = initialBotsList.filter((b) => b.id !== bot.id);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme hydration
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

  const handleCopyInvite = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(bot.inviteUrl)
        .then(() => {
          setCopiedLink(true);
          showToast(`✅ ${bot.name} invite link copied!`);
          setTimeout(() => setCopiedLink(false), 2200);
        })
        .catch(() => {
          showToast('⚠️ Please copy URL manually.');
        });
    }
  };

  const handleCopyCmd = (syntax: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(syntax).then(() => {
        setCopiedCmd(syntax);
        showToast(`✅ Copied "${syntax}"`);
        setTimeout(() => setCopiedCmd(null), 1800);
      });
    }
  };

  return (
    <main className="bot-page-wrapper">
      <Navbar
        suiteName={ecosystemInfo.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      {/* Bot Detail Hero */}
      <section className="bot-detail-hero" style={{ '--bot-accent': bot.accentColor } as React.CSSProperties}>
        <div className="container">
          <div className="bot-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/#bots" className="crumb-link">Bots</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{bot.name}</span>
          </div>

          <div className="bot-hero-card">
            <div className="bot-hero-left">
              <div className="bot-hero-avatar-wrap">
                <img
                  src={bot.avatar}
                  alt={bot.name}
                  className="bot-hero-avatar"
                />
                <span className="bot-hero-online-beacon" title="Online & Operational" />
              </div>

              <div className="bot-hero-meta">
                <div className="bot-hero-badges">
                  <span className="bot-category-badge">{bot.category}</span>
                  {bot.featured && <span className="bot-featured-badge">★ Official Bot</span>}
                  <span className="bot-verified-chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Verified
                  </span>
                </div>

                <h1 className="bot-hero-title">{bot.name}</h1>
                <p className="bot-hero-tagline">{bot.tagline}</p>
                <p className="bot-hero-desc">{bot.longDescription || bot.description}</p>

                {/* Direct Action Buttons */}
                <div className="bot-hero-actions">
                  <a
                    href={bot.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    title={`Add ${bot.name} to your Discord server`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Add to Discord Server
                  </a>

                  <button
                    type="button"
                    className={`btn btn-secondary btn-lg ${copiedLink ? 'btn-copied' : ''}`}
                    onClick={handleCopyInvite}
                  >
                    {copiedLink ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy Direct Invite
                      </>
                    )}
                  </button>

                  <Link href={`/playground?bot=${bot.id}`} className="btn btn-outline btn-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Live Chat Demo
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="bot-hero-stats-panel">
              <div className="hero-stat-box">
                <span className="hero-stat-num">{bot.stats.servers}</span>
                <span className="hero-stat-title">Active Servers</span>
              </div>
              <div className="hero-stat-box">
                <span className="hero-stat-num">{bot.stats.users}</span>
                <span className="hero-stat-title">Total Users</span>
              </div>
              <div className="hero-stat-box">
                <span className="hero-stat-num">{bot.stats.uptime}</span>
                <span className="hero-stat-title">Operational Uptime</span>
              </div>
              <div className="hero-stat-box">
                <span className="hero-stat-num">Slash /</span>
                <span className="hero-stat-title">Command Prefix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive Features Section */}
      {bot.detailedFeatures && bot.detailedFeatures.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Core Capabilities</span>
              <h2 className="section-title">Engineered Specifically for {bot.name}</h2>
              <p className="section-desc">
                Explore the dedicated features and automated workflows built into {bot.name}.
              </p>
            </div>

            <div className="bot-features-deep-grid">
              {bot.detailedFeatures.map((feat, idx) => (
                <div key={idx} className="bot-deep-card">
                  <div className="bot-deep-icon-wrap">
                    <span className="bot-feature-number">0{idx + 1}</span>
                  </div>
                  {feat.badge && <span className="bot-feature-tag">{feat.badge}</span>}
                  <h3 className="bot-deep-title">{feat.title}</h3>
                  <p className="bot-deep-desc">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Command Documentation Table */}
      {bot.detailedCommands && bot.detailedCommands.length > 0 && (
        <section className="section bg-tinted" id="commands">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Command Suite</span>
              <h2 className="section-title">Official Slash Commands for {bot.name}</h2>
              <p className="section-desc">
                Run these slash commands directly in any authorized channel on your Discord server.
              </p>
            </div>

            <div className="bot-commands-grid">
              {bot.detailedCommands.map((cmd) => {
                const isCopied = copiedCmd === cmd.syntax;
                return (
                  <div key={cmd.name} className="bot-cmd-card">
                    <div className="bot-cmd-card-header">
                      <code className="bot-cmd-code">/{cmd.name}</code>
                      <span className="bot-cmd-perm-badge">{cmd.permissions}</span>
                    </div>

                    <p className="bot-cmd-desc">{cmd.description}</p>

                    <div className="bot-cmd-syntax-box">
                      <span className="bot-syntax-label">Usage:</span>
                      <code className="bot-syntax-code">{cmd.syntax}</code>
                      <button
                        type="button"
                        className={`btn-copy-syntax ${isCopied ? 'copied' : ''}`}
                        onClick={() => handleCopyCmd(cmd.syntax)}
                        title="Copy command syntax"
                      >
                        {isCopied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Conversion Banner */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-title">Ready to Add {bot.name} to Your Server?</h2>
            <p className="cta-desc">
              Join thousands of Discord communities already powered by our bots. Zero configuration required to start.
            </p>
            <div className="cta-actions-row">
              <a
                href={bot.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Invite {bot.name} Now
              </a>

              <Link href="/" className="btn btn-secondary btn-lg">
                Explore Other Bots →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Bots Row */}
      <section className="section bg-tinted">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">More from Our Fleet</span>
            <h2 className="section-title">Discover Other Bots from AnuragLabs</h2>
          </div>

          <div className="other-bots-grid">
            {otherBots.map((ob) => (
              <div key={ob.id} className="other-bot-card">
                <div className="other-bot-top">
                  <img src={ob.avatar} alt={ob.name} className="other-bot-avatar" />
                  <div>
                    <h4 className="other-bot-name">{ob.name}</h4>
                    <span className="bot-category-badge">{ob.category}</span>
                  </div>
                </div>
                <p className="other-bot-tagline">{ob.tagline}</p>
                <div className="other-bot-actions">
                  <Link href={`/bots/${ob.id}`} className="btn btn-outline btn-sm">
                    View Details
                  </Link>
                  <a
                    href={ob.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Add to Server
                  </a>
                </div>
              </div>
            ))}
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
