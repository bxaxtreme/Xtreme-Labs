'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DiscordBotItem, SampleEmbed } from '@/types/bot';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  name: string;
  avatar: string;
  isBot?: boolean;
  time: string;
  text?: string;
  embed?: SampleEmbed;
}

interface DiscordSimulatorProps {
  bots: DiscordBotItem[];
  activeBotId: string;
  onSelectBot: (botId: string) => void;
}

const BOT_CHANNELS = [
  { id: 'tourney', name: '🏆-tourney-scrims', topic: 'Automated Esports Tournament & Scrims Matchmaking', botId: 'tourney' },
  { id: 'shizuka', name: '🌸-shizuka-guard', topic: 'Heuristic Auto-Mod, Leveling & Welcome Companion', botId: 'shizuka' },
  { id: 'ultra-music', name: '🎵-ultra-music', topic: 'Lossless 320kbps Audio & 24/7 Voice Channel', botId: 'ultra-music' },
  { id: 'playground', name: '⚡-fleet-sandbox', topic: 'Interactive AnuragLabs Multi-Bot Playground', botId: 'tourney' }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  tourney: [
    {
      id: 'tourney-u1',
      sender: 'user',
      name: 'ServerOwner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      time: 'Today at 10:30 PM',
      text: '/tourney create name: "Championship Cup 2026" slots: 25 format: "Battle Royale Squads"'
    },
    {
      id: 'tourney-b1',
      sender: 'bot',
      name: 'TOURNEY - BY PRIME',
      avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=120&auto=format&fit=crop&q=80',
      isBot: true,
      time: 'Today at 10:30 PM',
      embed: {
        title: '🏆 Tournament Initialized • Championship Cup 2026',
        description: 'Successfully initialized Battle Royale tournament! Brackets, slots, and verified tags are active.',
        fields: [
          { name: 'Status', value: '🟢 Open Registration', inline: true },
          { name: 'Prize Pool', value: '₹50,000 INR', inline: true },
          { name: 'Slots', value: '25 Squads Confirmed', inline: true },
          { name: 'Channel', value: '#slot-registration', inline: true },
          { name: 'Tag Verification', value: '100% Strict Anti-Fake', inline: true },
          { name: 'Automated Points', value: 'BGMi Official Rulebook', inline: true }
        ],
        footer: 'TOURNEY - BY PRIME • Esports Automation Engine • Latency: 14ms'
      }
    }
  ],
  shizuka: [
    {
      id: 'shizuka-u1',
      sender: 'user',
      name: 'ServerOwner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      time: 'Today at 10:32 PM',
      text: '/automod shield'
    },
    {
      id: 'shizuka-b1',
      sender: 'bot',
      name: 'Shizuka !!',
      avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&auto=format&fit=crop&q=80',
      isBot: true,
      time: 'Today at 10:32 PM',
      embed: {
        title: '🛡️ AutoMod Shield • Active Protection Matrix',
        description: 'Shizuka is actively guarding this server with 24/7 heuristic anti-raid and spam suppression.',
        fields: [
          { name: 'Phishing Filter', value: '✅ 0-Day Link Shield', inline: true },
          { name: 'Mass Mentions', value: '⛔ Block > 4 Mentions', inline: true },
          { name: 'Raid Isolation', value: '⚡ 3-Sec Quarantine', inline: true },
          { name: 'Leveling XP', value: '🌸 Active (#level-up)', inline: true },
          { name: 'Welcome Banner', value: '🎨 Custom Canvas Live', inline: true },
          { name: 'Escalation', value: 'Auto-Timeout (10m)', inline: true }
        ],
        footer: 'Shizuka !! • Community Guardian • Auto-Protection Online'
      }
    }
  ],
  'ultra-music': [
    {
      id: 'ultra-u1',
      sender: 'user',
      name: 'ServerOwner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      time: 'Today at 10:34 PM',
      text: '/play Alan Walker - Faded (320kbps Remaster)'
    },
    {
      id: 'ultra-b1',
      sender: 'bot',
      name: 'SONIC',
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=80',
      isBot: true,
      time: 'Today at 10:34 PM',
      embed: {
        title: '🎵 Now Streaming • Lossless High-Fi Audio',
        description: '🎶 **Alan Walker - Faded (2026 Lossless Master)**\n`[1:12 ▬▬▬▬▬▬▬▬▬▬▬▬ 3:32]`\nBitrate: **320kbps High-Fi** | Mode: **24/7 Channel Active**',
        fields: [
          { name: 'Voice Channel', value: '🔊 Lounge 01', inline: true },
          { name: 'Volume', value: '95% (Dynamic EQ)', inline: true },
          { name: 'Queue Position', value: '#1 of 14 tracks', inline: true },
          { name: 'Audio DSP Filter', value: 'BassBoost (+6dB)', inline: true },
          { name: 'Up Next', value: 'The Spectre (03:13)', inline: true },
          { name: 'Source', value: 'Lossless CDN Stream', inline: true }
        ],
        footer: 'SONIC • Crystal-Clear 320kbps Audio Engine'
      }
    }
  ]
};

