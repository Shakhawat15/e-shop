import { FC } from "react";

type HeadingProps = {
  title: string;
  center?: boolean;
};

const Heading: FC<HeadingProps> = ({ title, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default Heading;
