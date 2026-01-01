import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Static/Navbar";
import Footer from "./components/Static/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Creators from "./pages/Creators";
import SpecialMentionsPage from "./pages/footer/SpecialMentions";
import HelpSupportPage from "./pages/footer/Support";
import Explore from "./pages/Explore";
import CreatePostForm from "./pages/PostForm";
import SinglePlace from "./pages/SinglePlace";
import ChatPage from "./pages/ChatPage";
import Connect from "./components/connect/Connect";
import SearchResults from "./components/SearchResults";
import ProfileRouter from "./pages/ProfileRouter";
import BestSeasonUttarakhand from "./pages/guides/BestSeasonUttarakhand";
import TopPlacesUttarakhand from "./pages/guides/TopPlaceUttarakhand";
import BestTreksUttarakhand from "./pages/guides/BestTreksUttarakhand";
import UttarakhandItineraries from "./pages/guides/UttarakhandItineraries";
import UttarakhandTravelCost from "./pages/guides/UttarakhandTravelCost";
import UttarakhandPackingList from "./pages/guides/UttarakhandPackingList";
import UttarakhandTravelTips from "./pages/guides/UttarakhandTravelTips";
import Terms from "./pages/footer/Terms";
import Safety from "./pages/footer/Safety";
import ForHost from "./pages/footer/ForHost";
import AboutUs from "./pages/footer/About";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const protectedPrefixes = [
    "/explore",
    "/search",
    "/connect",
    "/profile",
    "/post",
    "/place",
    "/chat",
    "/guides",
  ];

  const isProtectedRoute = protectedPrefixes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/host" element={<ForHost />} />
          <Route path="/mentions" element={<SpecialMentionsPage />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/support" element={<HelpSupportPage />} />
          <Route path="/about" element={<AboutUs />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect"
            element={
              <ProtectedRoute>
                <Connect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <ProfileRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <CreatePostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place/:city"
            element={
              <ProtectedRoute>
                <SinglePlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* GUIDES */}
          <Route
            path="/guides/best-season-to-visit-uttarakhand"
            element={
              <ProtectedRoute>
                <BestSeasonUttarakhand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/top-7-himalayan-treks"
            element={
              <ProtectedRoute>
                <TopPlacesUttarakhand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/best-treks-uttarakhand"
            element={
              <ProtectedRoute>
                <BestTreksUttarakhand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/uttarakhand-itineraries"
            element={
              <ProtectedRoute>
                <UttarakhandItineraries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/uttarakhand-travel-cost"
            element={
              <ProtectedRoute>
                <UttarakhandTravelCost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/uttarakhand-packing-list"
            element={
              <ProtectedRoute>
                <UttarakhandPackingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/uttarakhand-travel-tips"
            element={
              <ProtectedRoute>
                <UttarakhandTravelTips />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer ONLY on public pages */}
      {!isProtectedRoute && <Footer />}
    </div>
  );
}

export default App;
