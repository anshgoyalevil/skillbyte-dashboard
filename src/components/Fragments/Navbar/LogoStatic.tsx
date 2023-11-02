import React from "react";
import DarkPNG from "./2.png";
import LightPNG from "./1.png";
import { useMantineTheme } from "@mantine/core";

function LogoStatic() {
  const { colorScheme } = useMantineTheme();
  return (
    <div>
      <img src={colorScheme === "dark" ? DarkPNG : LightPNG} alt="" width={150} />
    </div>
  );
}

export default LogoStatic;