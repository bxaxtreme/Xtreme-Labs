'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { initialBotsList, ecosystemInfo } from '@/config/botsData';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

export default function GuidePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
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

  const steps = [
    {
      num: '01',
      title: 'Select Bot & Direct Authorize',
      summary: 'Choose the bot designed for your community need and click "Add to Discord Server".',
      desc: 'All bots in our fleet utilize direct OAuth2 URLs pre-configured with the official Discord Application Commands scope. Simply choose your target server from Discord’s dropdown selector. You must hold "Manage Server" or "Administrator" privileges in the target server.',
      tip: 'Never share bot invite links with untrusted third parties. Use the verified links listed on this portal.'
    },
    {
      num: '02',
      title: 'Position Bot in Server Role Hierarchy',
      summary: 'Drag the bot’s auto-generated role ABOVE standard member roles.',
      desc: 'Discord strictly enforces top-down role hierarchy. For TOURNEY - BY PRIME to assign team roles, or for Shizuka !! to manage moderation timeouts, their integrated bot role MUST be placed higher than regular members and verified players in Server Settings ➔ Roles.',
      tip: 'Crucial: Place the bot role below your Administrator / Owner role, but above all player, member, and DJ roles.'
    },
    {
      num: '03',
      title: 'Configure Channel Permissions',
      summary: 'Grant essential channel view, embed, and voice privileges.',
      desc: 'To prevent command clutter in general conversation, create dedicated channels like #scrims-slots or #bot-commands. Ensure the bot has "View Channel", "Send Messages", and "Embed Links" in text channels, and "Connect" and "Speak" in voice channels.',
      tip: 'For SONIC, grant "Priority Speaker" if you wish to prevent background speech distortion during events.'
    },
    {
      num: '04',
      title: 'Execute First Slash Command',
      summary: 'Type "/" in any authorized channel to trigger instant autocomplete.',
      desc: 'All 3 bots register their command suite globally via Discord’s v10 Application Command API. Type /tourney, /help, or /play to view the intuitive argument interface and instant documentation.',
      tip: 'If slash commands do not immediately appear, press Ctrl+R (or Cmd+R on Mac) to refresh your Discord client cache.'
    }
  ];

  const faqs = [
    {
      q: 'Why does TOURNEY say "Missing Permissions" when creating brackets or roles?',
      a: 'This happens when the bot role is positioned lower than the roles it is attempting to assign. Navigate to Server Settings ➔ Roles and drag the "TOURNEY - BY PRIME" role above your community / player roles. Also verify that the bot has "Manage Roles" and "Manage Channels" checked.'
    },
    {
      q: 'Can SONIC play Spotify or YouTube playlists?',
      a: 'Yes! SONIC natively resolves public Spotify playlist URLs, YouTube links, SoundCloud tracks, and direct search queries. Type `/play <playlist_link>` inside any voice channel.'
    },
    {
      q: 'How does Shizuka !! protect against server raids?',
      a: 'Shizuka monitors join velocity heuristics and token activity. When more than 5 accounts join within a 2-second window, Anti-Raid activates automatically, placing unverified users into quarantine and alerting moderators in your configured log channel.'
    },
    {
      q: 'Are these bots free to use?',
      a: 'Yes, all 3 bots are 100% free with unlimited slash command executions, scrim registrations, and lossless 320kbps audio playback.'
    },
    {
      q: 'Do I need to configure a custom command prefix?',
      a: 'No! All bots use modern Discord Slash Commands (`/`). Slash commands prevent bot conflicts, offer built-in argument descriptions, and work seamlessly on mobile and desktop without memorizing legacy prefixes.'
    }
  ];

  return (
    <main className="guide-page-wrapper">
      <Navbar
        suiteName={ecosystemInfo.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      {/* Guide Hero */}
      <section className="guide-header-section">
        <div className="container">
          <div className="bot-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Setup &amp; Permissions Guide</span>
          </div>

          <div className="guide-hero-content">
            <span className="section-badge">Onboarding Manual</span>
            <h1 className="guide-title">Discord Bot Setup &amp; Hierarchy Guide</h1>
            <p className="guide-subtitle">
              Follow our illustrated 4-step checklist to invite, position roles, configure channel overrides, and verify permissions with zero friction.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="section guide-steps-section">
        <div className="container">
          <div className="steps-cards-grid">
            {steps.map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-card-header">
                  <span className="step-number-pill">{step.num}</span>
                  <h3 className="step-card-title">{step.title}</h3>
                </div>

                <p className="step-card-summary">{step.summary}</p>
                <p className="step-card-desc">{step.desc}</p>

                <div className="step-tip-box">
                  <span className="tip-icon">💡</span>
                  <p className="tip-text"><strong>Pro Tip:</strong> {step.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Role Hierarchy Diagram Section */}
      <section className="section bg-tinted hierarchy-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Crucial Concept</span>
            <h2 className="section-title">Visualizing Discord Role Hierarchy</h2>
            <p className="section-desc">
              Discord operates on a strict top-down permission ladder. Study this diagram to ensure your bots have the authority to execute automated actions.
            </p>
          </div>

          <div className="hierarchy-diagram-card">
            <div className="ladder-header-bar">
              <span className="ladder-bar-title">Discord Server Settings ➔ Roles</span>
              <span className="ladder-bar-tip">Drag roles up or down to re-order priority</span>
            </div>

            <div className="ladder-container">
              {/* Level 1: Server Owner */}
              <div className="ladder-step ladder-owner">
                <div className="ladder-left">
                  <span className="role-drag-handle" title="Role drag handle">⋮⋮</span>
                  <span className="role-color-dot" style={{ backgroundColor: '#F1C40F' }} />
                  <span className="ladder-rank">1</span>
                  <div className="ladder-info">
                    <div className="ladder-name-row">
                      <span className="ladder-name">Server Owner</span>
                      <span className="role-pill-preview" style={{ color: '#F1C40F' }}>@Owner</span>
                    </div>
                    <span className="ladder-subtitle">Ultimate server authority • Crown status</span>
                  </div>
                </div>
                <span className="ladder-badge green">Immune to Bot Actions</span>
              </div>

              <div className="ladder-connector-arrow">
                <span className="connector-line" />
                <span className="connector-text">Holds authority over ↓</span>
                <span className="connector-line" />
              </div>

              {/* Level 2: Admins */}
              <div className="ladder-step ladder-admin">
                <div className="ladder-left">
                  <span className="role-drag-handle" title="Role drag handle">⋮⋮</span>
                  <span className="role-color-dot" style={{ backgroundColor: '#E74C3C' }} />
                  <span className="ladder-rank">2</span>
                  <div className="ladder-info">
                    <div className="ladder-name-row">
                      <span className="ladder-name">Administrators &amp; Head Mods</span>
                      <span className="role-pill-preview" style={{ color: '#E74C3C' }}>@Admin</span>
                    </div>
                    <span className="ladder-subtitle">Server managers • Full bot configuration access</span>
                  </div>
                </div>
                <span className="ladder-badge blue">Authorized Staff</span>
              </div>

              <div className="ladder-connector-arrow highlight-connector">
                <span className="connector-line" />
                <span className="connector-text">Must be above member roles ↓</span>
                <span className="connector-line" />
              </div>

              {/* Level 3: Bot Roles (The Golden Position) */}
              <div className="ladder-step ladder-bots highlight">
                <div className="ladder-left">
                  <span className="role-drag-handle" title="Role drag handle">⋮⋮</span>
                  <span className="role-color-dot" style={{ backgroundColor: '#5865F2' }} />
                  <span className="ladder-rank">3</span>
                  <div className="ladder-info">
                    <div className="ladder-name-row">
                      <span className="ladder-name">Fleet Bot Roles</span>
                      <span className="role-pill-preview" style={{ color: '#5865F2' }}>@TOURNEY</span>
                      <span className="role-pill-preview" style={{ color: '#EB459E' }}>@Shizuka</span>
                      <span className="role-pill-preview" style={{ color: '#57F287' }}>@ULTRA MUSIC</span>
                    </div>
                    <span className="ladder-subtitle">Must be placed HERE to assign scrim roles and moderate channels</span>
                  </div>
                </div>
                <span className="ladder-badge blurple">★ Required Bot Position</span>
              </div>

              <div className="ladder-connector-arrow">
                <span className="connector-line" />
                <span className="connector-text">Can manage &amp; assign roles to ↓</span>
                <span className="connector-line" />
              </div>

              {/* Level 4: Community & Members */}
              <div className="ladder-step ladder-members">
                <div className="ladder-left">
                  <span className="role-drag-handle" title="Role drag handle">⋮⋮</span>
                  <span className="role-color-dot" style={{ backgroundColor: '#2ECC71' }} />
                  <span className="ladder-rank">4</span>
                  <div className="ladder-info">
                    <div className="ladder-name-row">
                      <span className="ladder-name">Tournament Players &amp; Members</span>
                      <span className="role-pill-preview" style={{ color: '#2ECC71' }}>@Verified</span>
                      <span className="role-pill-preview" style={{ color: '#3498DB' }}>@Slot Captain</span>
                    </div>
                    <span className="ladder-subtitle">Subject to automated verification, role assignment, and XP leveling</span>
                  </div>
                </div>
                <span className="ladder-badge gray">Managed Community</span>
              </div>

              <div className="ladder-connector-arrow">
                <span className="connector-line" />
                <span className="connector-text">Base permissions baseline ↓</span>
                <span className="connector-line" />
              </div>

              {/* Level 5: @everyone */}
              <div className="ladder-step ladder-everyone">
                <div className="ladder-left">
                  <span className="role-drag-handle" title="Role drag handle">⋮⋮</span>
                  <span className="role-color-dot" style={{ backgroundColor: '#95A5A6' }} />
                  <span className="ladder-rank">5</span>
                  <div className="ladder-info">
                    <div className="ladder-name-row">
                      <span className="ladder-name">@everyone</span>
                      <span className="role-pill-preview" style={{ color: '#95A5A6' }}>@everyone</span>
                    </div>
                    <span className="ladder-subtitle">Default Discord baseline permissions for new server joins</span>
                  </div>
                </div>
                <span className="ladder-badge gray">Base Layer</span>
              </div>
            </div>

            <div className="hierarchy-explanation-box">
              <h4 className="box-heading">Why Hierarchy Matters:</h4>
              <p>
                If Shizuka tries to mute a spammer whose highest role is equal to or higher than Shizuka&apos;s own role, Discord will block the action with a <code>403 Forbidden</code> error. Always keep your bots in <strong>Position 3</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Quick answers to the most common configuration and permission questions.
            </p>
          </div>

          <div className="faq-accordion-wrap">
            {faqs.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Add Quick Grid */}
      <section className="section bg-tinted">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Ready to Start?</span>
            <h2 className="section-title">Select a Bot to Add Today</h2>
          </div>

          <div className="guide-bots-cta-grid">
            {initialBotsList.map((bot) => (
              <div key={bot.id} className="guide-bot-cta-card">
                <img src={bot.avatar} alt={bot.name} className="guide-bot-avatar" />
                <h4 className="guide-bot-name">{bot.name}</h4>
                <p className="guide-bot-tagline">{bot.tagline}</p>
                <div className="guide-bot-actions">
                  <a
                    href={bot.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Add to Server
                  </a>
                  <Link href={`/bots/${bot.id}`} className="btn btn-outline btn-sm">
                    View Details
                  </Link>
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
