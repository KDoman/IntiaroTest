import { H1Component } from "../components/H1Component";
import IMG_TO_PNG from "../assets/converter.svg";
import { JpegToPngConverter } from "../components/JpegToPngConverter";
import { Divider } from "@nextui-org/react";

export function JpgToPng() {
  return (
    <>
      <H1Component icon={IMG_TO_PNG}>JPG to PNG</H1Component>
      <Divider />
      <JpegToPngConverter />
    </>
  );
}
