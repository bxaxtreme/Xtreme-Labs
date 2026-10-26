'use client';

import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { initialBotsList, ecosystemInfo } from '@/config/botsData';
import { DiscordBotItem } from '@/types/bot';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  username: string;
  avatar: string;
  time: string;
  text?: string;
  isBot?: boolean;
  botTag?: string;
  embed?: {
    color: string;
    author?: { name: string; icon?: string };
    title?: string;
    description?: string;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: string;
    thumbnail?: string;
  };
}

function PlaygroundInner() {
  const searchParams = useSearchParams();
  const botParam = searchParams.get('bot');

  const defaultBot = initialBotsList.find((b) => b.id === botParam) || initialBotsList[0];
  const [selectedBot, setSelectedBot] = useState<DiscordBotItem>(defaultBot);
  const [selectedChannel, setSelectedChannel] = useState<string>('#bot-playground');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Update selected bot if URL query param changes
  useEffect(() => {
    if (botParam) {
      const found = initialBotsList.find((b) => b.id === botParam);
      if (found) {
        setSelectedBot(found);
      }
    }
  }, [botParam]);

  // Initial welcome message per bot
  const getInitialMessages = (bot: DiscordBotItem): ChatMessage[] => {
    if (bot.id === 'tourney') {
      return [
        {
          id: '1',
          sender: 'user',
          username: 'ScrimCaptain',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
          time: 'Today at 12:00 PM',
          text: '/slots'
        },
        {
          id: '2',
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: 'Today at 12:00 PM',
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            author: { name: 'PRIME TOURNAMENT SYSTEM • MATCH #84', icon: bot.avatar },
            title: '🏆 BGMI / PUBG Elite Tier-1 Scrims (Round 1)',
            description: 'Registrations are **OPEN**. 18 of 20 slots filled. Registered squads must check in 10 minutes prior.',
            fields: [
              { name: 'Slot 01 - 05', value: '• GodLike Esports\n• Soul Gaming\n• Entity Esports\n• Team Secret\n• Hydra Clan', inline: true },
              { name: 'Slot 06 - 10', value: '• Skylightz\n• Enigma Gaming\n• Blind Esports\n• Orangutan\n• Revenant', inline: true },
              { name: 'Format & Map', value: '4PM IST • Erangel • TPP Squad\nKill Points: 1 pt | 1st Place: 10 pts', inline: false }
            ],
            footer: 'Type /scrims register <Team> @p1 @p2 @p3 @p4 to claim your slot.'
          }
        }
      ];
    } else if (bot.id === 'shizuka') {
      return [
        {
          id: '1',
          sender: 'user',
          username: 'SakuraVibes',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          time: 'Today at 12:01 PM',
          text: '/rank'
        },
        {
          id: '2',
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: 'Today at 12:01 PM',
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            author: { name: 'Shizuka Community Leveling', icon: bot.avatar },
            title: '✨ Level Card for SakuraVibes',
            description: 'Rank **#4** in the server • Total XP: **14,850**',
            fields: [
              { name: 'Current Tier', value: '🌸 Diamond Guardian', inline: true },
              { name: 'Next Level', value: 'Level 38 (85% Progress)', inline: true },
              { name: 'Badges Earned', value: '🎖️ Top Chatter • 🎙️ 100h Voice • 🛡️ Shield Bearer', inline: false }
            ],
            footer: 'Tip: Active voice chat gives +25 XP every 5 minutes.'
          }
        }
      ];
    } else {
      return [
        {
          id: '1',
          sender: 'user',
          username: 'Audiophile',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
          time: 'Today at 12:02 PM',
          text: '/play lofi hip hop beats to relax'
        },
        {
          id: '2',
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: 'Today at 12:02 PM',
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            author: { name: 'Now Playing • Lossless 320kbps Audio', icon: bot.avatar },
            title: '🎵 Chillhop Radio - Jazzy & Lofi Hip Hop Beats',
            description: 'Streamed in high-fidelity 48kHz / 320kbps buffer directly into **Voice Lounge #1**.',
            fields: [
              { name: 'Duration', value: '🔴 LIVE 24/7', inline: true },
              { name: 'Volume & DSP', value: '100% • Bassboost OFF', inline: true },
              { name: 'Requested By', value: '@Audiophile', inline: true }
            ],
            footer: 'Loop: Enabled • 24/7 Mode: Active'
          }
        }
      ];
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages(defaultBot));

  // Reset messages when switching bots
  const handleSelectBot = (b: DiscordBotItem) => {
    setSelectedBot(b);
    setMessages(getInitialMessages(b));
    if (b.id === 'tourney') setSelectedChannel('#scrims-slots');
    else if (b.id === 'shizuka') setSelectedChannel('#general-chat');
    else setSelectedChannel('#music-lounge');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle command execution
  const executeCommand = (cmdText: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      username: 'ServerAdmin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      time: 'Just now',
      text: cmdText
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(cmdText, selectedBot);
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');
    executeCommand(text);
  };

  const generateBotResponse = (cmd: string, bot: DiscordBotItem): ChatMessage => {
    const now = 'Just now';
    const lower = cmd.toLowerCase();

    if (bot.id === 'tourney') {
      if (lower.includes('register')) {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: '#23A55A',
            title: '✅ Team Registration Confirmed!',
            description: 'Your squad has successfully booked **Slot #19** for tonight&apos;s Tier-1 Scrims.',
            fields: [
              { name: 'Team Name', value: 'Nova Vanguard', inline: true },
              { name: 'Roster Verified', value: '4 / 4 Players Discord Verified', inline: true },
              { name: 'Match Room ID', value: 'Will be auto-dispatched in team channel 15m prior.', inline: false }
            ],
            footer: 'Tournament ID: PRIME-BGMI-992 • Automated by TOURNEY - BY PRIME'
          }
        };
      } else if (lower.includes('bracket')) {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '🏆 Tournament Bracket • Quarter-Finals',
            description: 'Quarter-Final matches are underway. Winner proceeds directly to Semi-Finals A.',
            fields: [
              { name: 'Match 1', value: 'Soul Gaming (2) vs Entity (1) ➔ Soul Wins', inline: true },
              { name: 'Match 2', value: 'GodLike vs Skylightz ➔ In Progress', inline: true },
              { name: 'Match 3', value: 'Team Secret vs Blind ➔ Upcoming (17:00 IST)', inline: true }
            ],
            footer: 'Live bracket synced with Challonge & Discord API'
          }
        };
      } else {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '⚡ Scrims & Tournament System Status',
            description: `Active tournament manager configured for **${selectedChannel}**. Ready to process registrations and slot calculations.`,
            fields: [
              { name: 'Commands available', value: '`/tourney create`, `/scrims register`, `/slots`, `/bracket`, `/leaderboard`', inline: false }
            ],
            footer: 'Add TOURNEY - BY PRIME for automated tournament hosting.'
          }
        };
      }
    } else if (bot.id === 'shizuka') {
      if (lower.includes('automod')) {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: '#5865F2',
            title: '🛡️ Shizuka AutoMod Shield Status',
            description: 'All proactive protection modules are running at **100% efficiency**.',
            fields: [
              { name: 'Anti-Raid', value: '🟢 Active (Max 5 joins/sec)', inline: true },
              { name: 'Phishing Link Filter', value: '🟢 Active (Global Blacklist)', inline: true },
              { name: 'Mass Mention Shield', value: '🟢 Active (Max 3 mentions)', inline: true },
              { name: 'Spam Detection', value: '🟢 Auto-Timeout 5 mins', inline: true }
            ],
            footer: 'Audit log logged in #mod-logs • Protected by Shizuka !!'
          }
        };
      } else if (lower.includes('anime')) {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '💖 Anime Interaction • Warm Hug!',
            description: 'Shizuka gently gives everyone in the channel a cozy hug! (つ≧▽≦)つ',
            fields: [
              { name: 'Anime Trivia', value: '“If you don’t share someone&apos;s pain, you can never understand them.” — Nagato', inline: false }
            ],
            footer: 'Type /anime for more social anime reactions'
          }
        };
      } else {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '🌸 Shizuka Community Companion',
            description: `Hello! I am **Shizuka !!**, your full-featured server companion for auto-moderation, leveling, welcome canvas, and anime fun.`,
            fields: [
              { name: 'Need assistance?', value: 'Use `/help` to see all commands or `/automod` to inspect server security settings.', inline: false }
            ],
            footer: 'Powered by AnuragLabs'
          }
        };
      }
    } else {
      // Sonic
      if (lower.includes('queue')) {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '🎶 Server Music Queue (4 Tracks)',
            description: '**Currently Playing:** 🎵 *Chillhop Radio - Jazzy Lofi Beats* (3:45 / LIVE)',
            fields: [
              { name: '1. Starboy - The Weeknd', value: 'Duration: 3:50 • Req by: @Alex', inline: false },
              { name: '2. Blinding Lights - Synthwave Mix', value: 'Duration: 4:12 • Req by: @Rohan', inline: false },
              { name: '3. Midnight City - M83', value: 'Duration: 4:03 • Req by: @Kavya', inline: false }
            ],
            footer: 'Queue duration: 12 mins • 24/7 radio mode active'
          }
        };
      } else if (lower.includes('bassboost')) {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '🔊 DSP Bassboost Equalizer Updated',
            description: 'Low-frequency sub-bass enhancement set to **HIGH (+10dB)** with zero clipping.',
            fields: [
              { name: 'Output Audio Buffer', value: '320kbps Stereo Lossless', inline: true },
              { name: 'Hardware Node', value: 'US-East Node #4 (9ms)', inline: true }
            ],
            footer: 'Use /bassboost off to reset audio curve.'
          }
        };
      } else {
        return {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          username: bot.name,
          avatar: bot.avatar,
          time: now,
          isBot: true,
          botTag: 'BOT',
          embed: {
            color: bot.accentColor,
            title: '🎵 Lossless Audio Engine Ready',
            description: `SONIC is connected and waiting for your track commands in **${selectedChannel}**.`,
            fields: [
              { name: 'Popular Commands', value: '`/play <song>`, `/skip`, `/queue`, `/bassboost`, `/volume`, `/247`', inline: false }
            ],
            footer: '320kbps High-Fi Audio Streaming'
          }
        };
      }
    }
  };

  const channelList = [
    { name: '#bot-playground', id: 'play' },
    { name: '#scrims-slots', id: 'tourney' },
    { name: '#general-chat', id: 'shizuka' },
    { name: '#music-lounge', id: 'ultra-music' }
  ];

  return (
    <main className="playground-page-wrapper">
      <Navbar
        suiteName={ecosystemInfo.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      {/* Hero Header */}
      <section className="playground-header-section">
        <div className="container">
          <div className="bot-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Live Discord Studio</span>
          </div>

          <div className="playground-hero-banner">
            <div className="pg-hero-text">
              <span className="section-badge">Interactive Test Environment</span>
              <h1 className="pg-hero-title">Discord Live Simulator</h1>
              <p className="pg-hero-desc">
                Experience the real speed, rich embeds, and instant slash response of AnuragLabs bots before inviting them to your private server.
              </p>
            </div>

            {/* Direct Add Button for Currently Selected Bot */}
            <div className="pg-hero-cta">
              <a
                href={selectedBot.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Add {selectedBot.name} to Server
              </a>
              <Link href={`/bots/${selectedBot.id}`} className="btn btn-outline">
                View Full Documentation →
              </Link>
            </div>
          </div>

          {/* Bot Switcher Tabs */}
          <div className="pg-bot-tabs">
            {initialBotsList.map((bot) => {
              const isActive = selectedBot.id === bot.id;
              return (
                <button
                  key={bot.id}
                  type="button"
                  className={`pg-bot-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectBot(bot)}
                  style={{ '--tab-accent': bot.accentColor } as React.CSSProperties}
                >
                  <img src={bot.avatar} alt={bot.name} className="pg-tab-avatar" />
                  <div className="pg-tab-info">
                    <span className="pg-tab-name">{bot.name}</span>
                    <span className="pg-tab-category">{bot.category}</span>
                  </div>
                  {isActive && <span className="pg-tab-indicator" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Studio Frame */}
      <section className="section pg-studio-section">
        <div className="container">
          <div className="discord-studio-container">
            {/* Authentic Discord Guild Switcher Rail */}
            <div className="discord-guild-rail" aria-label="Discord Servers Rail">
              {/* Fleet Lab Hub Icon */}
              <div className="guild-rail-item-wrap">
                <span className={`guild-pill-indicator ${selectedBot.id === 'tourney' && selectedChannel === '#bot-playground' ? 'active' : ''}`} />
                <button
                  type="button"
                  className={`guild-icon-btn ${selectedChannel === '#bot-playground' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedChannel('#bot-playground');
                  }}
                  title="AnuragLabs Testing Lab (General)"
                  aria-label="AnuragLabs Testing Lab"
                >
                  <span className="guild-hub-badge">⚡</span>
                </button>
              </div>

              <div className="guild-rail-separator" />

              {/* Specific Bot Servers */}
              {initialBotsList.map((b) => {
                const isActive = selectedBot.id === b.id;
                return (
                  <div key={b.id} className="guild-rail-item-wrap">
                    <span className={`guild-pill-indicator ${isActive ? 'active' : ''}`} />
                    <button
                      type="button"
                      className={`guild-icon-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectBot(b)}
                      title={`${b.name} Server (${b.category})`}
                      aria-label={`${b.name} Server`}
                      style={{ '--guild-accent': b.accentColor } as React.CSSProperties}
                    >
                      <img src={b.avatar} alt={b.name} className="guild-icon-img" />
                      {isActive && <span className="guild-active-glow" />}
                    </button>
                  </div>
                );
              })}

              <div className="guild-rail-separator" />

              {/* Direct Invite Add Button */}
              <div className="guild-rail-item-wrap">
                <a
                  href={selectedBot.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guild-icon-btn guild-add-btn"
                  title={`Direct Add ${selectedBot.name} to Your Server`}
                  aria-label={`Invite ${selectedBot.name}`}
                >
                  <span className="guild-add-plus">+</span>
                </a>
              </div>
            </div>

            {/* Left Server Channel Sidebar */}
            <aside className="discord-studio-sidebar">
              <div className="studio-sidebar-header">
                <div className="studio-server-icon" style={{ backgroundColor: selectedBot.accentColor }}>
                  {selectedBot.name.slice(0, 1)}
                </div>
                <div className="studio-server-details">
                  <span className="studio-server-name">{selectedBot.name} Official Lab</span>
                  <span className="studio-server-status">Community Server • Online</span>
                </div>
                <svg className="studio-chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>

              <div className="studio-channels-group">
                <span className="studio-category-label">TEXT CHANNELS</span>
                {channelList.map((ch) => (
                  <button
                    key={ch.name}
                    type="button"
                    className={`studio-channel-item ${selectedChannel === ch.name ? 'active' : ''}`}
                    onClick={() => setSelectedChannel(ch.name)}
                  >
                    <span className="channel-hash">#</span>
                    <span className="channel-title">{ch.name.replace('#', '')}</span>
                  </button>
                ))}

                <span className="studio-category-label" style={{ marginTop: '0.75rem' }}>VOICE CHANNELS</span>
                <div className="studio-channel-item voice-channel">
                  <span className="channel-hash">🔊</span>
                  <span className="channel-title">Voice Lounge #1</span>
                  {selectedBot.id === 'ultra-music' && (
                    <span className="voice-live-badge">24/7 LIVE</span>
                  )}
                </div>
              </div>

              {/* Bot Info Card inside Sidebar */}
              <div className="studio-bot-card-mini">
                <div className="bot-mini-avatar-wrap">
                  <img src={selectedBot.avatar} alt={selectedBot.name} className="bot-mini-avatar" />
                  <span className="online-dot-mini" />
                </div>
                <div className="bot-mini-details">
                  <span className="bot-mini-name">{selectedBot.name}</span>
                  <span className="bot-mini-badge">Verified Application</span>
                </div>
              </div>
            </aside>

            {/* Main Chat Workspace */}
            <div className="discord-studio-main">
              {/* Channel Top Header */}
              <div className="discord-channel-top-bar">
                <div className="top-bar-left">
                  <span className="channel-hash-large">#</span>
                  <span className="current-channel-name">{selectedChannel.replace('#', '')}</span>
                  <span className="channel-top-desc">Testing simulation for {selectedBot.name}</span>
                </div>
                <div className="top-bar-right">
                  <button
                    type="button"
                    className="btn-clear-chat"
                    onClick={() => setMessages(getInitialMessages(selectedBot))}
                    title="Reset simulation messages"
                  >
                    Reset Chat
                  </button>
                </div>
              </div>

              {/* Quick Command Suggestion Bar */}
              <div className="quick-commands-bar">
                <span className="quick-label">Try Commands:</span>
                {selectedBot.topCommands.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    className="quick-cmd-btn"
                    onClick={() => executeCommand(cmd)}
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Chat Message Scroll View */}
              <div className="discord-chat-viewport">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message-row ${msg.sender === 'bot' ? 'is-bot-message' : ''}`}>
                    <img src={msg.avatar} alt={msg.username} className="chat-user-avatar" />
                    <div className="chat-message-body">
                      <div className="chat-message-header">
                        <span className="chat-author-name">{msg.username}</span>
                        {msg.isBot && <span className="chat-bot-tag">BOT</span>}
                        <span className="chat-timestamp">{msg.time}</span>
                      </div>

                      {msg.text && <div className="chat-text-content">{msg.text}</div>}

                      {/* Discord Rich Embed */}
                      {msg.embed && (
                        <div
                          className="discord-embed-card"
                          style={{ borderLeftColor: msg.embed.color || 'var(--blurple)' }}
                        >
                          {msg.embed.author && (
                            <div className="embed-author">
                              {msg.embed.author.icon && (
                                <img src={msg.embed.author.icon} alt="" className="embed-author-icon" />
                              )}
                              <span>{msg.embed.author.name}</span>
                            </div>
                          )}

                          {msg.embed.title && <h4 className="embed-title">{msg.embed.title}</h4>}

                          {msg.embed.description && (
                            <div
                              className="embed-description"
                              dangerouslySetInnerHTML={{
                                __html: msg.embed.description
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              }}
                            />
                          )}

                          {msg.embed.fields && msg.embed.fields.length > 0 && (
                            <div className="embed-fields-grid">
                              {msg.embed.fields.map((f, i) => (
                                <div key={i} className={`embed-field ${f.inline ? 'inline' : 'full'}`}>
                                  <div className="field-name">{f.name}</div>
                                  <div
                                    className="field-value"
                                    dangerouslySetInnerHTML={{
                                      __html: f.value
                                        .replace(/\n/g, '<br/>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {msg.embed.footer && <div className="embed-footer">{msg.embed.footer}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-label">{selectedBot.name} is typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Box */}
              <form className="discord-input-container" onSubmit={handleSendMessage}>
                <div className="discord-input-box">
                  <span className="input-prefix-icon">+</span>
                  <input
                    type="text"
                    className="discord-chat-input"
                    placeholder={`Message ${selectedChannel} or try a slash command like /${selectedBot.topCommands[0]?.replace('/', '')}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" className="discord-send-btn" title="Send message">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </form>
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

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center">Loading live simulator...</div>}>
      <PlaygroundInner />
    </Suspense>
  );
}
