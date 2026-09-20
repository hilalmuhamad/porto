import Navbar     from "@/components/navbar";
import Hero        from "@/components/sections/hero";
import Stats       from "@/components/sections/stats";
import About       from "@/components/sections/about";
import Skills      from "@/components/sections/skills";
import Projects    from "@/components/sections/projects";
import Experience  from "@/components/sections/experience";
import Education   from "@/components/sections/education";
import Contact     from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Education />
      <div className="divider" />
      <Contact />
    </main>
  );
}