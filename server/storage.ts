import { type Mission, type UserProgress, type ContactMessage, type InsertMission, type InsertUserProgress, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Missions
  getMissions(): Promise<Mission[]>;
  getMissionById(id: string): Promise<Mission | undefined>;
  getMissionByAccessCode(code: string): Promise<Mission | undefined>;
  createMission(mission: InsertMission): Promise<Mission>;
  
  // User Progress
  getUserProgress(userId: string, missionId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: string, missionId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private missions: Map<string, Mission>;
  private userProgress: Map<string, UserProgress>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.missions = new Map();
    this.userProgress = new Map();
    this.contactMessages = new Map();
    
    // Initialize with the default mission
    this.initializeDefaultData();
  }

  // Reset to initial state (only default mission)
  resetToInitialState() {
    this.missions.clear();
    this.userProgress.clear();
    this.contactMessages.clear();
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Pre-defined mission that shows without "nouveau" label
    const preMission: Mission = {
      id: "outdoor-exploration-basic",
      name: "Exploration Outdoor de Base",
      description: "Une initiation à l'aventure outdoor pour tous",
      duration: "1-2 heures",
      difficulty: "Facile",
      ageRecommended: "8+ ans", 
      location: "Parc Local",
      accessCode: "BASIC",
      isActive: true,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    };
    
    this.missions.set(preMission.id, preMission);
  }

  async getMissions(): Promise<Mission[]> {
    return Array.from(this.missions.values()).filter(m => m.isActive);
  }

  async getMissionById(id: string): Promise<Mission | undefined> {
    return this.missions.get(id);
  }

  async getMissionByAccessCode(code: string): Promise<Mission | undefined> {
    return Array.from(this.missions.values()).find(m => m.accessCode === code);
  }

  async createMission(insertMission: InsertMission): Promise<Mission> {
    const id = randomUUID();
    const mission: Mission = {
      id,
      name: insertMission.name,
      description: insertMission.description || null,
      duration: insertMission.duration || null,
      difficulty: insertMission.difficulty || null,
      ageRecommended: insertMission.ageRecommended || null,
      location: insertMission.location || null,
      accessCode: insertMission.accessCode || null,
      isActive: insertMission.isActive ?? true,
      createdAt: new Date(),
    };
    
    // Don't persist added missions - they are temporary for the session only
    // Note: This mission will be lost on server restart, which is the intended behavior
    this.missions.set(id, mission);
    return mission;
  }

  async getUserProgress(userId: string, missionId: string): Promise<UserProgress | undefined> {
    const key = `${userId}-${missionId}`;
    return this.userProgress.get(key);
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const key = `${insertProgress.userId}-${insertProgress.missionId}`;
    const progress: UserProgress = {
      id,
      userId: insertProgress.userId,
      missionId: insertProgress.missionId,
      currentChapter: insertProgress.currentChapter || null,
      currentRiddle: insertProgress.currentRiddle || null,
      completedChapters: insertProgress.completedChapters || null,
      score: insertProgress.score || null,
      timeSpent: insertProgress.timeSpent || null,
      hintsUsed: insertProgress.hintsUsed || null,
      isCompleted: insertProgress.isCompleted ?? false,
      updatedAt: new Date(),
    };
    this.userProgress.set(key, progress);
    return progress;
  }

  async updateUserProgress(userId: string, missionId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const key = `${userId}-${missionId}`;
    const existing = this.userProgress.get(key);
    if (!existing) return undefined;

    const updated: UserProgress = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.userProgress.set(key, updated);
    return updated;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      id,
      message: insertMessage.message,
      language: insertMessage.language || null,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
