"use client";
import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { menuOpenAtom } from "@/atoms/navigationAtom";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import Image from "next/image";

const PageTopButton: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const menuOpen = useAtomValue(menuOpenAtom);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);
      const threshold = window.innerHeight * 0.1; // 10vh
      setIsVisible(distanceFromBottom > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初回実行
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col items-center gap-3 z-30 transition-opacity duration-300 ${isVisible && !menuOpen ? "" : "opacity-0 pointer-events-none"}`}
    >
      {/* Follow Us Label with Icons in center */}
      <div className="relative flex flex-col items-center">
        {/* Follow Us Text */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-2 text-xs font-semibold tracking-wider shadow-lg backdrop-blur-sm bg-opacity-90 border border-white/20 transform -skew-x-12 mb-2">
          <span className="transform skew-x-12 block">＼ Follow Us ／</span>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-3">
          {/* Twitter/X */}
          <div className="relative group">
            <a
              href="https://x.com/hgkeyakifes"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 relative z-10"
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
              onMouseEnter={() => setHoveredSocial("twitter")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <FaXTwitter />
            </a>
            {/* Twitter Tooltip */}
            <div
              className={`absolute right-16 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out ${
                hoveredSocial === "twitter"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl border border-gray-200 whitespace-nowrap text-sm font-medium relative">
                けやき祭の最新情報を
                <br />
                ツイートしています！
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="relative group">
            <a
              href="https://www.instagram.com/hg_keyakifes/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white p-3 rounded-full shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition duration-300 relative z-10"
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
              onMouseEnter={() => setHoveredSocial("instagram")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <FaInstagram />
            </a>
            {/* Instagram Tooltip */}
            <div
              className={`absolute right-16 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out ${
                hoveredSocial === "instagram"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
              style={{ zIndex: 50 }}
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-medium relative">
                けやき祭の準備や当日の様子を
                <br />
                写真と動画でお届け✨
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-pink-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="relative group">
            <a
              href="https://note.com/hirogakukeyaki"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 relative z-10"
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
              onMouseEnter={() => setHoveredSocial("note")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <Image
                src="/note.svg"
                alt="note"
                width={36}
                height={36}
                className="origin-center scale-200"
              />
            </a>
            {/* Note Tooltip */}
            <div
              className={`absolute right-16 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out ${
                hoveredSocial === "note"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
              style={{ zIndex: 50 }}
            >
              <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl border border-gray-200 whitespace-nowrap text-sm font-medium relative">
                けやき祭を支えている人たちへのインタビューなどを
                <br />
                記事形式でお届け✨
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTopButton;
