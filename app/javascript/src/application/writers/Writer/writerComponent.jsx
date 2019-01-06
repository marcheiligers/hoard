import React from "react";
const Writer = ({ id, name, born, deceased, description, image }) => (
  <div>
    <h1>{name}</h1>
    <h2>
      {born} to {deceased}
    </h2>
    <p>{description}</p>
    {image && <img src={image} alt={name} />}
  </div>
);
export default Writer;
