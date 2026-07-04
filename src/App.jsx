import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Experience />
      </main>
      <Contact />
    </div>
  );
}
