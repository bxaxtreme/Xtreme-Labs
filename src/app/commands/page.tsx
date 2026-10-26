'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { initialBotsList, allFleetCommands, ecosystemInfo } from '@/config/botsData';
import { CommandItem } from '@/types/bot';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

export default function CommandsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBotId, setSelectedBotId] = useState<string>('all');
  const [copiedSyntax, setCopiedSyntax] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: pressing '/' or Cmd+K focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleCopyCmd = (syntax: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(syntax).then(() => {
        setCopiedSyntax(syntax);
        showToast(`✅ Copied command: "${syntax}"`);
        setTimeout(() => setCopiedSyntax(null), 2000);
      });
    }
  };

  const categories = ['All', 'Tournaments', 'Community', 'Music'];

  // Filter commands
  const filteredCommands = useMemo(() => {
    return allFleetCommands.filter((cmd: CommandItem) => {
      // Bot filter
      if (selectedBotId !== 'all' && cmd.botId !== selectedBotId) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && cmd.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = cmd.name.toLowerCase().includes(q);
        const matchesDesc = cmd.description.toLowerCase().includes(q);
        const matchesSyntax = cmd.syntax.toLowerCase().includes(q);
        const matchesBot = (cmd.botName || '').toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesSyntax || matchesBot;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedBotId]);

  return (
    <main className="commands-page-wrapper">
      <Navbar
        suiteName={ecosystemInfo.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      {/* Page Header */}
      <section className="commands-header-section">
        <div className="container">
          <div className="bot-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Commands Catalog</span>
          </div>

          <div className="commands-hero-content">
            <span className="section-badge">Master Documentation</span>
            <h1 className="commands-title">Slash Commands Directory</h1>
            <p className="commands-subtitle">
              Comprehensive list of every verified slash command across all bots in the AnuragLabs fleet. Search, copy syntax, and check required server permissions in real time.
            </p>

            {/* Quick Stats Banner */}
            <div className="commands-metrics-bar">
              <div className="cmd-metric-item">
                <span className="cmd-metric-val">{allFleetCommands.length}</span>
                <span className="cmd-metric-lbl">Total Slash Commands</span>
              </div>
              <div className="cmd-metric-item">
                <span className="cmd-metric-val">3</span>
                <span className="cmd-metric-lbl">Specialized Bots</span>
              </div>
              <div className="cmd-metric-item">
                <span className="cmd-metric-val">100%</span>
                <span className="cmd-metric-lbl">Slash (/) Standard</span>
              </div>
              <div className="cmd-metric-item">
                <span className="cmd-metric-val">0ms</span>
                <span className="cmd-metric-lbl">Prefix Latency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="commands-controls-section">
        <div className="container">
          <div className="commands-controls-card">
            {/* Search Input */}
            <div className="cmd-search-wrap">
              <svg className="cmd-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="cmd-search-input"
                placeholder="Search commands, syntax, or actions (e.g. /play, /scrims, /ban)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Discord commands"
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="cmd-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : (
                <div
                  className="cmd-search-shortcut-badge"
                  title="Press / or ⌘K to search"
                  onClick={() => searchInputRef.current?.focus()}
                >
                  <kbd className="cmd-kbd-key">⌘K</kbd>
                  <span className="cmd-kbd-sep">or</span>
                  <kbd className="cmd-kbd-key">/</kbd>
                </div>
              )}
            </div>

            {/* Filter Row */}
            <div className="cmd-filters-row">
              {/* Bot Selector Tabs */}
              <div className="cmd-bot-select-group">
                <span className="filter-label">Bot:</span>
                <button
                  type="button"
                  className={`filter-pill ${selectedBotId === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedBotId('all')}
                >
                  All Bots
                </button>
                {initialBotsList.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`filter-pill ${selectedBotId === b.id ? 'active' : ''}`}
                    onClick={() => setSelectedBotId(b.id)}
                  >
                    <span className="filter-pill-dot" style={{ backgroundColor: b.accentColor }} />
                    {b.name}
                  </button>
                ))}
              </div>

              {/* Category Selector Tabs */}
              <div className="cmd-category-group">
                <span className="filter-label">Category:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count Strip */}
            <div className="cmd-results-strip">
              <span className="results-text">
                Showing <strong>{filteredCommands.length}</strong> of {allFleetCommands.length} commands
              </span>
              {(selectedBotId !== 'all' || selectedCategory !== 'All' || searchQuery) && (
                <button
                  type="button"
                  className="btn-reset-filters"
                  onClick={() => {
                    setSelectedBotId('all');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Commands Grid Section */}
      <section className="section commands-list-section">
        <div className="container">
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty-card">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">No commands found</h3>
              <p className="empty-desc">
                No slash command matched your filter &quot;{searchQuery || selectedCategory}&quot;. Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelectedBotId('all');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="commands-catalog-grid">
              {filteredCommands.map((cmd: CommandItem) => {
                const parentBot = initialBotsList.find((b) => b.id === cmd.botId);
                const isCopied = copiedSyntax === cmd.syntax;

                return (
                  <div
                    key={`${cmd.botId}-${cmd.name}`}
                    className="cmd-catalog-card"
                    style={{ '--card-accent': parentBot?.accentColor || 'var(--blurple)' } as React.CSSProperties}
                  >
                    {/* Top Row: Command Name + Parent Bot Pill */}
                    <div className="cmd-catalog-top">
                      <div className="cmd-name-block">
                        <code className="cmd-slash-name">/{cmd.name}</code>
                        <span className="cmd-cat-tag">{cmd.category}</span>
                      </div>

                      {parentBot && (
                        <Link
                          href={`/bots/${parentBot.id}`}
                          className="cmd-bot-link-chip"
                          title={`View ${parentBot.name} page`}
                        >
                          <img src={parentBot.avatar} alt={parentBot.name} className="cmd-bot-chip-img" />
                          <span>{parentBot.name}</span>
                        </Link>
                      )}
                    </div>

                    {/* Description */}
                    <p className="cmd-catalog-desc">{cmd.description}</p>

                    {/* Permissions required */}
                    <div className="cmd-perm-row">
                      <span className="cmd-perm-label">Requires:</span>
                      <span className="cmd-perm-value">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        {cmd.permissions}
                      </span>
                    </div>

                    {/* Syntax with 1-Click Copy */}
                    <div className="cmd-catalog-syntax-box">
                      <div className="syntax-content">
                        <span className="syntax-tag">Syntax:</span>
                        <code className="syntax-text">{cmd.syntax}</code>
                      </div>
                      <button
                        type="button"
                        className={`cmd-copy-action-btn ${isCopied ? 'copied' : ''}`}
                        onClick={() => handleCopyCmd(cmd.syntax)}
                        title="Copy command syntax"
                      >
                        {isCopied ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Copied
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>

                    {/* Bottom Action */}
                    <div className="cmd-card-footer">
                      {parentBot && (
                        <>
                          <a
                            href={parentBot.inviteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cmd-invite-link"
                          >
                            Add {parentBot.name} →
                          </a>
                          <Link href={`/playground?bot=${parentBot.id}`} className="cmd-test-link">
                            Test in Live Chat ⚡
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Direct Add Bottom Banner */}
      <section className="section bg-tinted">
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-title">Ready to Use These Commands in Your Server?</h2>
            <p className="cta-desc">
              All bots are pre-configured with Discord&apos;s latest Application Command v10 API. Instant slash autocomplete with zero bot latency.
            </p>
            <div className="cta-actions-row">
              <Link href="/#bots" className="btn btn-primary btn-lg">
                View All 3 Discord Bots
              </Link>
              <Link href="/guide" className="btn btn-secondary btn-lg">
                Read Setup Guide →
              </Link>
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