const BOT_PRESET_RESPONSES: Record<string, Record<string, SampleEmbed>> = {
  tourney: {
    '/tourney create': {
      title: '🏆 Tournament Initialized • TOURNEY - BY PRIME',
      description: 'Created tournament **"Championship Cup 2026"** successfully!\nFormat: **Battle Royale Squads (Double Elimination)** | Total Slots: **25 Teams**.',
      fields: [
        { name: 'Registration', value: '🟢 Open in #slot-registration', inline: true },
        { name: 'Prize Pool', value: '₹50,000 INR', inline: true },
        { name: 'Organizer', value: '@PrimeGaming', inline: true }
      ],
      footer: 'TOURNEY - BY PRIME • Esports Automation Engine'
    },
    '/scrims register': {
      title: '✅ Team Registration Confirmed • TOURNEY - BY PRIME',
      description: 'Team **[SOUL] Apex Gaming** has reserved **Slot #07**!\nPlayer 1: `@Mortal` | Player 2: `@Viper` | Player 3: `@Regaltos` | Player 4: `@Scout`',
      fields: [
        { name: 'Verification', value: '100% Team Tags Verified', inline: true },
        { name: 'ID & Pass Channel', value: '<#scrims-id-pass>', inline: true }
      ],
      footer: 'TOURNEY - BY PRIME • Slot Verification'
    },
    '/bracket': {
      title: '⚔️ Live Tournament Bracket • Semi-Finals',
      description: 'Match 1: **Team Soul** vs **Team GodLike** `[2 - 1]`\nMatch 2: **Team Entity** vs **Team 8Bit** `[Live 🔴]`',
      fields: [
        { name: 'Next Match', value: 'Grand Finals at 8:00 PM', inline: true },
        { name: 'Scoreboard', value: 'Updated in real-time', inline: true }
      ],
      footer: 'TOURNEY - BY PRIME • Bracket Generator'
    },
    '/slots': {
      title: '📋 Confirmed Slots • Match #03',
      description: 'Slot 1: `Team Alpha` | Slot 2: `Team Bravo`\nSlot 3: `Team Charlie` | Slot 4: `Team Delta`\nSlot 5: `Team Echo` | Slot 6: `Team Falcon`',
      fields: [
        { name: 'Remaining Slots', value: '4 / 25 Available', inline: true },
        { name: 'Waitlist', value: '3 Teams in queue', inline: true }
      ],
      footer: 'TOURNEY - BY PRIME • Scrim Slots'
    },
    '/leaderboard': {
      title: '🥇 Points Table & Kills Leaderboard',
      description: '1. **Team Soul** - 84 Pts (42 Kills)\n2. **Team GodLike** - 76 Pts (38 Kills)\n3. **Team Entity** - 65 Pts (29 Kills)',
      fields: [
        { name: 'MVP Player', value: '@Mortal (18 Kills)', inline: true },
        { name: 'Matches Played', value: '4 / 6', inline: true }
      ],
      footer: 'TOURNEY - BY PRIME • Leaderboard'
    }
  },
  shizuka: {
    '/help': {
      title: '🌸 Shizuka !! • Command Dashboard',
      description: 'Kon\'nichiwa! Here is your complete companion guide for **Shizuka !!**.\n\n🛡️ **Moderation:** `/automod`, `/ban`, `/kick`, `/timeout`, `/purge`\n🎉 **Community:** `/welcome`, `/rank`, `/leaderboard`, `/roles`\n✨ **Anime & Fun:** `/anime`, `/kiss`, `/pat`, `/hug`, `/quote`',
      fields: [
        { name: 'Prefix', value: 'Slash (`/`)', inline: true },
        { name: 'Support', value: '[Join Community](https://discord.gg/anurag-bots)', inline: true }
      ],
      footer: 'Shizuka !! • Your Aesthetic Discord Partner'
    },
    '/automod': {
      title: '🛡️ AutoMod Shield • Shizuka !!',
      description: 'Server protection is **Fully Active**.\n• Anti-Raid: `Strict Mode`\n• Phishing URL Blocker: `Enabled`\n• Mass Mention Shield: `Max 4 Mentions`',
      fields: [
        { name: 'Status', value: 'Protected (24/7 Monitoring)', inline: true },
        { name: 'Action Taken', value: 'Auto-Timeout & Delete', inline: true }
      ],
      footer: 'Shizuka !! • Security Engine'
    },
    '/welcome': {
      title: '🎨 Welcome Card Preview • Shizuka !!',
      description: 'Previewing automated greeting card for new server members.\n**"Welcome @NewUser to the server! You are our 5,420th member! Enjoy your stay!"**',
      fields: [
        { name: 'Channel', value: '<#welcome>', inline: true },
        { name: 'Auto-Role', value: '@Member Assigned', inline: true }
      ],
      footer: 'Shizuka !! • Welcomer'
    },
    '/rank': {
      title: '🌟 Member Level Card • Shizuka !!',
      description: '**Rank #1** in this Server!\nLevel: **42** • XP: `58,400 / 60,000` (97%)\nChat Streak: **28 Days** 🔥',
      fields: [
        { name: 'Unlocked Role', value: '🌸 Sakura Champion', inline: true },
        { name: 'Rank Badge', value: 'Diamond Member', inline: true }
      ],
      footer: 'Shizuka !! • Community Levels'
    },
    '/anime': {
      title: '✨ Anime Quote & GIF • Shizuka !!',
      description: '*"Whatever you lose, you\'ll find it again. But what you throw away you\'ll never get back."* — Kenshin Himura',
      footer: 'Shizuka !! • Anime Hub'
    }
  },
  'ultra-music': {
    '/play': {
      title: '🎵 Now Streaming • SONIC',
      description: '🎶 **Alan Walker, Sabrina Carpenter & Farruko - On My Way**\n`[0:48 ▬▬▬▬▬▬▬▬▬▬▬▬ 3:36]`\nBitrate: **320kbps Lossless** | Volume: `90%`',
      fields: [
        { name: 'Requested By', value: '@MusicLover', inline: true },
        { name: 'Voice Channel', value: '🔊 Lounge Voice #1', inline: true }
      ],
      footer: 'SONIC • High-Fidelity Audio'
    },
    '/queue': {
      title: '📜 Up Next in Voice Queue • SONIC',
      description: '1. **Starboy** - The Weeknd `[3:50]`\n2. **Blinding Lights** - The Weeknd `[3:20]`\n3. **Faded** - Alan Walker `[3:32]`',
      fields: [
        { name: 'Queue Length', value: '18 Songs (1 hr 12 min)', inline: true },
        { name: 'Loop', value: '🔂 Track Loop Active', inline: true }
      ],
      footer: 'SONIC • Lossless Player'
    },
    '/bassboost': {
      title: '🔊 Bass Boost Equalizer • SONIC',
      description: 'Equalizer preset adjusted: **Extreme Bass Boost (+8dB)**.\nSound hardware filter applied in real time with 0 audio lag.',
      footer: 'SONIC • Sound Enhancer'
    },
    '/247': {
      title: '📻 24/7 Voice Channel Mode • SONIC',
      description: '**24/7 Mode is now ENABLED!**\nSONIC will stay connected in <#Lounge Voice #1> indefinitely, even when the channel is empty.',
      footer: 'SONIC • Non-Stop Radio'
    }
  }
};

