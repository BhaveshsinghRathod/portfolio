import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import WriteupsIndex from "./pages/WriteupsIndex";
import WriteupDetail from "./pages/WriteupDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <ScrollToHash />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writeups" element={<WriteupsIndex />} />
          <Route path="/writeups/:slug" element={<WriteupDetail />} />
        </Routes>
      </main>
      <Contact />
    </div>
  );
}