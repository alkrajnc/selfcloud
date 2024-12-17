import React from "react";

interface SectionProps {
  button?: React.ReactNode;
  children?: React.ReactNode;
  title: string;
}

const Section = ({ title, children, button }: SectionProps) => {
  return (
    <div className="my-8">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h2 className="text-3xl font-semibold">{title}</h2>
        {button}
      </div>
      {children}
    </div>
  );
};

export default Section;
