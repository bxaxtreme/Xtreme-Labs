'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DiscordBotItem, BotCategory } from '@/types/bot';

interface BotCardGridProps {
  bots: DiscordBotItem[];
  onSelectBotForPlayground: (bot: DiscordBotItem) => void;
  onCopyInviteUrl: (url: string, botName: string) => void;
}

const CATEGORIES: BotCategory[] = ['All', 'Tournaments', 'Community', 'Music'];

export function BotCardGrid({
  bots,
  onSelectBotForPlayground,
  onCopyInviteUrl
}: BotCardGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<BotCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const filteredBots = useMemo(() => {
    return bots.filter((bot) => {
      const matchesCategory = selectedCategory === 'All' || bot.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        bot.name.toLowerCase().includes(q) ||
        bot.tagline.toLowerCase().includes(q) ||
        bot.description.toLowerCase().includes(q) ||
        bot.tags.some((t) => t.toLowerCase().includes(q)) ||
        bot.topCommands.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [bots, selectedCategory, searchQuery]);

  const handleCopy = (bot: DiscordBotItem) => {
    onCopyInviteUrl(bot.inviteUrl, bot.name);
    setCopiedId(bot.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyCmd = (cmd: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).then(() => {
        setCopiedCmd(cmd);
        setTimeout(() => setCopiedCmd(null), 1500);
      });
    }
  };

  return (
    <section className="section" id="bots">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Verified Fleet Directory</span>
          <h2 className="section-title">Direct Discord Invites • 3 Specialized Bots</h2>
          <p className="section-desc">
            Direct OAuth2 invite links pre-configured for your Discord server. Zero developer portal permissions hassle, instantly ready to deploy.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bot-filters-bar">
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                {cat === 'All' && <span className="cat-count">{bots.length}</span>}
              </button>
            ))}
          </div>

          <div className="bot-search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search bots, commands (e.g. /play, /scrims)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search bots"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="bot-results-summary">
          <span>
            Showing <strong>{filteredBots.length}</strong> of <strong>{bots.length}</strong> available bots
          </span>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Bot Cards Grid */}
        {filteredBots.length > 0 ? (
          <div className="bot-grid">
            {filteredBots.map((bot) => {
              const isCopied = copiedId === bot.id;
              return (
                <article
                  key={bot.id}
                  id={bot.id}
                  className={`bot-card ${bot.featured ? 'bot-card-featured' : ''}`}
                  style={{ '--bot-accent': bot.accentColor } as React.CSSProperties}
                >
                  {/* Card Top Row: Avatar & Badges */}
                  <div className="bot-card-header">
                    <div className="bot-avatar-wrapper">
                      <img
                        src={bot.avatar}
                        alt={bot.name}
                        className="bot-avatar-img"
                        loading="lazy"
                      />
                      <span className="bot-status-dot" title="Online & Operational" />
                    </div>

                    <div className="bot-badges-col">
                      <span className="bot-category-badge">{bot.category}</span>
                      {bot.id === 'ultra-music' && (
                        <div className="audio-equalizer-bars" title="320kbps Audio Active">
                          <span className="eq-bar" />
                          <span className="eq-bar" />
                          <span className="eq-bar" />
                        </div>
                      )}
                      {bot.featured && <span className="bot-featured-badge">★ Official</span>}
                    </div>
                  </div>

                  {/* Bot Identity */}
                  <div className="bot-card-body">
                    <div className="bot-title-row">
                      <h3 className="bot-name">{bot.name}</h3>
                      <span className="bot-verified-check" title="Verified Discord Application">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </span>
                    </div>

                    <p className="bot-tagline">{bot.tagline}</p>
                    <p className="bot-description">{bot.description}</p>

                    {/* Tags */}
                    <div className="bot-tags">
                      {bot.tags.map((tag) => (
                        <span key={tag} className="bot-tag-pill">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats strip */}
                    <div className="bot-stats-strip">
                      <div className="bot-stat-item">
                        <span className="bot-stat-val">{bot.stats.servers}</span>
                        <span className="bot-stat-lbl">Servers</span>
                      </div>
                      <div className="bot-stat-item">
                        <span className="bot-stat-val">{bot.stats.users}</span>
                        <span className="bot-stat-lbl">Users</span>
                      </div>
                      <div className="bot-stat-item">
                        <span className="bot-stat-val">{bot.stats.uptime}</span>
                        <span className="bot-stat-lbl">Uptime</span>
                      </div>
                    </div>

                    {/* Top Slash Commands with Click-to-Copy */}
                    <div className="bot-commands-preview">
                      <span className="bot-cmd-label">Quick Commands (Click to copy):</span>
                      <div className="bot-cmd-list">
                        {bot.topCommands.map((cmd) => {
                          const isCmdCopied = copiedCmd === cmd;
                          return (
                            <button
                              key={cmd}
                              type="button"
                              className={`bot-cmd-chip ${isCmdCopied ? 'copied' : ''}`}
                              onClick={(e) => handleCopyCmd(cmd, e)}
                              title={`Copy "${cmd}" to clipboard`}
                            >
                              <code>{cmd}</code>
                              {isCmdCopied && <span className="chip-copied-indicator">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Direct Invite & Copy & Details */}
                  <div className="bot-card-footer">
                    <a
                      href={bot.inviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-add-bot"
                      title={`Direct authorization link for ${bot.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Add to Discord
                    </a>

                    <div className="bot-secondary-actions">
                      <Link
                        href={`/bots/${bot.id}`}
                        className="btn btn-outline btn-sm btn-bot-details"
                        title={`View ${bot.name} full feature page`}
                      >
                        Details →
                      </Link>

                      <button
                        type="button"
                        className={`btn btn-outline btn-icon-only ${isCopied ? 'btn-copied' : ''}`}
                        onClick={() => handleCopy(bot)}
                        title={isCopied ? 'Invite link copied!' : 'Copy Direct Invite Link'}
                        aria-label="Copy Direct Invite Link"
                      >
                        {isCopied ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => onSelectBotForPlayground(bot)}
                        title="Simulate this bot in Discord playground"
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bot-empty-state">
            <div className="bot-empty-icon">🔍</div>
            <h3>No bots found matching &quot;{searchQuery}&quot;</h3>
            <p>Try searching for a different keyword or switch the category filter above.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
