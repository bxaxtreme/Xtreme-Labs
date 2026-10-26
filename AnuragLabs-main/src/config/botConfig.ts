import { BotConfig } from '@/types/bot';

export const initialBotConfig: BotConfig = {
  clientId: "123456789012345678", // Default demo Client ID (can be customized via settings or code)
  name: "AnuragLabs",
  tagline: "The all-in-one Discord bot engineered for supreme moderation, seamless music streaming, and intelligent community automation.",
  avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
  accentColor: "#5865F2",
  version: "v2.5.0",

  supportServerUrl: "https://discord.gg/your-support-server",
  githubUrl: "https://github.com/anurag/discord-bot",
  docsUrl: "#commands",

  stats: {
    servers: "1,420+",
    users: "185,000+",
    commandsRun: "3.8M+",
    uptime: "99.98%"
  },

  defaultScopes: ["bot", "applications.commands"],

  features: [
    {
      id: "moderation",
      title: "Advanced Auto-Moderation",
      description: "Automated anti-spam, anti-raid, phishing link blocker, and granular warn/mute/timeout actions with comprehensive audit logging.",
      badge: "Security"
    },
    {
      id: "music",
      title: "Lossless High-Fi Music",
      description: "Stream crystal clear audio with zero latency. Supports YouTube, Spotify, SoundCloud, 24/7 radio mode, volume control, and custom audio filters.",
      badge: "Entertainment"
    },
    {
      id: "ai",
      title: "Built-in AI Assistant",
      description: "Harness LLM intelligence directly in your channels. Chat, ask questions, summarize long discussions, or generate ideas with simple slash commands.",
      badge: "AI Powered"
    },
    {
      id: "leveling",
      title: "Dynamic Leveling & Economy",
      description: "Engage server members with customizable XP cards, leaderboards, role rewards, server currency, and community mini-games.",
      badge: "Engagement"
    },
    {
      id: "tickets",
      title: "Support Ticket System",
      description: "Multi-category support tickets with private thread creation, transcript exports, and auto-closing inactive inquiries.",
      badge: "Support"
    },
    {
      id: "utility",
      title: "Custom Embeds & Welcomes",
      description: "Design rich greeting banners, reaction roles, server analytics, and interactive polling widgets with button interactions.",
      badge: "Utility"
    }
  ],

  permissionsList: [
    // General Server Permissions
    { id: "ADMINISTRATOR", name: "Administrator", category: "General", bit: 8, danger: true, desc: "Full unrestricted access (overrides channel permissions)." },
    { id: "MANAGE_GUILD", name: "Manage Server", category: "General", bit: 32, desc: "Edit server settings, name, region, and widgets." },
    { id: "MANAGE_ROLES", name: "Manage Roles", category: "General", bit: 268435456, desc: "Create, edit, and assign roles lower than the bot's role." },
    { id: "MANAGE_CHANNELS", name: "Manage Channels", category: "General", bit: 16, desc: "Create, edit, and delete server channels." },
    { id: "KICK_MEMBERS", name: "Kick Members", category: "General", bit: 2, desc: "Kick abusive users from the server." },
    { id: "BAN_MEMBERS", name: "Ban Members", category: "General", bit: 4, desc: "Ban problematic users from rejoining." },
    { id: "VIEW_AUDIT_LOG", name: "View Audit Log", category: "General", bit: 128, desc: "View server event history and actions." },
    { id: "MODERATE_MEMBERS", name: "Timeout Members", category: "General", bit: 1099511627776, desc: "Place members in temporary timeouts." },

    // Text Channel Permissions
    { id: "VIEW_CHANNEL", name: "View Channels", category: "Text", bit: 1024, desc: "Read and view designated text channels." },
    { id: "SEND_MESSAGES", name: "Send Messages", category: "Text", bit: 2048, desc: "Send messages in text channels." },
    { id: "SEND_MESSAGES_IN_THREADS", name: "Send in Threads", category: "Text", bit: 274877906944, desc: "Send messages inside forum and thread posts." },
    { id: "EMBED_LINKS", name: "Embed Links", category: "Text", bit: 16384, desc: "Display rich embed previews and info cards." },
    { id: "ATTACH_FILES", name: "Attach Files", category: "Text", bit: 32768, desc: "Upload images, music artwork, and diagnostic logs." },
    { id: "READ_MESSAGE_HISTORY", name: "Read Message History", category: "Text", bit: 65536, desc: "Access previous chat messages for moderation." },
    { id: "MENTION_EVERYONE", name: "Mention Everyone", category: "Text", bit: 131072, desc: "Send notifications to @everyone or @here (opt-in)." },
    { id: "USE_EXTERNAL_EMOJIS", name: "Use External Emojis", category: "Text", bit: 262144, desc: "Utilize custom brand emojis from other servers." },
    { id: "ADD_REACTIONS", name: "Add Reactions", category: "Text", bit: 64, desc: "React to messages with emoji feedback." },
    { id: "USE_APPLICATION_COMMANDS", name: "Use Slash Commands", category: "Text", bit: 2147483648, desc: "Handle modern slash / command interactions." },
    { id: "MANAGE_MESSAGES", name: "Manage Messages", category: "Text", bit: 8192, desc: "Delete spam and purge channel messages." },

    // Voice Permissions
    { id: "CONNECT", name: "Connect to Voice", category: "Voice", bit: 1048576, desc: "Join voice channels for music streaming." },
    { id: "SPEAK", name: "Speak in Voice", category: "Voice", bit: 2097152, desc: "Play music and voice audio to listeners." },
    { id: "MUTE_MEMBERS", name: "Mute Members", category: "Voice", bit: 4194304, desc: "Server mute members in voice channels." },
    { id: "DEAFEN_MEMBERS", name: "Deafen Members", category: "Voice", bit: 8388608, desc: "Server deafen members in voice channels." },
    { id: "MOVE_MEMBERS", name: "Move Members", category: "Voice", bit: 16777216, desc: "Move members between voice rooms." }
  ],

  presets: {
    recommended: [
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_MESSAGES_IN_THREADS",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "USE_EXTERNAL_EMOJIS",
      "ADD_REACTIONS",
      "USE_APPLICATION_COMMANDS",
      "CONNECT",
      "SPEAK",
      "MODERATE_MEMBERS",
      "MANAGE_MESSAGES"
    ],
    admin: [
      "ADMINISTRATOR"
    ],
    minimal: [
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "EMBED_LINKS",
      "READ_MESSAGE_HISTORY",
      "USE_APPLICATION_COMMANDS"
    ],
    moderation: [
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "EMBED_LINKS",
      "READ_MESSAGE_HISTORY",
      "USE_APPLICATION_COMMANDS",
      "MANAGE_MESSAGES",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "MODERATE_MEMBERS",
      "VIEW_AUDIT_LOG"
    ]
  },

  commands: [
    {
      name: "help",
      category: "General",
      description: "Shows all available commands, modules, and setup guides.",
      syntax: "/help [category]",
      permissions: "None",
      sampleResponse: {
        title: "🛡️ AnuragLabs • Command Directory",
        description: "Welcome! Here is your quick navigation guide. Select a module below to inspect commands:",
        fields: [
          { name: "🛡️ Moderation", value: "`/ban`, `/kick`, `/timeout`, `/purge`, `/automod`" },
          { name: "🎵 Music & Audio", value: "`/play`, `/skip`, `/queue`, `/volume`, `/lyrics`" },
          { name: "🤖 AI Assistant", value: "`/ask`, `/summarize`, `/imagine`" },
          { name: "📊 Leveling & XP", value: "`/rank`, `/leaderboard`, `/rewards`" }
        ],
        footer: "Use /help <command> for in-depth arguments."
      }
    },
    {
      name: "play",
      category: "Music",
      description: "Plays a song or playlist from YouTube, Spotify, or SoundCloud in your voice channel.",
      syntax: "/play <song-or-url>",
      permissions: "Connect, Speak",
      sampleResponse: {
        title: "🎵 Now Playing • Lossless High-Fi",
        description: "**Synthwave Boy - Midnight Drive (2026 Remaster)**\nRequested by **@Anurag**",
        fields: [
          { name: "Duration", value: "03:45", inline: true },
          { name: "Channel", value: "🔊 Lounge 01", inline: true },
          { name: "Next Up", value: "Neon Horizon (04:12)", inline: true }
        ],
        footer: "Volume: 85% • Audio Bitrate: 384kbps • Queue: 6 tracks"
      }
    },
    {
      name: "ban",
      category: "Moderation",
      description: "Bans a member from the server with an optional reason and deletes recent messages.",
      syntax: "/ban <@user> [reason] [delete_days]",
      permissions: "Ban Members",
      sampleResponse: {
        title: "🔨 Member Banned Successfully",
        description: "Target: **@spambot_99#1337** (`ID: 98127391823`)\nAction: **Permanent Ban**\nReason: *Automated anti-phishing rule trigger #49*",
        fields: [
          { name: "Moderator", value: "AnuragLabs (Auto-Shield)", inline: true },
          { name: "Messages Deleted", value: "Last 24 Hours", inline: true }
        ],
        footer: "Logged to #mod-audit-logs • Case #1042"
      }
    },
    {
      name: "timeout",
      category: "Moderation",
      description: "Temporarily restricts a member from sending messages or joining voice channels.",
      syntax: "/timeout <@user> <duration> [reason]",
      permissions: "Timeout Members",
      sampleResponse: {
        title: "⏳ Member Muted / Timed Out",
        description: "Target: **@toxic_user#0042**\nDuration: **1 Hour**\nReason: *Excessive capslock and spam in #general*",
        fields: [
          { name: "Expires In", value: "59 minutes 42 seconds", inline: true },
          { name: "Warnings Count", value: "3 Warnings", inline: true }
        ],
        footer: "Case #1043 • Action logged"
      }
    },
    {
      name: "ask",
      category: "AI & Fun",
      description: "Queries the built-in intelligent AI model for advice, code snippets, or explanations.",
      syntax: "/ask <prompt>",
      permissions: "None",
      sampleResponse: {
        title: "🤖 Neural AI Response",
        description: "Here is how to structure your Discord role hierarchy:\n\n1. Place the **AnuragLabs** role right below Server Owner/Admin.\n2. Ensure the bot has higher position than the roles it manages.\n3. Enable *Manage Roles* and *View Audit Log* for seamless auto-modding.",
        fields: [
          { name: "Model", value: "Gemini 3.7", inline: true },
          { name: "Latency", value: "142ms", inline: true }
        ],
        footer: "Powered by AI Core v2.5"
      }
    },
    {
      name: "rank",
      category: "Utility",
      description: "Displays your current level, experience points, and server rank card.",
      syntax: "/rank [@user]",
      permissions: "None",
      sampleResponse: {
        title: "⭐ Server Rank Card",
        description: "**Anurag** is currently ranked **#1** in this community!",
        fields: [
          { name: "Level", value: "Level 48", inline: true },
          { name: "Total XP", value: "24,850 / 26,000 XP", inline: true },
          { name: "Rank", value: "Master VIP", inline: true }
        ],
        footer: "Progress: [██████████░░] 92% to Level 49"
      }
    },
    {
      name: "purge",
      category: "Moderation",
      description: "Deletes a specified number of messages from the current channel (up to 100).",
      syntax: "/purge <count> [@user]",
      permissions: "Manage Messages",
      sampleResponse: {
        title: "🧹 Bulk Messages Purged",
        description: "Successfully cleared **50 messages** in <#general>.",
        fields: [
          { name: "Cleaned By", value: "@Anurag", inline: true },
          { name: "Time Taken", value: "0.82s", inline: true }
        ],
        footer: "Audit log updated"
      }
    },
    {
      name: "serverinfo",
      category: "Utility",
      description: "Shows detailed statistics about the current Discord server.",
      syntax: "/serverinfo",
      permissions: "None",
      sampleResponse: {
        title: "🏰 Community Headquarters • Server Info",
        description: "Created on: **October 14, 2021** (Over 4 years ago)\nOwner: **@Anurag**",
        fields: [
          { name: "Members", value: "12,450 (3,890 Online)", inline: true },
          { name: "Channels", value: "48 (32 Text, 16 Voice)", inline: true },
          { name: "Boost Level", value: "Level 3 (24 Boosts)", inline: true }
        ],
        footer: "Server ID: 89712398129381923"
      }
    }
  ]
};
