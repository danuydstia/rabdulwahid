
"use client";
import Cursor  from "./components/cursor";
import Navbar  from "./components/Navbar";
import Hero    from "./components/Hero";
import Ticker  from "./components/Ticker";
import Work    from "./components/Work";
import About   from "./components/About";
import Contact from "./components/contact";


export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Work />
      <About />
      <Contact />
    </>
  );
}