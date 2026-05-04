import { useEffect, useRef, useState, useMemo } from "react";
import DomeGallery from "../ui/domegallery";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { withAlpha } from "../../hooks/useThemeColors";

// ── Inline SVG icon map (brand logos as data URIs / inline SVGs) ─────────────
// Each returns a small React element. Using simple SVG paths for common tech tools.
const TechIcon = ({ name, color }: { name: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    // Languages
    Python: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.898S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.868s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.131V3.19S18.28 0 11.914 0zm-3.21 1.848a1.053 1.053 0 1 1 0 2.106 1.053 1.053 0 0 1 0-2.106z" fill="#3776AB"/>
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.123S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.868s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.131v5.341S5.72 24 12.086 24zm3.21-1.848a1.053 1.053 0 1 1 0-2.106 1.053 1.053 0 0 1 0 2.106z" fill="#FFD43B"/>
      </svg>
    ),
    SQL: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 4.239 2 7v10c0 2.761 4.477 5 10 5s10-2.239 10-5V7c0-2.761-4.477-5-10-5z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
        <ellipse cx="12" cy="7" rx="10" ry="3" fill={color} fillOpacity="0.6"/>
        <path d="M2 12c0 1.657 4.477 3 10 3s10-1.343 10-3" stroke={color} strokeWidth="1.2" strokeDasharray="2 1"/>
      </svg>
    ),
    "C#": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L1.607 6v12L12 24l10.393-6V6L12 0zm-1.198 7.302c1.444 0 2.779.553 3.78 1.463L13.17 10.18a2.79 2.79 0 0 0-2.368-1.308c-1.545 0-2.797 1.253-2.797 2.797s1.252 2.797 2.797 2.797a2.79 2.79 0 0 0 2.368-1.308l1.412 1.415a4.868 4.868 0 0 1-3.78 1.463c-2.693 0-4.875-2.182-4.875-4.875 0-2.692 2.182-4.859 4.875-4.859zm5.765 3.198h.679v.679h.679v-.679h.678v.679h.679v.678h-.679v.679h.679v.678h-.679v-.678h-.678v.678h-.679v-.678h-.679v-.679h.679v-.679h-.679v-.678z" fill="#953CAD"/>
      </svg>
    ),
    "ASP.NET Core": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882l-3.432-8.805h1.553l2.605 7.127 2.61-7.127h1.553zM2.684 11.605c.013.022.025.043.039.064A4.47 4.47 0 0 0 4.01 12.97l-1.263.73a5.915 5.915 0 0 1-1.287-1.301 5.97 5.97 0 0 1-.048-.07c-.94-1.418-1.295-3.17-.9-4.867a6.01 6.01 0 0 1 2.786-3.822A5.99 5.99 0 0 1 7.856 3c1.677 0 3.194.682 4.291 1.784l-.93.93A4.516 4.516 0 0 0 7.856 4.46a4.51 4.51 0 0 0-3.498 1.643 4.525 4.525 0 0 0-.99 2.63 4.51 4.51 0 0 0 .025.886c.1.658.32 1.293.651 1.868a.44.44 0 0 1 .055.108l.585-1.013v.023z" fill="#512BD4"/>
      </svg>
    ),
    Pandas: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.578 0h2.289v6.66H7.578zm6.555 0h2.29v6.66h-2.29zM7.578 17.346h2.289V24H7.578zm6.555 0h2.29V24h-2.29zM7.578 8.596h2.289v6.808H7.578zm6.555 0h2.29v6.808h-2.29z" fill="#150458"/>
      </svg>
    ),
    NumPy: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.703 0L0 5.672v6.033l4.147-2.158v3.215L0 14.919v6.033L10.703 24 24 17.27V5.672zm0 1.405l11.434 6.05-3.516 1.83-7.918-4.193zm-1.386.694v5.602L4.147 9.891V4.29zm2.773 5.602V2.099l5.17 2.738v5.601zm-3.496 1.405l3.81 2.02-3.81 2.02-3.81-2.02zm-5.047 1.35l3.81 2.019-3.81 2.02v-4.039zm10.094 0v4.039l-3.81-2.02zm-5.047 3.424l3.81 2.019v4.04l-3.81-2.02zm5.096.386l3.81-2.02v4.04l-3.81 2.019z" fill="#013243"/>
      </svg>
    ),
    // Data Engineering & ETL
    "Apache Airflow": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4zm0 2.4a7.2 7.2 0 1 0 0 14.4A7.2 7.2 0 0 0 12 4.8z" fill="#017CEE"/>
        <circle cx="12" cy="12" r="3.6" fill="#017CEE"/>
      </svg>
    ),
    Docker: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" fill="#2396ED"/>
      </svg>
    ),
    PostgreSQL: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.426 4.395.538 3.37.858 2.525 1.507 1.68 2.156 1.048 3.207.873 4.645c-.03.241-.044.49-.044.742 0 1.283.396 2.453.927 3.372a8.556 8.556 0 0 0 .393.623A2.268 2.268 0 0 0 2 9.98c.005.552.169 1.064.428 1.461.134.21.29.384.448.524v.046C2.876 16.14 4.48 19.58 6.91 21.625c.633.53 1.28.906 1.932 1.084A2.71 2.71 0 0 0 9.6 24h.033c.71 0 1.37-.178 1.96-.504a4.37 4.37 0 0 0 .873.342c.22.06.44.088.66.088h.02c.6 0 1.175-.175 1.69-.487l.145.068c.734.343 1.456.49 2.154.49 1.647 0 3.185-.844 4.337-2.195 1.165-1.366 1.93-3.24 2.16-5.38l.033-.012c.55-.225 1.01-.6 1.338-1.08A3.97 3.97 0 0 0 24 13.1c0-.67-.15-1.286-.43-1.81-.124-.23-.265-.43-.428-.618.077-.256.12-.51.12-.78a2.269 2.269 0 0 0-.145-.8c.26-.584.41-1.24.41-1.923 0-.612-.113-1.283-.43-1.935-.315-.65-.872-1.28-1.752-1.686a6.154 6.154 0 0 0-1.17-.38A10.379 10.379 0 0 0 18.9.457C18.395.195 17.82.04 17.128 0z" fill="#336791"/>
      </svg>
    ),
    "SQL Server": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12.5v3.75C0 18.985 5.373 21 12 21s12-2.015 12-4.75V12.5c0 2.735-5.373 4.75-12 4.75S0 15.235 0 12.5zm0-6.25v3.75C0 12.735 5.373 14.75 12 14.75S24 12.735 24 10V6.25C24 8.985 18.627 11 12 11S0 8.985 0 6.25zM12 0C5.373 0 0 2.015 0 4.75S5.373 9.5 12 9.5s12-2.015 12-4.75S18.627 0 12 0z" fill="#CC2927"/>
      </svg>
    ),
    Kafka: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.587 7.62c-.404-1.717-1.836-3.02-3.617-3.02-.862 0-1.649.28-2.282.748A3.584 3.584 0 0 0 10 3.73c-1.987 0-3.591 1.6-3.591 3.59 0 .218.023.43.061.638C4.805 8.54 3.59 9.902 3.59 11.55c0 1.808 1.468 3.271 3.277 3.271h.49v-.001h9.23v.001h.318c1.809 0 3.278-1.463 3.278-3.271 0-1.57-1.095-2.884-2.596-3.93z" fill="#000000"/>
      </svg>
    ),
    // Big Data
    "Hadoop / HDFS": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.828 0l-.9 3.244L3 3.95 6.25 5.4 6 9l3-2.35L12 8l-.8-3.35 2.5-2-3.25-.5zm10.35 0l-.9 3.244L13.35 3.95l3.25 1.45-.25 3.6L19.35 6.65 22.35 8l-.8-3.35 2.5-2-3.25-.5zM12 10.5c-4.05 0-7.5 1.75-7.5 4s3.45 4 7.5 4 7.5-1.75 7.5-4-3.45-4-7.5-4zm0 1.5c3.05 0 5.5 1.12 5.5 2.5S15.05 17 12 17s-5.5-1.12-5.5-2.5S8.95 12 12 12z" fill="#66CCFF"/>
      </svg>
    ),
    "Apache Spark": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.24 1.52l2.327 4.706 5.19.755-3.758 3.66.886 5.168L11.24 13.2l-4.647 2.443.888-5.17-3.758-3.66 5.19-.754zm6.04 12.81l1.484 3.005 3.314.48-2.397 2.336.565 3.297-2.965-1.56-2.964 1.56.566-3.297-2.397-2.335 3.313-.481z" fill="#E25A1C"/>
      </svg>
    ),
    Elasticsearch: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 19.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" fill="#00BFB3"/>
        <circle cx="12" cy="12" r="4" fill="#00BFB3"/>
      </svg>
    ),
    // BI & Visualization
    "Power BI": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <rect x="2" y="10" width="4" height="12" rx="1" fill="#F2C94C"/>
        <rect x="8" y="6" width="4" height="16" rx="1" fill="#F2994A"/>
        <rect x="14" y="2" width="4" height="20" rx="1" fill="#EB5757"/>
        <rect x="20" y="8" width="2" height="14" rx="1" fill="#219653"/>
      </svg>
    ),
    Tableau: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.654 3.203v2.25H8.2v1.049h3.454v2.25h1.1v-2.25h3.453V5.453h-3.453v-2.25zm7.073 4.017v1.826H15.6v.854h3.127v1.826h.9v-1.826h3.127v-.854h-3.127V7.22zm-14.454 0v1.826H1.146v.854h3.127v1.826h.9v-1.826h3.127v-.854H5.173V7.22zM11.654 14.7v1.826H8.527v.853h3.127v1.826h.9v-1.826h3.127v-.853h-3.127V14.7zm7.073-3.517v1.826H15.6v.854h3.127v1.826h.9v-1.826h3.127v-.854h-3.127v-1.826zm-14.454 0v1.826H1.146v.854h3.127v1.826h.9v-1.826h3.127v-.854H5.173v-1.826z" fill="#E97627"/>
      </svg>
    ),
    Streamlit: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.03 2.59a1.337 1.337 0 0 1 1.94 0l9.516 9.516a1.337 1.337 0 0 1 0 1.94l-9.516 9.515a1.337 1.337 0 0 1-1.94 0L1.514 14.046a1.337 1.337 0 0 1 0-1.94z" fill="#FF4B4B"/>
      </svg>
    ),
    Plotly: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14H12l4.5-4.5V16zm-9-8h4.5L7.5 12.5V8zm4.5 0h4.5L12 12.5V8zm-4.5 8H12l-4.5-4.5V16z" fill="#3F4F75"/>
      </svg>
    ),
    "Looker Studio": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#4285F4"/>
      </svg>
    ),
    // Cloud & Dev Tools
    "AWS EC2": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 2H14.5L18 5.5V14.5L14.5 18H9.5L6 14.5V5.5L9.5 2ZM12 6A3 3 0 1 0 12 12A3 3 0 0 0 12 6Z" fill="#FF9900"/>
      </svg>
    ),
    "AWS S3": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6v12l8 4 8-4V6L12 2zm0 2.5L18 8l-6 2-6-2 6-3.5zm-7 4.5l6 2v7.5L5 15V9zm8 9.5V11l6-2v6l-6 3.5z" fill="#FF9900"/>
      </svg>
    ),
    "Git/GitHub": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#181717"/>
      </svg>
    ),
    Postman: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.527.099C6.955-.744.975 3.9.098 10.473c-.877 6.572 3.68 12.552 10.253 13.429 6.573.877 12.552-3.68 13.429-10.253C24.657 7.077 20.101 1.088 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.26l-4.453 4.453-.307-.307-.643-.643 4.453-4.453a.84.84 0 0 0 0-1.173.848.848 0 0 0-1.183.015L8.82 10.738a2.74 2.74 0 0 0 0 3.876 2.75 2.75 0 0 0 3.876 0l4.453-4.453a.84.84 0 0 0 0-1.173.848.848 0 0 0-.151-.404z" fill="#FF6C37"/>
      </svg>
    ),
    "Jupyter Notebook": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.833 17.5a4.833 4.833 0 1 1-5.666-7.86 4.833 4.833 0 0 1 5.666 7.86z" fill="#F37726"/>
      </svg>
    ),
    // Data Formats
    CSV: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
        <text x="12" y="15.5" textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace">CSV</text>
      </svg>
    ),
    JSON: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
        <text x="12" y="15.5" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" fontFamily="monospace">JSON</text>
      </svg>
    ),
    Parquet: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
        <text x="12" y="15.5" textAnchor="middle" fill={color} fontSize="5.5" fontWeight="bold" fontFamily="monospace">PARQ</text>
      </svg>
    ),
    Avro: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
        <text x="12" y="15.5" textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace">AVRO</text>
      </svg>
    ),
  };

  const icon = icons[name];
  if (!icon) {
    // Fallback: colored circle with first letter
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
        <text x="12" y="16" textAnchor="middle" fill={color} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          {name.charAt(0)}
        </text>
      </svg>
    );
  }
  return <>{icon}</>;
};

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    color: '#f472b6',
    items: ['Python', 'SQL', 'C#', 'ASP.NET Core', 'Pandas', 'NumPy']
  },
  {
    title: 'Data Engineering & ETL',
    color: '#a78bfa',
    items: ['Apache Airflow', 'Docker', 'PostgreSQL', 'SQL Server', 'Kafka', 'Sqoop', 'Flume']
  },
  {
    title: 'Big Data & Streaming',
    color: '#60a5fa',
    items: ['Hadoop / HDFS', 'Apache Spark', 'Apache Flink', 'Apache Kafka', 'Apache Zookeeper', 'Elasticsearch']
  },
  {
    title: 'BI & Visualization',
    color: '#34d399',
    items: ['Power BI', 'Tableau', 'Streamlit', 'Plotly', 'Looker Studio', 'IBM Cognos']
  },
  {
    title: 'Data Formats',
    color: '#fb923c',
    items: ['CSV', 'JSON', 'Parquet', 'Avro']
  },
  {
    title: 'Cloud & Dev Tools',
    color: '#38bdf8',
    items: ['AWS EC2', 'AWS S3', 'Git/GitHub', 'Postman', 'Jupyter Notebook', 'AWS IAM', 'AWS VPC']
  }
];

