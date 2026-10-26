export interface PermissionItem {
  id: string;
  name: string;
  category: 'General' | 'Text' | 'Voice';
  bit: number;
  danger?: boolean;
  desc: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface SampleEmbed {
  title: string;
  description: string;
  fields?: EmbedField[];
  footer?: string;
}

export interface CommandItem {
  name: string;
  category: 'General' | 'Moderation' | 'Music' | 'AI & Fun' | 'Utility' | 'Tournaments' | 'Community';
  description: string;
  syntax: string;
  permissions: string;
  botId?: string;
  botName?: string;
  sampleResponse?: SampleEmbed;
}

export interface BotStats {
  servers: string;
  users: string;
  commandsRun?: string;
  uptime: string;
}

export type BotCategory = 'All' | 'Tournaments' | 'Community' | 'Music';

export interface BotDetailedFeature {
  title: string;
  description: string;
  iconType: 'trophy' | 'shield' | 'music' | 'zap' | 'users' | 'chart' | 'settings' | 'heart';
  badge?: string;
}

export interface DiscordBotItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  avatar: string;
  accentColor: string;
  category: BotCategory;
  inviteUrl: string; // The DIRECT Discord OAuth2 authorization URL
  supportServerUrl?: string;
  stats: BotStats;
  tags: string[];
  featured?: boolean;
  prefixOrSlash: string;
  topCommands: string[];
  detailedFeatures?: BotDetailedFeature[];
  detailedCommands?: CommandItem[];
}

export interface BotConfig {
  clientId: string;
  name: string;
  tagline: string;
  avatar: string;
  accentColor: string;
  version: string;
  supportServerUrl: string;
  githubUrl: string;
  docsUrl: string;
  stats: BotStats;
  defaultScopes: string[];
  features: FeatureItem[];
  permissionsList: PermissionItem[];
  presets: Record<string, string[]>;
  commands: CommandItem[];
}
