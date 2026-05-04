// Project icons module - project-specific icons
import comingSoon from '../coming_soon.png';
import { techStackIcons } from 'src/assets/techstack';

// Project-specific emoji icons that represent each project's domain
export const projectIcons = {
  comingSoon,
  // Data Warehouse - layers/stacking concept
  dataWarehouse: "🏗️",
  // Job Market Analytics - search/analytics
  jobAnalytics: "📊",
  // Gold Price Forecasting - gold/trending
  goldForecast: "📈",
  // Iris Classification - flower/iris
  irisFlower: "🌸",
  // Salary Prediction - money/analytics
  salaryPredict: "💰",
  // Healthcare Analytics - medical/health
  healthcare: "🏥",
  // AI Skin Diagnosis - AI/robot
  aiSkin: "🤖",
  // Technology icons — only use keys that actually exist in techStackIcons
  database: techStackIcons.MongoDB,
  web: techStackIcons.HTML,
  ai: techStackIcons.TensorFlowLight,
  cloud: techStackIcons.AWSLight,
  container: techStackIcons.Docker,
  dotnet: techStackIcons.CS,
  javascript: techStackIcons.GithubLight,
  python: comingSoon,
};

export default projectIcons;