export const DiscordSimulator: React.FC<DiscordSimulatorProps> = ({
  bots,
  activeBotId,
  onSelectBot
}) => {
  const activeBot = bots.find((b) => b.id === activeBotId) || bots[0];
  const [activeChannelId, setActiveChannelId] = useState<string>(activeBot.id);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES[activeBot.id] || []);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // When active bot changes from outside (e.g. BotCardGrid)
  useEffect(() => {
    setActiveChannelId(activeBot.id);
    setMessages(INITIAL_MESSAGES[activeBot.id] || []);
  }, [activeBot.id]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChannelSwitch = (botId: string, channelId: string) => {
    onSelectBot(botId);
    setActiveChannelId(channelId);
    setMessages(INITIAL_MESSAGES[botId] || []);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add user's command message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      name: 'ServerOwner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      time: 'Just now',
      text: trimmed
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses = BOT_PRESET_RESPONSES[activeBot.id] || {};
      const matched = responses[trimmed.toLowerCase()];

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        name: activeBot.name,
        avatar: activeBot.avatar,
        isBot: true,
        time: 'Just now',
        embed: matched || {
          title: `🤖 Command Executed • ${trimmed}`,
          description: `Executed slash command **${trimmed}** successfully.\nAll arguments validated by the **AnuragLabs Gateway**.`,
          fields: [
            { name: 'Bot Name', value: activeBot.name, inline: true },
            { name: 'Category', value: activeBot.category, inline: true },
            { name: 'Execution Latency', value: '18ms (Zero Lag)', inline: true }
          ],
          footer: `Add ${activeBot.name} to your server to enable full automated actions.`
        }
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 280);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES[activeBot.id] || []);
  };

  return (
    <section id="playground" className="section discord-simulator-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Interactive Live Studio</span>
          <h2 className="section-title">Test Any Bot in Authentic Discord UI</h2>
          <p className="section-desc">
            Try out slash commands, tournament brackets, auto-mod shields, and 320kbps music streaming in this simulated Discord environment before adding them to your server.
          </p>
        </div>

        {/* Master Discord Application Window Frame */}
        <div className="discord-app-frame">
          {/* Top Titlebar */}
          <div className="discord-app-titlebar">
            <div className="titlebar-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="titlebar-center">
              <span className="titlebar-guild-icon">⚡</span>
              <span className="titlebar-guild-name">AnuragLabs Testing Guild</span>
              <span className="titlebar-verified">✓</span>
            </div>
            <div className="titlebar-status">
              <span className="status-dot-pulse" />
              <span className="status-text">3 Bots Connected • Gateway: 18ms</span>
            </div>
          </div>

          <div className="discord-app-body">
            {/* Left Channel & Bot Switcher Sidebar */}
            <aside className="discord-app-sidebar">
              <div className="guild-banner-box">
                <div className="guild-title-row">
                  <span className="guild-brand-name">AnuragLabs Hub</span>
                  <span className="guild-badge">COMMUNITY</span>
                </div>
                <div className="guild-stat-sub">29,500+ Active Guilds</div>
              </div>

              {/* Text Channels List */}
              <div className="sidebar-section-header">
                <span>TEXT CHANNELS</span>
                <span className="sidebar-add-icon">+</span>
              </div>

              <div className="sidebar-channels">
                {BOT_CHANNELS.map((ch) => {
                  const isActive = activeChannelId === ch.id;
                  const matchingBot = bots.find((b) => b.id === ch.botId);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      className={`channel-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleChannelSwitch(ch.botId, ch.id)}
                    >
                      <span className="channel-hash">#</span>
                      <span className="channel-name">{ch.name}</span>
                      {matchingBot && (
                        <span
                          className="channel-bot-dot"
                          style={{ backgroundColor: matchingBot.accentColor }}
                          title={matchingBot.name}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Voice Channels Section */}
              <div className="sidebar-section-header" style={{ marginTop: '1rem' }}>
                <span>VOICE CHANNELS</span>
              </div>
              <div className="sidebar-voice-item">
                <span className="voice-icon">🔊</span>
                <span className="voice-name">Lounge 24/7</span>
                <span className="voice-live-badge">320kbps</span>
              </div>
              <div className="voice-connected-user">
                <img
                  src={bots.find((b) => b.id === 'ultra-music')?.avatar}
                  alt="Sonic"
                  className="voice-bot-avatar"
                />
                <span className="voice-bot-name">SONIC</span>
                <span className="voice-wave-anim">
                  <span />
                  <span />
                  <span />
                </span>
              </div>

              {/* Sidebar Active Bot Card */}
              <div className="sidebar-active-bot-card">
                <div className="active-bot-card-top">
                  <img src={activeBot.avatar} alt={activeBot.name} className="active-bot-card-avatar" />
                  <div>
                    <div className="active-bot-card-name">{activeBot.name}</div>
                    <span className="active-bot-card-badge">{activeBot.category}</span>
                  </div>
                </div>
                <a
                  href={activeBot.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm btn-block"
                  style={{ marginTop: '0.6rem' }}
                >
                  Invite to Server →
                </a>
              </div>
            </aside>

            {/* Main Chat Panel */}
            <main className="discord-app-main">
              {/* Channel Header */}
              <div className="discord-chat-header">
                <div className="chat-header-left">
                  <span className="chat-header-hash">#</span>
                  <span className="chat-header-channel">
                    {BOT_CHANNELS.find((c) => c.id === activeChannelId)?.name || 'bot-playground'}
                  </span>
                  <span className="chat-header-divider">|</span>
                  <span className="chat-header-topic">
                    {BOT_CHANNELS.find((c) => c.id === activeChannelId)?.topic}
                  </span>
                </div>

                <div className="chat-header-actions">
                  <button
                    type="button"
                    className="chat-header-btn"
                    onClick={handleResetChat}
                    title="Reset simulation"
                  >
                    Reset Chat
                  </button>
                  <a
                    href={activeBot.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-header-invite-btn"
                  >
                    Invite {activeBot.name}
                  </a>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="discord-chat-feed" ref={chatBodyRef}>
                {messages.map((m) => (
                  <div key={m.id} className="discord-feed-msg">
                    <img src={m.avatar} alt={m.name} className="discord-feed-avatar" />
                    <div className="discord-feed-content">
                      <div className="discord-feed-meta">
                        <span className="feed-username">{m.name}</span>
                        {m.isBot && <span className="feed-bot-badge">BOT</span>}
                        <span className="feed-timestamp">{m.time}</span>
                      </div>

                      {m.text && <div className="discord-feed-text">{m.text}</div>}

                      {m.embed && (
                        <div
                          className="discord-feed-embed"
                          style={{ borderLeftColor: activeBot.accentColor }}
                        >
                          {m.embed.title && (
                            <h4 className="feed-embed-title">{m.embed.title}</h4>
                          )}
                          {m.embed.description && (
                            <p className="feed-embed-desc">{m.embed.description}</p>
                          )}
                          {m.embed.fields && m.embed.fields.length > 0 && (
                            <div className="feed-embed-fields-grid">
                              {m.embed.fields.map((f, i) => (
                                <div key={i} className="feed-embed-field">
                                  <span className="field-key">{f.name}</span>
                                  <span className="field-value">{f.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {m.embed.footer && (
                            <div className="feed-embed-footer">
                              <span>{m.embed.footer}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="discord-typing-indicator">
                    <span className="typing-dots">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="typing-text">{activeBot.name} is typing...</span>
                  </div>
                )}
              </div>

              {/* Preset Slash Commands Bar */}
              <div className="discord-preset-bar">
                <span className="preset-label">Quick Slash Commands:</span>
                <div className="preset-chips-scroll">
                  {activeBot.topCommands.map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      className="preset-cmd-chip"
                      onClick={() => handleCommand(cmd)}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Authentic Full-Width Discord Chat Input Bar */}
              <div className="discord-input-container">
                <form className="discord-input-pill" onSubmit={onSubmit}>
                  <button type="button" className="input-btn-plus" title="Add attachment" aria-label="Add attachment">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                    </svg>
                  </button>

                  <input
                    type="text"
                    className="discord-real-input"
                    placeholder={`Message #${BOT_CHANNELS.find((c) => c.id === activeChannelId)?.name || 'bot-playground'}... (Press Enter or pick a command)`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    aria-label="Discord message input"
                  />

                  <div className="input-right-actions">
                    <button
                      type="submit"
                      className="input-btn-send"
                      disabled={!inputValue.trim()}
                      title="Send message"
                      aria-label="Send message"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};
