import React from 'react';

export const SetupGuide: React.FC = () => {
  return (
    <section id="setup" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Quick Onboarding</span>
          <h2 className="section-title">Up and Running in 60 Seconds</h2>
          <p className="section-desc">
            Adding the bot to your Discord server is completely frictionless.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Click &quot;Add to Discord&quot;</h3>
            <p className="step-desc">
              Use our built-in Invite Generator above to generate your customized OAuth2 URL and select the server you wish to join.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Authorize &amp; Review Roles</h3>
            <p className="step-desc">
              Confirm permissions in the official Discord popup. Make sure to position the bot&apos;s role high in your server settings for full auto-mod functionality.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Type <code>/help</code> in Chat</h3>
            <p className="step-desc">
              Your bot is live! Type <code>/help</code> in any text channel to configure auto-mod rules, play high-fi music, or test AI prompts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
