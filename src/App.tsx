import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

// Core canonical pages (eager imports for synchronous SSR pre-rendering)
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Workshops from "./pages/Workshops";
import Resources from "./pages/Resources";
import ResourceArticlePage from "./pages/ResourceArticlePage";
import Contact from "./pages/Contact";
import AreasWeServe from "./pages/AreasWeServe";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ThoughtOfTheDay from "./pages/ThoughtOfTheDay";
import NotFound from "./pages/NotFound";

// Dedicated Service Landing Pages
import CbtTherapyPune from "./pages/services/CbtTherapyPune";
import AnxietyCounsellingPune from "./pages/services/AnxietyCounsellingPune";
import BurnoutWorkStressCounsellingPune from "./pages/services/BurnoutWorkStressCounsellingPune";
import SelfEsteemTherapyPune from "./pages/services/SelfEsteemTherapyPune";
import OverthinkingTherapy from "./pages/services/OverthinkingTherapy";
import CareerCounsellingPune from "./pages/services/CareerCounsellingPune";
import StudentAdolescentCounsellingPune from "./pages/services/StudentAdolescentCounsellingPune";
import OnlineTherapyIndia from "./pages/services/OnlineTherapyIndia";
import PrabhatRoadCounsellingPune from "./pages/services/PrabhatRoadCounsellingPune";
import DepressionCounsellingPune from "./pages/services/DepressionCounsellingPune";
import RelationshipCouplesCounsellingPune from "./pages/services/RelationshipCouplesCounsellingPune";
import TalkTherapyPune from "./pages/services/TalkTherapyPune";
import ParentingFamilyCounsellingPune from "./pages/services/ParentingFamilyCounsellingPune";
import MindfulnessMeditationPune from "./pages/services/MindfulnessMeditationPune";
import BehaviouralChangeHabitCoachingPune from "./pages/services/BehaviouralChangeHabitCoachingPune";
import GenZWorkplaceWorkshopPune from "./pages/services/GenZWorkplaceWorkshopPune";
import HowToChoosePsychologistPune from "./pages/HowToChoosePsychologistPune";

// Hindi (hi-IN) Top Pages
import HomeHi from "./pages/hi/HomeHi";
import CbtTherapyHi from "./pages/hi/CbtTherapyHi";
import AnxietyCounsellingHi from "./pages/hi/AnxietyCounsellingHi";
import BurnoutCounsellingHi from "./pages/hi/BurnoutCounsellingHi";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Core Canonical Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/:slug" element={<ResourceArticlePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="areas-we-serve" element={<AreasWeServe />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="thought-of-the-day" element={<ThoughtOfTheDay />} />

          {/* Canonical Section 2 & Specialized Service Landing Pages */}
          <Route path="services/cbt-therapy-pune" element={<CbtTherapyPune />} />
          <Route path="services/stress-anxiety-counselling-pune" element={<AnxietyCounsellingPune />} />
          <Route path="services/burnout-counselling-pune" element={<BurnoutWorkStressCounsellingPune />} />
          <Route path="services/self-esteem-therapy-pune" element={<SelfEsteemTherapyPune />} />
          <Route path="services/overthinking-therapy" element={<OverthinkingTherapy />} />
          <Route path="services/career-counselling-pune" element={<CareerCounsellingPune />} />
          <Route path="services/student-adolescent-counselling-pune" element={<StudentAdolescentCounsellingPune />} />
          <Route path="services/online-therapy-india" element={<OnlineTherapyIndia />} />
          <Route path="services/counselling-prabhat-road-pune" element={<PrabhatRoadCounsellingPune />} />
          <Route path="services/depression-counselling-pune" element={<DepressionCounsellingPune />} />
          <Route path="services/relationship-couples-counselling-pune" element={<RelationshipCouplesCounsellingPune />} />
          <Route path="services/talk-therapy-pune" element={<TalkTherapyPune />} />
          <Route path="services/parenting-family-counselling-pune" element={<ParentingFamilyCounsellingPune />} />
          <Route path="services/mindfulness-meditation-pune" element={<MindfulnessMeditationPune />} />
          <Route path="services/behavioural-change-habit-coaching-pune" element={<BehaviouralChangeHabitCoachingPune />} />
          <Route path="workshops/gen-z-in-the-workplace-pune" element={<GenZWorkplaceWorkshopPune />} />

          {/* Pillar Guide Route */}
          <Route path="guides/how-to-choose-a-psychologist-pune" element={<HowToChoosePsychologistPune />} />

          {/* Hindi (hi-IN) Translated Routes */}
          <Route path="hi" element={<HomeHi />} />
          <Route path="hi/services/cbt-therapy-pune" element={<CbtTherapyHi />} />
          <Route path="hi/services/stress-anxiety-counselling-pune" element={<AnxietyCounsellingHi />} />
          <Route path="hi/services/burnout-counselling-pune" element={<BurnoutCounsellingHi />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
