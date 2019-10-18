import { useEffect } from "react";

const Scrollable = ({ onWindowScroll }) => {
  const handleScroll = event => {
    if (onWindowScroll) {
      onWindowScroll(event);
    }
  };

  useEffect(() => {
    if (onWindowScroll) {
      window.addEventListener("scroll", handleScroll, false);
    }
    return () => {
      if (onWindowScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  });

  return null;
};
export default Scrollable;
