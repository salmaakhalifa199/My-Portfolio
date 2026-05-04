import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AsciiMorphText from '../AsciiMorphText';
import TypewriterCarousel from '../TypewriterCarousel';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { aboutMeJournalWebp800, aboutMeJournalWebp400, stickers as stickerImages } from '../../assets';

import profile1 from '../../assets/profile1.jpeg';

const About = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const roles = ['Data Engineer'];

  const profileImages = [
    { src: profile1, caption: "Salma Sherif — Data Engineer ✨" }
  ];

  const goToPrevious = () =>
    setCurrentImageIndex((p) => (p === 0 ? profileImages.length - 1 : p - 1));

  const goToNext = () =>
    setCurrentImageIndex((p) =>
      p === profileImages.length - 1 ? 0 : p + 1
    );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen relative"
      style={{
        background: themeColors.background.gradient,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      {/* HERO */}
      <div className="py-20 relative z-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto gap-8">

            {/* LEFT */}
            <div>
              <AsciiMorphText text="Hi, I'm Salma Sherif" />

              <div className="mt-3 text-lg">
                I am a <TypewriterCarousel roles={roles} />
              </div>

              {/* ✅ FIXED BUTTONS */}
              <div className="flex gap-4 mt-6 relative z-50">

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-action-btn px-5 py-2.5"
                >
                  Resume →
                </a>

                <Link
                  to="/contact"
                  className="hero-action-btn px-5 py-2.5"
                >
                  Contact →
                </Link>

              </div>
            </div>

            {/* PROFILE */}
            <div
              className="hidden md:flex flex-col items-center cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            >
              <img
                src={profile1}
                alt="Salma"
                className="w-40 h-40 rounded-full object-cover border-4"
              />
              <span className="mt-2 text-sm italic">
                click to say hi ✨
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ STICKERS (FIXED CLICK ISSUE HERE) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {stickerImages.slice(0, 6).map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="absolute w-16 opacity-80"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
            }}
          />
        ))}
      </div>

      {/* JOURNAL */}
      <div className="flex justify-center py-12 relative z-20">
        <div
          className="relative cursor-pointer"
          onClick={() => setShowProfileModal(true)}
        >
          <picture>
            <source srcSet={aboutMeJournalWebp800} type="image/webp" />
            <img
              src={aboutMeJournalWebp400}
              alt="journal"
              className="max-w-full"
            />
          </picture>
        </div>
      </div>

      {/* MODAL */}
      {showProfileModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="relative bg-black rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={profileImages[currentImageIndex].src}
              alt=""
              className="w-80 h-auto"
            />

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 text-white"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 text-white"
            >
              <ChevronRight />
            </button>

            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setShowProfileModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;