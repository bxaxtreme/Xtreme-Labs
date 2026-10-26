'use client';

import React, { useState } from 'react';
import { CommandItem } from '@/types/bot';

interface CommandExplorerProps {
  commands: CommandItem[];
}

export const CommandExplorer: React.FC<CommandExplorerProps> = ({ commands }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'General', 'Moderation', 'Music', 'AI & Fun', 'Utility'];

  const filteredCommands = commands.filter((cmd) => {
    const matchesCat = activeCategory === 'All' || cmd.category === activeCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      cmd.name.toLowerCase().includes(term) ||
      cmd.description.toLowerCase().includes(term) ||
      cmd.syntax.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="commands" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Slash Command Suite</span>
          <h2 className="section-title">Explore Available Commands</h2>
          <p className="section-desc">
            Search through the complete catalogue of slash commands, complete with syntax arguments and permission prerequisites.
          </p>
        </div>

        <div className="commands-wrapper">
          <div className="cmd-filter-bar">
            <div className="cmd-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cmd-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' ? 'All Commands' : cat}
                </button>
              ))}
            </div>

            <div className="cmd-search-box">
              <svg className="cmd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="cmd-search-input"
                placeholder="Search command name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="commands-table">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd) => (
                <div key={cmd.name} className="cmd-card">
                  <div className="cmd-header">
                    <span className="cmd-name">/{cmd.name}</span>
                    <span className="cmd-category-tag">{cmd.category}</span>
                  </div>
                  <div className="cmd-syntax">{cmd.syntax}</div>
                  <p className="cmd-description">{cmd.description}</p>
                  <div className="cmd-perms">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Required: {cmd.permissions}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  🔍 No commands found matching &quot;<strong>{searchTerm}</strong>&quot;
                </p>
                <p style={{ fontSize: '0.85rem' }}>Try another search keyword or switch categories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
