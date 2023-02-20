import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface Props {
  toggleNavDrawer: () => void;
}

const NavDrawer: React.FC<Props> = ({ toggleNavDrawer }) => {
  return (
    <div>
      <motion.div
        className="fixed left-0 top-0 z-50 h-screen bg-white w-1/4 p-4"
        initial={{ left: "-25%" }}
        animate={{
          left: 0,
          transition: { duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] },
        }}
        exit={{
          left: "-25%",
          transition: { duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] },
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">The Front Page</h1>
          <div className="cursor-pointer" onClick={toggleNavDrawer}>
            Close
          </div>
        </div>
        <div className="flex flex-col gap-y-4 mt-4 text-lg">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            onClick={toggleNavDrawer}
          >
            Home
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/category/global`}
            onClick={toggleNavDrawer}
          >
            Global
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/category/technology`}
            onClick={toggleNavDrawer}
          >
            Technology
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/category/science`}
            onClick={toggleNavDrawer}
          >
            Science
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          transition: { duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] },
        }}
        onClick={toggleNavDrawer}
      />
    </div>
  );
};

export default NavDrawer;
