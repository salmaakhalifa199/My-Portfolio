import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const experiences = [
    {
      title: "Data Engineering Intern",
      company: "Corelia",
      location: "Remote",
      period: "02/2026 – 03/2026",
      description: [
        "Built an automated ETL pipeline for gold price scraping, cleaning, and storage using Python and Apache Airflow (Astro) with Docker.",
        "Designed PostgreSQL schema and performed data querying/transformation using SQL and Pandas across CSV and JSON formats.",
        "Conducted EDA and time-series forecasting with ARIMA/SARIMA models, evaluating results with RMSE and MAE.",
        "Developed an interactive Streamlit + Plotly dashboard for real-time analytics and visualization.",
        "Managed codebase using Git/GitHub throughout the project lifecycle."
      ]
    },
    {
      title: "Data Analysis Intern",
      company: "Codveda Technologies",
      location: "Remote",
      period: "03/2026 – 04/2026",
      description: [
        "Performed data cleaning, transformation, and exploratory analysis on structured datasets in CSV and JSON formats.",
        "Developed data visualizations and analytical reports to support business decision-making.",
        "Applied Python, Pandas, and NumPy for data wrangling and statistical analysis tasks."
      ]
    },
    {
      title: "Big Data Engineering Scholarship Participant",
      company: "National Telecommunication Institute (NTI)",
      location: "Cairo, Egypt",
      period: "10/2025 – 01/2026",
      description: [
        "Completed the NTI HireReady Big Data Engineering Scholarship with hands-on labs in Linux, Python, SQL, Hadoop/HDFS, and Apache Spark.",
        "Built ETL workflows and data integration pipelines using industry tools while working with CSV, JSON, and Parquet formats.",
        "Created BI dashboards with Power BI and Tableau, and applied AWS fundamentals including EC2, IAM, VPC, and S3.",
        "Gained practical exposure to data engineering, data modeling, and big data processing concepts."
      ]
    }
  ];

  return (
    <section id="experience" className="py-8 relative" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Subtle gradient overlay for top edge blending */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />
      {/* Subtle gradient overlay for bottom edge blending to white divider */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.white} 100%)`,
          zIndex: 1
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-6" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Experience</h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400] }}>{exp.title}</CardTitle>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-1">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2" style={{ color: themeColors.primary }}>•</span>
                      <span className="text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;