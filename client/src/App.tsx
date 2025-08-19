import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Contact from "@/pages/contact";
import Missions from "@/pages/missions";
import MissionDetails from "@/pages/mission-details";
import Rules from "@/pages/rules";

import MissionIntro from "@/pages/mission-intro";

import RiddlePage from "@/pages/riddle";
import GameEnd from "@/pages/game-end";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/missions" component={Missions} />
      <Route path="/mission/:id">
        {(params) => <MissionDetails missionId={params.id} />}
      </Route>
      <Route path="/rules" component={Rules} />

      <Route path="/mission-intro" component={MissionIntro} />

      <Route path="/riddle/chapter/:chapter/riddle/:riddle">
        {(params) => (
          <RiddlePage
            chapterNumber={parseInt(params.chapter)}
            riddleNumber={parseInt(params.riddle)}
          />
        )}
      </Route>
      <Route path="/game-end" component={GameEnd} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
