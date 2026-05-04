import { useEffect, useRef, useState, useMemo } from "react";
import DomeGallery from "../ui/domegallery";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { withAlpha } from "../../hooks/useThemeColors";

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    color: '#f472b6', // pink-400
    items: ['Python', 'SQL', 'C#', 'ASP.NET Core', 'Pandas', 'NumPy']
  },
  {
    title: 'Data Engineering & ETL',
    color: '#a78bfa', // violet-400
    items: ['Apache Airflow', 'Docker', 'PostgreSQL', 'SQL Server', 'Kafka', 'Sqoop', 'Flume']
  },
  {
    title: 'Big Data & Streaming',
    color: '#60a5fa', // blue-400
    items: ['Hadoop / HDFS', 'Apache Spark', 'Apache Flink', 'Apache Kafka', 'Apache Zookeeper', 'Elasticsearch']
  },
  {
    title: 'BI & Visualization',
    color: '#34d399', // emerald-400
    items: ['Power BI', 'Tableau', 'Streamlit', 'Plotly', 'Looker Studio', 'IBM Cognos']
  },
  {
    title: 'Data Formats',
    color: '#fb923c', // orange-400
    items: ['CSV', 'JSON', 'Parquet', 'Avro']
  },
  {
    title: 'Cloud & Dev Tools',
    color: '#38bdf8', // sky-400
    items: ['AWS EC2', 'AWS IAM', 'AWS VPC', 'AWS S3', 'Git/GitHub', 'Postman', 'Jupyter Notebook', 'Swagger']
  }
];

/**
 * Generates an SVG data URI for a single skill label tile.
 * Each tile has a colored top-accent bar and the skill name centered.
 */
function makeSkillSvg(label: string, accentColor: string, isDark: boolean): string {
  const bg = isDark ? '#1f1f2e' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const border = isDark ? '#3b3b52' : '#fce7f3';

  // Wrap long labels onto two lines
  const words = label.split(' ');
  let line1 = label;
  let line2 = '';
  if (label.length > 12 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${accentColor}" flood-opacity="0.25"/>
    </filter>
  </defs>
  <!-- Card background -->
  <rect width="160" height="160" rx="20" ry="20" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
  <!-- Accent top bar -->
  <rect x="0" y="0" width="160" height="6" rx="3" ry="3" fill="${accentColor}"/>
  <!-- Accent dot -->
  <circle cx="80" cy="52" r="16" fill="${accentColor}" opacity="0.15"/>
  <circle cx="80" cy="52" r="8" fill="${accentColor}" opacity="0.6"/>
  <!-- Skill text -->
  ${line2
    ? `<text x="80" y="96" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="${textColor}">${line1}</text>
       <text x="80" y="116" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="${textColor}">${line2}</text>`
    : `<text x="80" y="104" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="${textColor}">${line1}</text>`
  }
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const Skills = () => {
  const [scale, setScale] = useState(0.5);
  const sectionRef = useRef<HTMLDivElement>(null);
  const domeContainerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  // Build the images array for DomeGallery from all skill items
  const domeImages = useMemo(() => {
    return skillCategories.flatMap((cat) =>
      cat.items.map((skill) => ({
        src: makeSkillSvg(skill, cat.color, isDarkMode),
        alt: skill,
      }))
    );
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let visibilityRatio = 0;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionHeight = rect.height;
        const sectionCenter = rect.top + sectionHeight / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter);
        const maxDistance = windowHeight / 2 + sectionHeight / 2;

        visibilityRatio = 1 - (distanceFromCenter / maxDistance);
        visibilityRatio = Math.max(0, Math.min(1, visibilityRatio));
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio);
      }

      const minScale = 0.5;
      const maxScale = 1;
      const finalScale = minScale + (maxScale - minScale) * visibilityRatio;
      setScale(finalScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative" style={{
      background: themeColors.background.sections?.skills || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Gradient overlay for smooth transition from previous section */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '300px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>
          Skills
        </h2>
        <p className="max-w-3xl mx-auto text-center mb-12 text-sm md:text-base" style={{ color: themeColors.text.secondary }}>
          Practical data engineering, analytics, and backend skills grounded in projects for gold price forecasting, job market analytics, clinic data integration, and AI-powered applications.
        </p>

        {/* Category cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border p-6 bg-white/90 dark:bg-gray-900/90 border-pink-100 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                {/* Color dot matching the dome tile accent */}
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ background: category.color }}
                />
                <h3 className="text-xl font-semibold" style={{ color: themeColors.text.primary }}>
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: themeColors.text.secondary }}>
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ background: category.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DomeGallery with skill SVG tiles */}
        <div
          ref={domeContainerRef}
          className="relative w-full mt-12"
          style={{
            minHeight: '520px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <DomeGallery
            images={domeImages}
            grayscale={false}
            imageBorderRadius="16px"
            openedImageBorderRadius="20px"
            openedImageWidth="260px"
            openedImageHeight="260px"
          />

          {/* Faded edges overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDarkMode
                ? `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.dark[900], 0.1)} 70%, ${withAlpha(themeColors.colors.dark[900], 0.6)} 90%, ${withAlpha(themeColors.colors.dark[900], 0.8)} 100%)`
                : `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.pink[50], 0.1)} 70%, ${withAlpha(themeColors.colors.pink[50], 0.6)} 90%, ${withAlpha(themeColors.colors.pink[50], 0.8)} 100%)`,
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
