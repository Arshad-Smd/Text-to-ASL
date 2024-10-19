import React from "react";
import { Unity } from "react-unity-webgl";

const ASLto3D = ({ unityContext, unityProvider }) => {
  return (
    <Unity
      className="unity-container"
      unityContext={unityContext}
      unityProvider={unityProvider}
    />
  );
};

export default ASLto3D;
