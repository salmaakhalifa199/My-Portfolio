import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProjectLayout from '../../components/project/ProjectLayout';
import ProjectHeader from '../../components/project/ProjectHeader';
import ProjectOverview from '../../components/project/ProjectOverview';
import TechnicalHighlights from '../../components/project/TechnicalHighlights';
import TechStack from '../../components/project/TechStack';
import { socialLinks } from '../../config/socialLinks';
import { Star, Code, Database, TrendingUp, Brain, Shield, Zap, type LucideIcon } from 'lucide-react';
import { projectIcons } from '../../assets/project_icons';

interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  detailsUrl: string;
  icon: string;
  subtitle: string;
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  highlights: string[];
}

// Project data - should match the data in Projects.tsx
const projectData: Record<string, ProjectData> = {
  'project-one': {
    title: "Medallion Architecture Data Warehouse",
    description: "A complete end-to-end data warehouse implementation using the Medallion Architecture pattern (Bronze → Silver → Gold layers) built with Apache Airflow, dbt, and Snowflake.",
    technologies: ["Apache Airflow", "dbt", "Snowflake", "Python", "Docker"],
    githubUrl: socialLinks.repositories.projectOne,
    detailsUrl: "/projects/project-one",
    icon: projectIcons.dataWarehouse,
    subtitle: "Data Warehouse & ETL Pipeline",
    features: [
      {
        icon: Database,
        title: "Medallion Architecture",
        description: "Bronze → Silver → Gold layer transformation"
      },
      {
        icon: Zap,
        title: "Automated Pipeline",
        description: "Apache Airflow orchestration with dbt"
      },
      {
        icon: Star,
        title: "Cloud-Native",
        description: "Snowflake data warehouse platform"
      }
    ],
    highlights: [
      "Implemented complete data warehouse with Bronze, Silver, and Gold layers",
      "Built automated ETL pipelines using Apache Airflow and dbt",
      "Utilized Snowflake for scalable cloud data warehousing",
      "Applied data quality checks and validation throughout the pipeline",
      "Created dimensional modeling for business intelligence reporting"
    ]
  },
  'project-two': {
    title: "Egyptian Job Market Analytics Pipeline",
    description: "An end-to-end data engineering pipeline that scrapes, processes, and visualises tech job listings from Wuzzuf.net — Egypt's leading job platform.",
    technologies: ["Python", "Apache Airflow", "Apache Kafka", "PostgreSQL", "Playwright"],
    githubUrl: socialLinks.repositories.projectTwo,
    detailsUrl: "/projects/project-two",
    icon: projectIcons.jobAnalytics,
    subtitle: "Data Engineering & Analytics",
    features: [
      {
        icon: Code,
        title: "Web Scraping",
        description: "Playwright-based scraper for Wuzzuf.net"
      },
      {
        icon: Database,
        title: "Streaming Pipeline",
        description: "Kafka integration for real-time data processing"
      },
      {
        icon: TrendingUp,
        title: "Analytics Dashboard",
        description: "Interactive Looker Studio visualization"
      }
    ],
    highlights: [
      "Developed resilient web scraper using Playwright for job data extraction",
      "Implemented Kafka streaming architecture for real-time data processing",
      "Built star schema data warehouse in PostgreSQL for analytics",
      "Created interactive dashboard with Looker Studio for market insights",
      "Applied data quality validation and incremental loading strategies"
    ]
  },
  'project-three': {
    title: "Gold Price Forecasting System",
    description: "An end-to-end data engineering and machine learning pipeline that automates daily gold price collection, storage, analysis, and forecasting — with an interactive Streamlit dashboard for real-time visualization.",
    technologies: ["Python", "Apache Airflow", "PostgreSQL", "Streamlit", "ARIMA", "SARIMA"],
    githubUrl: socialLinks.repositories.projectThree,
    detailsUrl: "/projects/project-three",
    icon: projectIcons.goldForecast,
    subtitle: "ML & Forecasting Pipeline",
    features: [
      {
        icon: TrendingUp,
        title: "Time Series Forecasting",
        description: "ARIMA/SARIMA models for price prediction"
      },
      {
        icon: Database,
        title: "Automated Pipeline",
        description: "Daily data collection and model training"
      },
      {
        icon: Star,
        title: "Interactive Dashboard",
        description: "Streamlit app with real-time visualizations"
      }
    ],
    highlights: [
      "Built automated daily gold price data collection from Yahoo Finance",
      "Implemented ARIMA and SARIMA time series forecasting models",
      "Created comprehensive EDA with statistical analysis and visualization",
      "Developed interactive Streamlit dashboard for real-time insights",
      "Applied model evaluation and selection based on RMSE metrics"
    ]
  },
  'project-four': {
    title: "Iris Classification",
    description: "Classify Iris species using K-Nearest Neighbors and explore dataset visualization and evaluation metrics.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: socialLinks.repositories.projectFour,
    detailsUrl: "/projects/project-four",
    icon: projectIcons.irisFlower,
    subtitle: "Machine Learning Classification",
    features: [
      {
        icon: Brain,
        title: "KNN Classification",
        description: "Supervised learning for species classification"
      },
      {
        icon: TrendingUp,
        title: "Data Visualization",
        description: "Comprehensive EDA and feature analysis"
      },
      {
        icon: Shield,
        title: "Model Evaluation",
        description: "Cross-validation and performance metrics"
      }
    ],
    highlights: [
      "Implemented K-Nearest Neighbors algorithm for iris species classification",
      "Conducted thorough exploratory data analysis with visualization",
      "Applied feature scaling and preprocessing techniques",
      "Evaluated model performance using confusion matrix and accuracy metrics",
      "Created comprehensive data visualizations for feature relationships"
    ]
  },
  'project-five': {
    title: "Salary Prediction Model",
    description: "Predict salaries based on experience, age, and job details using regression models in Python.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Linear Regression", "Ridge Regression"],
    githubUrl: socialLinks.repositories.projectFive,
    detailsUrl: "/projects/project-five",
    icon: projectIcons.salaryPredict,
    subtitle: "Regression Analysis",
    features: [
      {
        icon: TrendingUp,
        title: "Multiple Regression",
        description: "Linear and Ridge regression models"
      },
      {
        icon: Brain,
        title: "Feature Engineering",
        description: "One-hot encoding and data preprocessing"
      },
      {
        icon: Star,
        title: "Model Comparison",
        description: "Evaluation of different regression approaches"
      }
    ],
    highlights: [
      "Built regression models to predict salaries based on multiple features",
      "Implemented data preprocessing including outlier removal and scaling",
      "Applied one-hot encoding for categorical variables",
      "Compared Linear Regression and Ridge Regression performance",
      "Created visualizations for predicted vs actual salary analysis"
    ]
  },
  'project-six': {
    title: "Clinic Data Integration Analytics Dashboard",
    description: "This project demonstrates an end-to-end data engineering and analytics workflow for a healthcare (clinic) dataset, covering data ingestion, transformation, storage, and visualization.",
    technologies: ["SQL Server", "SSIS", "Power BI", "Python", "ETL"],
    githubUrl: socialLinks.repositories.projectSix,
    detailsUrl: "/projects/project-six",
    icon: projectIcons.healthcare,
    subtitle: "Healthcare Data Analytics",
    features: [
      {
        icon: Database,
        title: "ETL Pipeline",
        description: "SSIS for data integration and transformation"
      },
      {
        icon: TrendingUp,
        title: "Analytics Dashboard",
        description: "Power BI for healthcare insights"
      },
      {
        icon: Shield,
        title: "Data Quality",
        description: "Validation and standardization of healthcare data"
      }
    ],
    highlights: [
      "Designed ETL pipeline for multi-source healthcare data integration",
      "Implemented data quality checks and standardization procedures",
      "Built dimensional data warehouse for healthcare analytics",
      "Created Power BI dashboard for operational and clinical insights",
      "Applied data governance practices for sensitive healthcare information"
    ]
  },
  'project-seven': {
    title: "Velora - AI Skin Diagnosis Platform",
    description: "An AI-powered web application for diagnosing skin conditions and recommending personalized skincare products.",
    technologies: ["ASP.NET Core", "EF Core", "SQL Server", "CNN", "Stripe API"],
    githubUrl: socialLinks.repositories.projectSeven,
    detailsUrl: "/projects/project-seven",
    icon: projectIcons.aiSkin,
    subtitle: "AI Healthcare Platform",
    features: [
      {
        icon: Brain,
        title: "AI Diagnosis",
        description: "CNN model for skin condition analysis"
      },
      {
        icon: Shield,
        title: "Secure Platform",
        description: "Role-based access and secure payments"
      },
      {
        icon: Star,
        title: "Product Recommendations",
        description: "Personalized skincare suggestions"
      }
    ],
    highlights: [
      "Developed AI-powered skin diagnosis using Convolutional Neural Networks",
      "Built secure web platform with ASP.NET Core and role-based access",
      "Implemented Stripe payment integration for e-commerce functionality",
      "Created admin dashboard for user management and analytics",
      "Applied machine learning inference for real-time skin condition analysis"
    ]
  }
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId || !projectData[projectId]) {
    return <Navigate to="/" replace />;
  }

  const project = projectData[projectId];

  return (
    <ProjectLayout>
      <ProjectHeader
        icon={project.icon}
        title={project.title}
        subtitle={project.subtitle}
        githubUrl={project.githubUrl}
        features={project.features}
      />

      <ProjectOverview
        paragraphs={[project.description]}
      />

      <TechnicalHighlights
        highlights={project.highlights}
      />

      <TechStack
        technologies={project.technologies}
      />
    </ProjectLayout>
  );
};

export default ProjectDetail;