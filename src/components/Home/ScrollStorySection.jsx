import { useRef } from "react";
import { useScroll } from "framer-motion";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import '../../App.css'

const STEPS = 4;

export default function ScrollStorySection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${STEPS * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            w-full
            grid
            grid-cols-1
            md:grid-cols-2
            gap-14 md:gap-24
          "
        >
          <LeftContent scrollYProgress={scrollYProgress} />
          <RightContent scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
