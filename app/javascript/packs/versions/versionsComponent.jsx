import React from "react";
const Versions = () => {
  const hoardVersions = ["v0.0.1"];
  return (
    <ul className="versionsUL">
      {hoardVersions.map((ver, idx) => (
        <li key={idx}>{ver}</li>
      ))}
    </ul>
  );
};
export default Versions;
