import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Contact from "@/pages/contact";
import Missions from "@/pages/missions";
import MissionDetails from "@/pages/mission-details";
import MissionIntro from "@/pages/mission-intro";
import RiddleChapter from "@/pages/riddle-chapter";
import CompassNavigation from "@/pages/compass-navigation";
import FirstEnigma from "@/pages/first-enigma";
import SecondCompass from "@/pages/second-compass";
import SecondEnigma from "@/pages/second-enigma";
import ThirdCompass from "@/pages/third-compass";
import ThirdEnigma from "@/pages/third-enigma";
import AlpineStation from "@/pages/alpine-station";
import OrientationTable from "@/pages/orientation-table";
import Step1FindTable from "@/pages/step1-find-table";
import Step2DecipherPassword from "@/pages/step2-decipher-password";
import Step3IdentifyMountain from "@/pages/step3-identify-mountain";
import FinalSummit from "@/pages/final-summit";
import JourneytoCross from "@/pages/journey-to-cross";
import CrossEnigma from "@/pages/cross-enigma";
import ArDahuDiscovery from "@/pages/ar-dahu-discovery";
import FinalCongratulations from "@/pages/final-congratulations";
import Teams from "@/pages/teams";
import Rules from "@/pages/rules";

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
      <Route path="/orientation-table" component={OrientationTable} />
      <Route path="/step1-find-table" component={Step1FindTable} />
      <Route path="/step2-decipher-password" component={Step2DecipherPassword} />
      <Route path="/step3-identify-mountain" component={Step3IdentifyMountain} />
      <Route path="/final-summit" component={FinalSummit} />
      <Route path="/journey-to-cross" component={JourneytoCross} />
      <Route path="/cross-enigma" component={CrossEnigma} />
      <Route path="/ar-dahu-discovery" component={ArDahuDiscovery} />
      <Route path="/final-congratulations" component={FinalCongratulations} />
      <Route path="/teams" component={Teams} />
      <Route path="/rules" component={Rules} />
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
