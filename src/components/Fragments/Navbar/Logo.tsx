import React from "react";
import DarkGIF from "./2.png";
import LightGIF from "./1.png";
import { useMantineTheme } from "@mantine/core";

function Logo() {
  const { colorScheme } = useMantineTheme();
  return (
    <div>
      <img src={colorScheme === "dark" ? DarkGIF : LightGIF} alt="" width={150} />
    </div>
  );
}

export default Logo;