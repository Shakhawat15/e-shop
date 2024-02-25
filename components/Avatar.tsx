import Image from "next/image";
import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";

type AvatarProps = {
  src?: string | null | undefined;
};

const Avatar: FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    );
  } else {
    return <FaUserCircle size={30} className="text-gray-500" />;
  }
};

export default Avatar;
