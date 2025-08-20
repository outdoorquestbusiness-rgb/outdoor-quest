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
import RiddleChapter from "@/pages/riddle-chapter";
import CompassNavigation from "@/pages/compass-navigation";
import FirstEnigma from "@/pages/first-enigma";
import SecondCompass from "@/pages/second-compass";
import SecondEnigma from "@/pages/second-enigma";
import ThirdCompass from "@/pages/third-compass";
import ThirdEnigma from "@/pages/third-enigma";
import AlpineStation from "@/pages/alpine-station";

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
      <Route path="/forest-challenge" component={RiddleChapter} />
      <Route path="/compass-navigation" component={CompassNavigation} />
      <Route path="/first-enigma" component={FirstEnigma} />
      <Route path="/second-compass" component={SecondCompass} />
      <Route path="/second-enigma" component={SecondEnigma} />
      <Route path="/third-compass" component={ThirdCompass} />
      <Route path="/third-enigma" component={ThirdEnigma} />
      <Route path="/alpine-station" component={AlpineStation} />
      <Route path="/riddle-chapter" component={RiddleChapter} />

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
