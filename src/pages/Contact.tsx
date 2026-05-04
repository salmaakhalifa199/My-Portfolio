import React from 'react';
import { Mail, Github, Linkedin, Twitter, BookOpen, BarChart3, PieChart } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import Aurora from '../components/ui/aurora';
import BackButton from '../components/BackButton';
import { socialLinks } from '../config/socialLinks';

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main aria-label="Contact page" className="min-h-screen py-20 transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: themeColors.background.primary }}>
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0" style={{ opacity: isDarkMode ? 1 : 0.3 }}>
        <Aurora
          colorStops={isDarkMode ? [themeColors.primary, themeColors.colors.special.aurora.dark, themeColors.secondary] : [themeColors.colors.special.aurora.light[1], themeColors.colors.special.aurora.light[2], themeColors.colors.special.aurora.light[3]]}
          blend={isDarkMode ? 0.3 : 0.25}
          amplitude={isDarkMode ? 0.8 : 0.6}
          speed={0.3}
        />
      </div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Back Button */}
        <BackButton 
          to="/" 
          scrollToId="" 
          label="Back to Home" 
          ariaLabel="Navigate back to homepage" 
        />

        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>Let's Connect!</h1>
          <p className="text-lg" style={{ color: themeColors.text.secondary }}>
          </p>
        </header>

        {/* Contact Cards */}
        <section className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto" aria-label="Contact methods">
          
          {/* Email Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="email-heading">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="email-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Email</h3>
            <a 
              href={`mailto:${socialLinks.email}`}
              aria-label={`Send email to ${socialLinks.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink
              }}
            >
              Send Email
            </a>
            <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.email}</p>
          </article>

          {/* GitHub Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="github-heading">
            <div className="flex justify-center mb-4">
              <Github className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="github-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>GitHub</h3>
            <a 
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub profile at ${socialLinks.display.github} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink
              }}
            >
              View Profile
            </a>
            <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.github}</p>
          </article>

          {/* LinkedIn Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="linkedin-heading">
            <div className="flex justify-center mb-4">
              <Linkedin className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="linkedin-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>LinkedIn</h3>
            <a 
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on LinkedIn at ${socialLinks.display.linkedin} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink
              }}
            >
              Connect
            </a>
            <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.linkedin}</p>
          </article>

          {/* Medium Card */}
          {socialLinks.medium && (
            <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="medium-heading">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
              </div>
              <h3 id="medium-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Medium</h3>
              <a 
                href={socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read articles on Medium at ${socialLinks.display.medium} (opens in new tab)`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: themeColors.interactive.primary,
                  color: themeColors.text.pink
                }}
              >
                Read Articles
              </a>
              <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.medium}</p>
            </article>
          )}

          {/* Twitter Card */}
          {socialLinks.twitter && (
            <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="twitter-heading">
              <div className="flex justify-center mb-4">
                <Twitter className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
              </div>
              <h3 id="twitter-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Twitter</h3>
              <a 
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow on Twitter at ${socialLinks.display.twitter} (opens in new tab)`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: themeColors.interactive.primary,
                  color: themeColors.text.pink
                }}
              >
                Follow
              </a>
              <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.twitter}</p>
            </article>
          )}

          {/* Kaggle Card */}
          {socialLinks.kaggle && (
            <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="kaggle-heading">
              <div className="flex justify-center mb-4">
                <BarChart3 className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
              </div>
              <h3 id="kaggle-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Kaggle</h3>
              <a 
                href={socialLinks.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Kaggle profile at ${socialLinks.display.kaggle} (opens in new tab)`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: themeColors.interactive.primary,
                  color: themeColors.text.pink
                }}
              >
                View Profile
              </a>
              <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.kaggle}</p>
            </article>
          )}

          {/* Tableau Card */}
          {socialLinks.tableau && (
            <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="tableau-heading">
              <div className="flex justify-center mb-4">
                <PieChart className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
              </div>
              <h3 id="tableau-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Tableau</h3>
              <a 
                href={socialLinks.tableau}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Tableau Public at ${socialLinks.display.tableau} (opens in new tab)`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: themeColors.interactive.primary,
                  color: themeColors.text.pink
                }}
              >
                View Dashboards
              </a>
              <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.tableau}</p>
            </article>
          )}

        </section>
      </div>
    </main>
  );
};

export default Contact;