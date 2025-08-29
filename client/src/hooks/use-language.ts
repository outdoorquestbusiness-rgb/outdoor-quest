import { useState, useEffect } from "react";

type Language = "fr" | "en";

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Homepage
  "outdoor.quest": { fr: "Outdoor Quest", en: "Outdoor Quest" },
  "adventure.tagline": { fr: "Escape game outdoor en groupe - Résolvez des énigmes, collaborez et relevez le défi en famille et entre amis !", en: "Outdoor group escape game - Solve riddles, collaborate and take on the family challenge!" },
  "missions": { fr: "Missions", en: "Missions" },
  "contact": { fr: "Contact", en: "Contact" },

  // Contact Page
  "contact.title": { fr: "Contact", en: "Contact" },
  "contact.team": { fr: "Contactez notre équipe", en: "Contact our team" },
  "contact.feedback": { fr: "Partagez vos commentaires ou questions", en: "Share your feedback or questions" },
  "your.message": { fr: "Votre message", en: "Your message" },
  "write.message": { fr: "Écrivez votre message ici...", en: "Write your message here..." },
  "send": { fr: "Envoyer", en: "Send" },

  // Missions Page
  "missions.title": { fr: "Missions", en: "Missions" },
  "add.mission": { fr: "Ajouter Mission", en: "Add Mission" },
  "access.code": { fr: "Code d'accès", en: "Access code" },
  "enter.code": { fr: "Entrez le code...", en: "Enter code..." },
  "demo.code": { fr: "Code démo: 1234", en: "Demo code: 1234" },
  "panic.mole": { fr: "Panique au Môle", en: "Panic at Môle" },
  "mystery.mission": { fr: "Mission mystère", en: "Mystery mission" },
  "new": { fr: "NOUVEAU", en: "NEW" },
  "duration": { fr: "Durée", en: "Duration" },
  "2.3.hours": { fr: "2-3 heures", en: "2-3 hours" },
  "difficulty": { fr: "Difficulté", en: "Difficulty" },
  "intermediate": { fr: "Intermédiaire", en: "Intermediate" },
  "age.recommended": { fr: "12+ ans", en: "12+ years" },
  "location": { fr: "Le Môle", en: "Le Môle" },

  // Game flow
  "start.adventure": { fr: "Commencer l'aventure", en: "Start adventure" },
  "next": { fr: "Suivant", en: "Next" },
  "back": { fr: "Retour", en: "Back" },
  "check": { fr: "Vérifier", en: "Check" },
  "hint": { fr: "Indice", en: "Hint" },
  "give.up": { fr: "Solution", en: "Solution" },

  // Safety and requirements
  "safety.trail": { fr: "Sécurité : restez sur le sentier", en: "Safety: stay on the trail" },
  "gps.required": { fr: "Géolocalisation/GPS requis", en: "GPS/Geolocation required" },
  "ar.featured": { fr: "Réalité augmentée incluse", en: "Augmented reality included" },
  "offline.playable": { fr: "Jouable entièrement offline", en: "Fully playable offline" },
  "phone.charged": { fr: "Smartphone chargé requis", en: "Charged smartphone required" },

  // Game End
  "congratulations": { fr: "Félicitations !", en: "Congratulations!" },
  "mystery.solved": { fr: "Vous avez résolu le mystère du Môle", en: "You've solved the Môle mystery" },
  "your.performance": { fr: "Votre Performance", en: "Your Performance" },
  "total.points": { fr: "Points Total", en: "Total Points" },
  "total.time": { fr: "Temps Total", en: "Total Time" },
  "average.riddle": { fr: "Moyenne/Énigme", en: "Average/Riddle" },
  "rank": { fr: "Rang", en: "Rank" },
  "this.month": { fr: "Ce mois-ci", en: "This month" },
  "play.again": { fr: "Rejouer la mission", en: "Play again" },
  "back.to.missions": { fr: "Retour aux missions", en: "Back to missions" },
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("trail-quest-language");
    return (saved as Language) || "fr";
  });

  useEffect(() => {
    localStorage.setItem("trail-quest-language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const switchLanguage = () => {
    setLanguage(prev => prev === "fr" ? "en" : "fr");
  };

  return {
    language,
    t,
    switchLanguage,
  };
}
