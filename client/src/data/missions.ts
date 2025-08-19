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
  id: "panique-au-mole",
  name: "Panique au Môle",
  description: "Une aventure mystérieuse vous attend sur le mont Môle",
  duration: "2-3 heures",
  difficulty: "Intermédiaire", 
  ageRecommended: "12+ ans",
  location: "Le Môle (Outdoor)",
  accessCode: "1234",
  imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
};

export const missionStory = {
  title: "Le Mystère du Môle",
  subtitle: "Une histoire mystérieuse",
  content: [
    "Il y a des siècles, le mont Môle abritait un secret bien gardé. Des légendes racontent qu'un trésor mystérieux serait caché dans ses forêts profondes...",
    "Récemment, des randonneurs ont découvert d'étranges symboles gravés sur les rochers. Ces indices pourraient bien mener à la découverte la plus extraordinaire de notre époque.",
    "Votre mission : suivez les traces des anciens et percez le mystère du Môle. Êtes-vous prêt pour cette aventure ?"
  ],
  resources: [
    { type: "video", title: "Vidéo d'introduction", duration: "3 min", icon: "video" },
    { type: "images", title: "Galerie d'images", count: "12 photos", icon: "images" }
  ]
};
