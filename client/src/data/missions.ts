export interface Mission {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  ageRecommended: string;
  location: string;
  accessCode?: string;
  imageUrl?: string;
}

export const defaultMission: Mission = {
  id: "traces-du-mysterieux-dahu",
  name: "Sur les traces du mystérieux Dahu",
  description: "Une aventure mystérieuse vous attend sur le mont Môle à la recherche du dahu blanc",
  duration: "2-3 heures",
  difficulty: "Intermédiaire", 
  ageRecommended: "12+ ans",
  location: "Le Môle (Outdoor)",
  accessCode: "1234",
  imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
};

export const missionStory = {
  title: "Sur les traces du mystérieux Dahu",
  subtitle: "La quête du dahu blanc",
  content: [
    "Le Môle, montagne solitaire, veille sur la vallée comme une sentinelle. Les anciens disaient qu'un dahu blanc y rôde, invisible aux yeux ordinaires, gardien de la mémoire des sommets.",
    "Un carnet de berger retrouvé dans une vieille cabane vous est confié. À la première page :",
    "« Suis mes traces, de la forêt à la croix. Réponds à mes énigmes, et tu verras l'invisible. Mais chaque pas doit être mérité. »"
  ],
  resources: [
    { type: "video", title: "Vidéo d'introduction", duration: "3 min", icon: "video" },
    { type: "images", title: "Galerie d'images", count: "12 photos", icon: "images" }
  ]
};
