import React from "react";
import Image from "next/future/image";
import Link from "next/link";

const Header = ({className}) => {
  return (
    <div className={className}>
      <div>
        <Image
          src="/logo2.jpg"
          width={50}
          height={50}
          objectFit="cover"
          alt="logo"
        />
      </div>
      <div>
        <Link href="/add-player">Add Player</Link>
      </div>
      <div>
        <Link href="/list-of-players">List Of Players</Link>
      </div>
    </div>
  );
};

export default Header;
