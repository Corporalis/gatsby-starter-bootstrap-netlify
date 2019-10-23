import React from "react";
import TextPrimaryContentSection from "../components/sections/textPrimaryContentSection";

const AboutContent = ({ html, title, image }) => {
  return (
      <TextPrimaryContentSection
        name="about"
        title={title}
        image={image}
        html={html}
      />
  );
};

export default AboutContent;
