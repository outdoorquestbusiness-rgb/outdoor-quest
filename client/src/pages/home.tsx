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
      {/* Language Switch with Flags */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex glass rounded-full p-2">
          <button
            onClick={switchLanguage}
            className={`px-3 py-2 rounded-full text-lg font-medium transition-all flex items-center ${
              language === "fr"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            🇫🇷
          </button>
          <button
            onClick={switchLanguage}
            className={`px-3 py-2 rounded-full text-lg font-medium transition-all flex items-center ${
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Site Title and Tagline */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t("outdoor.quest")}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            {t("adventure.tagline")}
          </p>
        </div>

        {/* Main Navigation with More Spacing */}
        <div className="w-full max-w-sm flex flex-col gap-6">
          <Link href="/missions">
            <button
              className="w-full bg-forest text-white font-semibold py-5 px-8 rounded-xl shadow-xl border border-white/30 transform transition-all duration-200 hover:bg-forest/90 hover:scale-105 flex items-center justify-center text-lg"
              data-testid="button-missions"
            >
              <i className="fas fa-map-marked-alt mr-3"></i>
              {t("missions")}
            </button>
          </Link>

          <Link href="/contact">
            <button
              className="w-full bg-forest text-white font-semibold py-5 px-8 rounded-xl shadow-xl border border-white/30 transform transition-all duration-200 hover:bg-forest/90 hover:scale-105 flex items-center justify-center text-lg"
              data-testid="button-contact"
            >
              <i className="fas fa-envelope mr-3"></i>
              {t("contact")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
