import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import awsCloudFoundationsBadge from '../../assets/badges/aws-academy-graduate-cloud-foundations-training-bad.png';
import ntiBigDataBadge from '../../assets/badges/nti-big-data-badge.svg';
import dataEngineeringEssentialsBadge from '../../assets/badges/data-engineering-essentials.png';
import dataWarehouseFundamentalsBadge from '../../assets/badges/data-warehouse-fundamentals.png';
import certificatePlaceholder from '../../assets/badges/certificate-placeholder.svg';

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const badges = [
    {
      id: 'aws-cloud-foundations',
      image: awsCloudFoundationsBadge,
      alt: 'AWS Academy Cloud Foundations Badge',
      title: 'AWS Academy Cloud Foundations',
      subtitle: 'Academy Graduate',
      credentialUrl: 'https://www.credly.com/badges/your-credential-id/public_url',
      status: 'completed'
    },
    {
      id: 'nti-big-data-scholarship',
      image: ntiBigDataBadge,
      alt: 'NTI Big Data Engineering Scholarship Badge',
      title: 'NTI Big Data Engineering Scholarship',
      subtitle: 'NTI HireReady Program',
      credentialUrl: '',
      status: 'completed'
    }
  ];

  const credentials = [
    {
      id: 'intro-data-engineering',
      image: dataEngineeringEssentialsBadge,
      alt: 'Introduction to Data Engineering Certificate',
      title: 'Introduction to Data Engineering',
      subtitle: 'IBM / Coursera',
      issuer: 'IBM',
      issued: '03/2026',
      expires: '',
      credentialId: '',
      credentialUrl: '',
      status: 'completed'
    },
    {
      id: 'dwh-fundamentals',
      image: dataWarehouseFundamentalsBadge,
      alt: 'Datawarehouse Fundamentals Certificate',
      title: 'Datawarehouse Fundamentals',
      subtitle: 'IBM / Coursera',
      issuer: 'IBM',
      issued: '03/2026',
      expires: '',
      credentialId: '',
      credentialUrl: '',
      status: 'completed'
    },
    {
      id: 'data-analysis-codveda',
      image: certificatePlaceholder,
      alt: 'Data Analysis Credential',
      title: 'Data Analysis',
      subtitle: 'Codveda Technologies',
      issuer: 'Codveda',
      issued: '04/2026',
      expires: '',
      credentialId: '',
      credentialUrl: '',
      status: 'completed'
    },
    {
      id: 'corelia-data-engineer-intern',
      image: certificatePlaceholder,
      alt: 'Corelia Internship Credential',
      title: 'Data Engineer Intern',
      subtitle: 'Corelia',
      issuer: 'Corelia',
      issued: '03/2026',
      expires: '',
      credentialId: '',
      credentialUrl: '',
      status: 'completed'
    },
    {
      id: 'aspnet-route',
      image: certificatePlaceholder,
      alt: 'ASP.NET Certification',
      title: 'ASP.NET Certification',
      subtitle: 'Route',
      issuer: 'Route',
      issued: '10/2024',
      expires: '',
      credentialId: '',
      credentialUrl: '',
      status: 'completed'
    }
  ];

  return (
    <section id="certifications" className="py-8 relative" style={{
      background: themeColors.background.sections?.certifications || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-6" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Certifications & Credentials</h2>

        <div className="max-w-6xl mx-auto">
          {/* AWS Certifications */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {badges.map((badge) => {
              const BadgeComponent = () => (
                <div className="flex flex-col items-center group">
                  <div className="mb-4">
                    <img
                      src={badge.image}
                      alt={badge.alt}
                      className="w-32 h-32 md:w-40 md:h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      width="160"
                      height="160"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                  <h3 className="text-center text-sm font-medium mb-2" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>
                    {badge.title}
                  </h3>
                  <p className="text-center text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>
                    {badge.subtitle || (badge.status === 'in-progress' ? 'In Progress!' : '')}
                  </p>
                </div>
              );

              return badge.credentialUrl ? (
                <a
                  key={badge.id}
                  href={badge.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none"
                  style={{ outline: 'none' }}
                  onFocus={(e) => e.currentTarget.blur()}
                  aria-label={`View ${badge.title} credential`}
                >
                  <BadgeComponent />
                </a>
              ) : (
                <div key={badge.id} className="block">
                  <BadgeComponent />
                </div>
              );
            })}
          </div>

          {/* CITI Program Certifications */}
          <div className="flex flex-wrap justify-center gap-8">
            {credentials.map((credential) => {
              const BadgeComponent = () => (
                <div className="flex flex-col items-center group">
                  <div className="mb-4">
                    <img
                      src={credential.image}
                      alt={credential.alt}
                      className="w-32 h-32 md:w-40 md:h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      width="160"
                      height="160"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                  <h3 className="text-center text-sm font-medium mb-2" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>
                    {credential.title}
                  </h3>
                  <p className="text-center text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>
                    {credential.subtitle || (credential.status === 'in-progress' ? 'In Progress!' : '')}
                  </p>
                </div>
              );

              return credential.credentialUrl ? (
                <a
                  key={credential.id}
                  href={credential.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none"
                  style={{ outline: 'none' }}
                  onFocus={(e) => e.currentTarget.blur()}
                  aria-label={`View ${credential.title} credential`}
                >
                  <BadgeComponent />
                </a>
              ) : (
                <div key={credential.id} className="block">
                  <BadgeComponent />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Bottom gradient overlay for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1
        }}
      />
    </section>
  );
};

export default Certifications;