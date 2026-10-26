'use client';

import React, { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'Is this bot free to add to my Discord server?',
      a: 'Yes! The bot is completely free to add to any server you own or manage. All core moderation, music streaming, and leveling features are accessible without any paywalls.'
    },
    {
      q: 'Do I have to grant Administrator permissions?',
      a: 'No. Administrator permission is strictly optional. You can use our interactive Permission Calculator above to select only the exact permissions needed (e.g. Send Messages, Embed Links, Connect & Speak).'
    },
    {
      q: 'Why isn\'t the bot responding to commands in my server?',
      a: 'Make sure the bot has the View Channel and Send Messages permissions in that specific channel, and verify that the bot\'s role is not blocked by Discord category permission overrides.'
    },
    {
      q: 'How do I put my own Discord Client ID on this website?',
      a: 'Click the gear icon in the bottom right corner (or in the navigation bar) to open the Settings Drawer. Simply paste your Discord Application / Client ID from the Discord Developer Portal, and all invite buttons will immediately update! You can also edit src/config/botConfig.ts directly.'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Common Inquiries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Have questions about permissions, privacy, or server integration? Find quick answers below.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFAQ(idx)}
                >
                  <span>{faq.q}</span>
                  <svg
                    className="faq-chevron"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="faq-answer">{faq.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
