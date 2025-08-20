import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertUserProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all missions
  app.get("/api/missions", async (req, res) => {
    try {
      const missions = await storage.getMissions();
      res.json(missions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch missions" });
    }
  });

  // Get mission by access code
  app.post("/api/missions/validate-code", async (req, res) => {
    try {
      const { accessCode } = req.body;
      if (!accessCode) {
        return res.status(400).json({ message: "Access code is required" });
      }

      // Check if this is the special Môle mission
      if (accessCode === "1234") {
        const moleMission: InsertMission = {
          name: "Sur les traces du mystérieux Dahu",
          description: "Une aventure mystérieuse vous attend sur le mont Môle à la recherche du dahu blanc", 
          duration: "2-3 heures",
          difficulty: "Intermédiaire",
          ageRecommended: "12+ ans",
          location: "Le Môle (Outdoor)",
          accessCode: "1234",
          isActive: true,
        };
        const createdMission = await storage.createMission(moleMission);
        return res.json(createdMission);
      }

      const mission = await storage.getMissionByAccessCode(accessCode);
      if (!mission) {
        return res.status(404).json({ message: "Invalid access code" });
      }

      res.json(mission);
    } catch (error) {
      res.status(500).json({ message: "Failed to validate access code" });
    }
  });

  // Get mission by ID
  app.get("/api/missions/:id", async (req, res) => {
    try {
      const mission = await storage.getMissionById(req.params.id);
      if (!mission) {
        return res.status(404).json({ message: "Mission not found" });
      }
      res.json(mission);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mission" });
    }
  });

  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Get user progress
  app.get("/api/progress/:userId/:missionId", async (req, res) => {
    try {
      const { userId, missionId } = req.params;
      const progress = await storage.getUserProgress(userId, missionId);
      res.json(progress || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Create or update user progress
  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse(req.body);
      
      // Check if progress exists
      const existing = await storage.getUserProgress(validatedData.userId, validatedData.missionId);
      
      let progress;
      if (existing) {
        progress = await storage.updateUserProgress(
          validatedData.userId, 
          validatedData.missionId, 
          validatedData
        );
      } else {
        progress = await storage.createUserProgress(validatedData);
      }
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
