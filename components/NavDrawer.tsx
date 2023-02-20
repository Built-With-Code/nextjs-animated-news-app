import Link from "next/link";
import React from "react";

interface Props {
  toggleNavDrawer: () => void;
}

const NavDrawer: React.FC<Props> = ({ toggleNavDrawer }) => {
  return (
    <div>
      <div className="fixed left-0 top-0 z-50 h-screen bg-white w-1/4 p-4">
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
      </div>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-70"
        onClick={toggleNavDrawer}
      />
    </div>
  );
};

export default NavDrawer;
