import Link from "next/link";
import React from "react";

interface Props {
  onMenuClick: () => void;
  showScrollProgress?: boolean;
}

const Navbar: React.FC<Props> = ({ onMenuClick, showScrollProgress }) => {
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
        <h1 className="font-bold">The Front Page</h1>
      </Link>

      {showScrollProgress && (
        <div className="h-1 bg-blue-500 absolute bottom-0 left-0 max-w-[100%]" />
      )}
    </nav>
  );
};

export default Navbar;
