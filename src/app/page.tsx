'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { initialBotsList, ecosystemInfo } from '@/config/botsData';
import { initialBotConfig } from '@/config/botConfig';
import { DiscordBotItem } from '@/types/bot';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BotCardGrid } from '@/components/BotCardGrid';
import { DiscordSimulator } from '@/components/DiscordSimulator';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { CommandExplorer } from '@/components/CommandExplorer';
import { SetupGuide } from '@/components/SetupGuide';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

export default function Home() {
  const [bots] = useState<DiscordBotItem[]>(initialBotsList);
  const [activeBotId, setActiveBotId] = useState<string>(initialBotsList[0].id);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hydrate persistent theme from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('anurag_bot_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (err) {
      console.warn('Could not read from localStorage', err);
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('anurag_bot_theme', nextTheme);
    } catch {}
    showToast(`Switched to ${nextTheme === 'light' ? 'Porcelain Light' : 'Midnight Dark'} theme`);
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const handleCopyInviteUrl = (url: string, botName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => showToast(`✅ ${botName} invite link copied!`))
        .catch(() => fallbackCopy(url, botName));
    } else {
      fallbackCopy(url, botName);
    }
  };

  const fallbackCopy = (text: string, botName: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand('copy');
      showToast(`✅ ${botName} invite link copied!`);
    } catch {
      showToast('⚠️ Please copy URL manually.');
    }
    document.body.removeChild(el);
  };

  const handleSelectBotForPlayground = (bot: DiscordBotItem) => {
    setActiveBotId(bot.id);
    const playgroundEl = document.getElementById('playground');
    if (playgroundEl) {
      playgroundEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Loaded ${bot.name} into Live Simulator!`);
  };

  return (
    <main>
      <Navbar
        suiteName={ecosystemInfo.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      <Hero
        totalBotsCount={bots.length}
        supportServerUrl={ecosystemInfo.supportServerUrl}
      />

      {/* Multi-Bot Showcase with Direct Invites */}
      <BotCardGrid
        bots={bots}
        onSelectBotForPlayground={handleSelectBotForPlayground}
        onCopyInviteUrl={handleCopyInviteUrl}
      />

      {/* Interactive Discord Simulator with Multi-Bot Switching */}
      <DiscordSimulator
        bots={bots}
        activeBotId={activeBotId}
        onSelectBot={setActiveBotId}
      />

      {/* Ecosystem Bento Grid */}
      <FeaturesGrid features={initialBotConfig.features} />

      {/* Command Explorer */}
      <CommandExplorer commands={initialBotConfig.commands} />

      {/* Onboarding Guide */}
      <SetupGuide />

      {/* Frequently Asked Questions */}
      <FAQAccordion />

      {/* Bottom CTA Banner */}
      <div className="container">
        <div className="cta-banner">
          <h2 className="cta-title">Ready to Supercharge Your Discord Community?</h2>
          <p className="cta-desc">
            Select any bot above and invite it directly to your server in seconds. 100% verified, reliable, and free to get started.
          </p>
          <a
            href="#bots"
            className="btn btn-primary btn-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Choose a Bot to Invite
          </a>
        </div>
      </div>

      <Footer
        suiteName={ecosystemInfo.name}
        supportServerUrl={ecosystemInfo.supportServerUrl}
        githubUrl={ecosystemInfo.githubUrl}
      />

      <Toast message={toastMessage} />
    </main>
  );
}
