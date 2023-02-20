import {
  clamp,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React from "react";

const useBoundedScroll = (bounds: number) => {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  );

  useMotionValueEvent(scrollY, "change", (current) => {
    let previous = scrollY.getPrevious();
    let diff = current - previous;
    let newScrollYBounded = scrollYBounded.get() + diff;

    scrollYBounded.set(clamp(0, bounds, newScrollYBounded));
  });

  return { scrollYBounded, scrollYBoundedProgress };
};

interface Props {
  onMenuClick: () => void;
  showScrollProgress?: boolean;
}

const Navbar: React.FC<Props> = ({ onMenuClick, showScrollProgress }) => {
  // Scroll progress bar
  let { scrollYProgress } = useScroll();
  let progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Dynamic logo size on scroll
  let { scrollYBoundedProgress } = useBoundedScroll(100);

  let dynamicFontSize = useTransform(
    scrollYBoundedProgress,
    [0, 1],
    ["1.5rem", "1rem"]
  );

  return (
    <nav className="flex align-center gap-x-6 w-full px-8 py-4 fixed top-0 z-10 bg-white border-b-2">
      <div
        className="flex flex-col gap-y-1 justify-center cursor-pointer rounded-full hover:bg-gray-100 hover:transition-colors px-2"
        onClick={onMenuClick}
      >
        {Array.from(Array(3).keys()).map((_, idx) => (
          <div className="w-5 h-0.5 bg-black" key={idx} />
        ))}
      </div>
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}>
        <motion.h1 className="font-bold" style={{ fontSize: dynamicFontSize }}>
          The Front Page
        </motion.h1>
      </Link>

      {showScrollProgress && (
        <motion.div
          style={{ width: progressBarWidth }}
          className="h-1 bg-blue-500 absolute bottom-0 left-0 max-w-[100%]"
        />
      )}
    </nav>
  );
};

export default Navbar;