function makeSkillSvg(label: string, accentColor: string, isDark: boolean): string {
  const bg = isDark ? '#1f1f2e' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const border = isDark ? '#3b3b52' : '#fce7f3';
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
  <rect width="160" height="160" rx="20" ry="20" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
  <rect x="0" y="0" width="160" height="6" rx="3" ry="3" fill="${accentColor}"/>
  <circle cx="80" cy="52" r="16" fill="${accentColor}" opacity="0.15"/>
  <circle cx="80" cy="52" r="8" fill="${accentColor}" opacity="0.6"/>
  ${line2
    ? `<text x="80" y="96" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="${textColor}">${line1}</text>
       <text x="80" y="116" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="${textColor}">${line2}</text>`
    : `<text x="80" y="104" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="${textColor}">${label}</text>`
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
      setScale(0.5 + 0.5 * visibilityRatio);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative" style={{
      background: themeColors.background.sections?.skills || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '300px',
        background: isDarkMode
          ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
          : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
        zIndex: 1
      }} />

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>
          Skills
        </h2>
        <p className="max-w-3xl mx-auto text-center mb-12 text-sm md:text-base" style={{ color: themeColors.text.secondary }}>
          Practical data engineering, analytics, and backend skills grounded in projects for gold price forecasting, job market analytics, clinic data integration, and AI-powered applications.
        </p>

        {/* Category cards with tech icons */}
        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border p-6 bg-white/90 dark:bg-gray-900/90 border-pink-100 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ background: category.color }} />
                <h3 className="text-xl font-semibold" style={{ color: themeColors.text.primary }}>
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    {/* Tech icon */}
                    <span style={{
                      width: '22px',
                      height: '22px',
                      flexShrink: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <TechIcon name={item} color={category.color} />
                    </span>
                    <span className="text-sm" style={{ color: themeColors.text.secondary }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DomeGallery */}
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
