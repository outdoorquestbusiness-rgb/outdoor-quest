import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import mountainBgImage from "@assets/generated_images/Mountain_adventure_family_background_406e0d3d.png";

export default function Home() {
  const { language, t, switchLanguage } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})`,
      }}
    >
      {/* Language Switch with Flags - Responsive */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
        <div className="flex glass rounded-full p-1 sm:p-2">
          <button
            onClick={switchLanguage}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-base sm:text-lg font-medium transition-all flex items-center touch-manipulation ${
              language === "fr"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            🇫🇷
          </button>
          <button
            onClick={switchLanguage}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-base sm:text-lg font-medium transition-all flex items-center touch-manipulation ${
              language === "en"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            🇬🇧
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-4 sm:px-6 text-center py-8 sm:py-12">
        {/* Top spacer for better vertical distribution */}
        <div className="flex-1 min-h-[2rem] sm:min-h-[4rem]"></div>
        
        {/* Site Title and Tagline - Moved higher */}
        <div className="flex-1 flex flex-col justify-center mb-12 sm:mb-16 mt-[-6rem] sm:mt-[-8rem] pt-[142px] pb-[142px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg px-2 pl-[0px] pr-[0px] pt-[50px] pb-[50px]">
            {t("outdoor.quest")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-4">
            {t("adventure.tagline")}
          </p>
        </div>

        {/* Main Navigation - Made Transparent and Responsive */}
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Link href="/missions">
            <button
              className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl shadow-xl border border-white/30 transform transition-all duration-200 hover:bg-white/30 hover:scale-105 flex items-center justify-center text-base sm:text-lg touch-manipulation"
              data-testid="button-missions"
            >
              <i className="fas fa-map-marked-alt mr-2 sm:mr-3 text-sm sm:text-base"></i>
              {t("missions")}
            </button>
          </Link>

          <Link href="/contact">
            <button
              className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl shadow-xl border border-white/30 transform transition-all duration-200 hover:bg-white/30 hover:scale-105 flex items-center justify-center text-base sm:text-lg touch-manipulation"
              data-testid="button-contact"
            >
              <i className="fas fa-envelope mr-2 sm:mr-3 text-sm sm:text-base"></i>
              {t("contact")}
            </button>
          </Link>
        </div>
        
        {/* Bottom spacer */}
        <div className="min-h-[2rem] sm:min-h-[4rem]"></div>
      </div>
    </div>
  );
}
