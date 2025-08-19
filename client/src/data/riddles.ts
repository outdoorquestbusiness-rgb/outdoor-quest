export interface Riddle {
  id: string;
  chapterNumber: number;
  riddleNumber: number;
  title: string;
  description: string;
  question: string;
  answer: string | number;
  hint: string;
  points: number;
  icon: string;
}

export interface Chapter {
  number: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  riddleCount: number;
}

export const chapters: Chapter[] = [
  {
    number: 1,
    title: "La Forêt Maudite du Môle",
    description: "Premiers indices mystérieux",
    difficulty: "Facile",
    estimatedTime: "~45 min",
    riddleCount: 3,
  },
  {
    number: 2,
    title: "Le Secret de la Grotte",
    description: "Révélations cachées",
    difficulty: "Intermédiaire", 
    estimatedTime: "~60 min",
    riddleCount: 4,
  },
];

export const riddles: Riddle[] = [
  // Chapter 1 riddles
  {
    id: "ch1-r1",
    chapterNumber: 1,
    riddleNumber: 1,
    title: "Les Gardiens de l'Entrée",
    description: "Première énigme de la forêt maudite",
    question: "Dans cette forêt mystérieuse, comptez les arbres centenaires qui gardent l'entrée du sentier secret. Leur nombre vous révélera le premier chiffre du code ancien.",
    answer: 10,
    hint: "Il y a entre 5 et 15 arbres centenaires qui marquent l'entrée du sentier.",
    points: 100,
    icon: "tree",
  },
  {
    id: "ch1-r2",
    chapterNumber: 1,
    riddleNumber: 2,
    title: "Les Roches Parlantes",
    description: "Deuxième énigme du premier chapitre",
    question: "Sur le rocher gravé de symboles anciens, comptez le nombre de triangles visibles. Ce nombre multiplié par 2 vous donnera la suite du code.",
    answer: 14,
    hint: "Les triangles sont gravés près du sommet du rocher principal. Il y en a exactement 7.",
    points: 100,
    icon: "mountain",
  },
  {
    id: "ch1-r3",
    chapterNumber: 1,
    riddleNumber: 3,
    title: "Le Chant des Oiseaux",
    description: "Dernière énigme du premier chapitre",
    question: "Écoutez attentivement les chants d'oiseaux. Combien d'espèces différentes pouvez-vous identifier ? La réponse est le dernier chiffre de cette séquence.",
    answer: 6,
    hint: "Prêtez attention aux différents rythmes et tonalités. Il y a moins de 10 espèces.",
    points: 100,
    icon: "feather",
  },
  // Chapter 2 riddles
  {
    id: "ch2-r1",
    chapterNumber: 2,
    riddleNumber: 1,
    title: "L'Écho de la Grotte",
    description: "Première énigme du second chapitre",
    question: "Dans la grotte résonnante, frappez 3 fois contre la paroi rocheuse et comptez les échos distincts que vous entendez. Ce nombre vous guidera vers le trésor.",
    answer: 8,
    hint: "L'acoustique de la grotte crée plusieurs échos. Écoutez bien, il y en a plus que 5.",
    points: 120,
    icon: "volume-2",
  },
  {
    id: "ch2-r2",
    chapterNumber: 2,
    riddleNumber: 2,
    title: "Les Cristaux Lumineux",
    description: "Deuxième énigme avancée",
    question: "Observez les formations cristallines sur les parois. Comptez uniquement les cristaux qui reflètent la lumière de votre lampe. Leur nombre révèle un secret.",
    answer: 23,
    hint: "Seuls les cristaux parfaitement taillés reflètent la lumière. Explorez tous les recoins de la grotte.",
    points: 150,
    icon: "gem",
  },
  {
    id: "ch2-r3",
    chapterNumber: 2,
    riddleNumber: 3,
    title: "Le Code des Anciens",
    description: "Troisième énigme complexe",
    question: "Déchiffrez l'inscription ancienne : 'VII + XII - III = ?'. Le résultat en chiffres arabes ouvre la voie vers le trésor final.",
    answer: 16,
    hint: "VII = 7, XII = 12, III = 3. Faites le calcul : 7 + 12 - 3 = ?",
    points: 180,
    icon: "scroll-text",
  },
  {
    id: "ch2-r4",
    chapterNumber: 2,
    riddleNumber: 4,
    title: "La Dernière Épreuve",
    description: "Énigme finale du mystère",
    question: "Combinez tous les nombres trouvés précédemment (10, 14, 6, 8, 23, 16) et calculez leur somme. Le résultat final révèle l'emplacement du trésor légendaire.",
    answer: 77,
    hint: "Additionnez simplement tous les nombres découverts dans votre aventure : 10 + 14 + 6 + 8 + 23 + 16 = ?",
    points: 200,
    icon: "crown",
  },
];

export function getRiddlesByChapter(chapterNumber: number): Riddle[] {
  return riddles.filter(riddle => riddle.chapterNumber === chapterNumber);
}

export function getRiddleById(id: string): Riddle | undefined {
  return riddles.find(riddle => riddle.id === id);
}

export function getCurrentRiddle(chapterNumber: number, riddleNumber: number): Riddle | undefined {
  return riddles.find(riddle => 
    riddle.chapterNumber === chapterNumber && 
    riddle.riddleNumber === riddleNumber
  );
}
