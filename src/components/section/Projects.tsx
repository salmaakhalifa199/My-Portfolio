import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ExternalLink, Code, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { socialLinks } from '../../config/socialLinks';
import { lightStars, darkStars, specialStars } from '../../assets/stars';

// ── Emoji project icons (always render, zero broken-image risk) ──────────────
const PROJECT_ICONS: Record<string, string> = {
  dataWarehouse: "🏗️",
  jobAnalytics:  "📊",
  goldForecast:  "📈",
  irisFlower:    "🌸",
  salaryPredict: "💰",
  healthcare:    "🏥",
  aiSkin:        "🤖",
  comingSoon:    "🚧",
};

// Emoji icon component — renders consistently in all browsers
const EmojiIcon = ({ icon, label }: { icon: string; label: string }) => (
  <div
    aria-label={label}
    role="img"
    style={{
      width: '48px',
      height: '48px',
      fontSize: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      flexShrink: 0,
      userSelect: 'none',
    }}
  >
    {icon}
  </div>
);

const Projects = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; image: string; isDragging: boolean }>>([]);
  const [draggedStar, setDraggedStar] = useState<number | null>(null);
  const [specialStar, setSpecialStar] = useState<{ x: number; y: number }>({ x: 85, y: 8 });
  const [isDraggingSpecial, setIsDraggingSpecial] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const projectsPerPage = 4;
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const generatedStars = Array.from({ length: 30 }, (_, i) => {
      let x, y;
      const zone = i % 4;
      if (zone === 0) { x = Math.random() * 90 + 5; y = Math.random() * 10; }
      else if (zone === 1) { x = Math.random() * 90 + 5; y = Math.random() * 10 + 90; }
      else if (zone === 2) { x = Math.random() * 15; y = Math.random() * 60 + 20; }
      else { x = Math.random() * 15 + 85; y = Math.random() * 60 + 20; }
      return {
        id: i, x: x!, y: y!,
        image: (isDarkMode ? darkStars : lightStars)[Math.floor(Math.random() * (isDarkMode ? darkStars : lightStars).length)],
        isDragging: false
      };
    });
    setStars(generatedStars);
  }, [isDarkMode]);

  // Special star drag
  const handleSpecialStarMouseDown = (e: React.MouseEvent) => { e.stopPropagation(); setIsDraggingSpecial(true); isDraggingRef.current = true; };
  const handleSpecialStarTouchStart = (e: React.TouchEvent) => { e.stopPropagation(); setIsDraggingSpecial(true); isDraggingRef.current = true; };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSpecial && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSpecialStar({ x: Math.max(0, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)), y: Math.max(0, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100)) });
      }
    };
    const handleUp = () => { setIsDraggingSpecial(false); isDraggingRef.current = false; };
    if (isDraggingSpecial) { document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseup', handleUp); }
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleUp); };
  }, [isDraggingSpecial]);

  const handleStarMouseDown = (starId: number) => (e: React.MouseEvent) => { e.stopPropagation(); setDraggedStar(starId); isDraggingRef.current = true; setStars(p => p.map(s => s.id === starId ? { ...s, isDragging: true } : s)); };
  const handleStarTouchStart = (starId: number) => (e: React.TouchEvent) => { e.stopPropagation(); setDraggedStar(starId); isDraggingRef.current = true; setStars(p => p.map(s => s.id === starId ? { ...s, isDragging: true } : s)); };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedStar !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setStars(p => p.map(s => s.id === draggedStar ? { ...s, x: Math.max(0, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)), y: Math.max(0, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100)) } : s));
      }
    };
    const handleUp = () => { if (draggedStar !== null) { setStars(p => p.map(s => s.id === draggedStar ? { ...s, isDragging: false } : s)); setDraggedStar(null); isDraggingRef.current = false; } };
    if (draggedStar !== null) { document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseup', handleUp); }
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleUp); };
  }, [draggedStar]);

  const projects = [
    { title: "Medallion Architecture Data Warehouse", description: "A complete end-to-end data warehouse implementation using the Medallion Architecture pattern (Bronze → Silver → Gold layers) built with Apache Airflow, dbt, and Snowflake.", technologies: ["Apache Airflow", "dbt", "Snowflake", "Python", "Docker"], iconKey: "dataWarehouse", detailsUrl: "/projects/project-one", githubUrl: socialLinks.repositories.projectOne },
    { title: "Egyptian Job Market Analytics Pipeline", description: "An end-to-end data engineering pipeline that scrapes, processes, and visualises tech job listings from Wuzzuf.net — Egypt's leading job platform.", technologies: ["Python", "Apache Airflow", "Apache Kafka", "PostgreSQL", "Playwright"], iconKey: "jobAnalytics", detailsUrl: "/projects/project-two", githubUrl: socialLinks.repositories.projectTwo },
    { title: "Gold Price Forecasting System", description: "An end-to-end data engineering and machine learning pipeline that automates daily gold price collection, storage, analysis, and forecasting — with an interactive Streamlit dashboard.", technologies: ["Python", "Apache Airflow", "PostgreSQL", "Streamlit", "ARIMA", "SARIMA"], iconKey: "goldForecast", detailsUrl: "/projects/project-three", githubUrl: socialLinks.repositories.projectThree },
    { title: "Iris Classification", description: "Classify Iris species using K-Nearest Neighbors and explore dataset visualization and evaluation metrics.", technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"], iconKey: "irisFlower", detailsUrl: "/projects/project-four", githubUrl: socialLinks.repositories.projectFour },
    { title: "Salary Prediction Model", description: "Predict salaries based on experience, age, and job details using regression models in Python.", technologies: ["Python", "Scikit-Learn", "Pandas", "Linear Regression", "Ridge Regression"], iconKey: "salaryPredict", detailsUrl: "/projects/project-five", githubUrl: socialLinks.repositories.projectFive },
    { title: "Clinic Data Integration Analytics Dashboard", description: "An end-to-end data engineering and analytics workflow for a healthcare dataset, covering ingestion, transformation, storage, and visualization.", technologies: ["SQL Server", "SSIS", "Power BI", "Python", "ETL"], iconKey: "healthcare", detailsUrl: "/projects/project-six", githubUrl: socialLinks.repositories.projectSix },
    { title: "Velora - AI Skin Diagnosis Platform", description: "An AI-powered web application for diagnosing skin conditions and recommending personalized skincare products.", technologies: ["ASP.NET Core", "EF Core", "SQL Server", "CNN", "Stripe API"], iconKey: "aiSkin", detailsUrl: "/projects/project-seven", githubUrl: socialLinks.repositories.projectSeven },
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);
  const placeholders = Array.from({ length: projectsPerPage - currentProjects.length }, (_, i) => ({ id: `placeholder-${i}` }));

  const handlePrevPage = () => { if (currentPage > 0) { setDirection('left'); setCurrentPage(p => p - 1); } };
  const handleNextPage = () => { if (currentPage < totalPages - 1) { setDirection('right'); setCurrentPage(p => p + 1); } };

  return (
    <section
      id="projects"
      className="py-20 relative transition-colors duration-300"
      style={{ background: themeColors.background.sections?.projects || themeColors.background.gradient, transition: 'background 0.3s ease-in-out' }}
      ref={containerRef}
    >
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '150px', background: isDarkMode ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)` : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`, zIndex: 2 }} />

      {/* Special drag star */}
      <div className="special-draggable-star" onMouseDown={handleSpecialStarMouseDown} onTouchStart={handleSpecialStarTouchStart} style={{ position: 'absolute', left: `${specialStar.x}%`, top: `${specialStar.y}%`, width: '44px', height: '44px', zIndex: 15, cursor: isDraggingSpecial ? 'grabbing' : 'grab', userSelect: 'none', animation: 'twinkle 3s infinite' }}>
        <img src={isDarkMode ? specialStars.dragMeStarDark : specialStars.dragMeStar} alt="Drag me star" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} draggable={false} loading="lazy" width="44" height="44" />
      </div>
      <div style={{ position: 'absolute', left: '85%', top: '5%', zIndex: 16, display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
        <img src={isDarkMode ? specialStars.arrowDark : specialStars.arrow} alt="Arrow" style={{ width: '45px', height: '45px', marginLeft: '40px' }} draggable={false} loading="lazy" />
        <span style={{ fontFamily: "'DK Crayonista', cursive", fontSize: '26px', color: isDarkMode ? '#FDD5DF' : '#ec4899', fontWeight: 'bold', userSelect: 'none' }}>drag me!</span>
      </div>

      {/* Background stars */}
      {stars.map((star) => (
        <div key={star.id} className="draggable-star" onMouseDown={handleStarMouseDown(star.id)} onTouchStart={handleStarTouchStart(star.id)} style={{ position: 'absolute', left: `${star.x}%`, top: `${star.y}%`, width: '50px', height: '50px', zIndex: 1, cursor: star.isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}>
          <img src={star.image} alt="Star" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} draggable={false} loading="lazy" width="50" height="50" />
        </div>
      ))}

      <TooltipProvider delayDuration={200}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-1 mb-4">
            <h2 className="text-4xl font-bold" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Projects</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center justify-center bg-transparent border-none outline-none focus:outline-none" style={{ minWidth: '44px', minHeight: '44px' }} aria-label="Information about project icons">
                  <Heart className="h-5 w-5 cursor-pointer transition-colors" style={{ color: themeColors.primary }} fill="none" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-800 border-pink-200"><p>all favicons created by me!</p></TooltipContent>
            </Tooltip>
          </div>
          <p className="text-center mb-12 text-lg text-gray-600 dark:text-gray-300">Here are some of the projects I've worked on recently</p>

          <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8" style={{ animation: `slideIn${direction === 'right' ? 'Right' : 'Left'} 0.4s ease-out` }}>
            {currentProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative" style={{ backgroundColor: themeColors.card.background, border: `1px solid ${themeColors.card.border}` }} aria-label={`${project.title} project`}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {/* Emoji icon — never breaks */}
                    <EmojiIcon icon={PROJECT_ICONS[project.iconKey] ?? "✨"} label={project.title} />
                    <div className="flex-1">
                      <CardTitle className="text-xl dark:text-gray-100 transition-colors group-hover:!text-pink-500 dark:group-hover:!text-pink-400">{project.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">{project.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="flex flex-wrap gap-2 mb-4" style={{ flex: '1 0 auto' }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs" style={{ backgroundColor: themeColors.interactive.primary, color: themeColors.text.accent, borderColor: themeColors.primary, border: '1px solid' }}>{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3" style={{ marginTop: 'auto', paddingTop: '8px' }}>
                    <Link to={project.detailsUrl} className="project-btn flex items-center gap-1" style={{ textDecoration: 'none', color: 'white' }} aria-label={`View ${project.title} project details`}>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />Details
                    </Link>
                    <a href={project.githubUrl} className="project-btn-outline flex items-center gap-1" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}>
                      <Code className="h-4 w-4" aria-hidden="true" />Code
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}

            {placeholders.map((placeholder) => (
              <Card key={placeholder.id} className="group relative" style={{ backgroundColor: themeColors.card.background, border: `1px dashed ${themeColors.card.border}`, opacity: 0.5 }} aria-label="Coming soon project">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <EmojiIcon icon="🚧" label="Coming soon" />
                    <div className="flex-1">
                      <CardTitle className="text-xl" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[600] }}>Coming Soon</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">More exciting projects on the way! Check back soon.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="flex flex-wrap gap-2 mb-4" style={{ flex: '1 0 auto' }}>
                    <Badge variant="secondary" className="text-xs" style={{ backgroundColor: themeColors.interactive.primary, color: themeColors.text.accent, borderColor: themeColors.primary, border: '1px solid', opacity: 0.5 }}>TBA</Badge>
                  </div>
                  <div className="flex gap-3 opacity-30" style={{ marginTop: 'auto', paddingTop: '8px' }}>
                    <div className="project-btn flex items-center gap-1" style={{ pointerEvents: 'none' }}><ExternalLink className="h-4 w-4" aria-hidden="true" />Details</div>
                    <div className="project-btn-outline flex items-center gap-1" style={{ pointerEvents: 'none' }}><Code className="h-4 w-4" aria-hidden="true" />Code</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-4 relative z-10" style={{ minHeight: '32px' }}>
            <button onClick={handlePrevPage} disabled={currentPage === 0} className="transition-all duration-200 hover:scale-110" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400], opacity: currentPage === 0 ? 0.2 : 0.6, cursor: currentPage === 0 ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: '4px', minWidth: '28px', minHeight: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Previous projects">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => { if (i !== currentPage) { setDirection(i > currentPage ? 'right' : 'left'); setCurrentPage(i); } }} className="transition-all duration-200" style={{ width: currentPage === i ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400], opacity: currentPage === i ? 1 : 0.3, cursor: 'pointer', border: 'none', padding: 0 }} aria-label={`Go to page ${i + 1}`} />
              ))}
            </div>
            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="transition-all duration-200 hover:scale-110" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400], opacity: currentPage === totalPages - 1 ? 0.2 : 0.6, cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: '4px', minWidth: '28px', minHeight: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Next projects">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </TooltipProvider>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '150px', background: isDarkMode ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)` : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`, zIndex: 1 }} />
    </section>
  );
};

export default Projects;
