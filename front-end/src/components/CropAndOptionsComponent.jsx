import { Divider, Input, Slider, Switch } from "@nextui-org/react";
import { CropComponent } from "./CropComponent";
import { IconAndThumbnailButtons } from "./IconAndThumbnailButtons";
import { H1Component } from "./H1Component";
import OPTIONS_LOGO from "../assets/options.svg";
import { useRef, useState } from "react";

export function CropAndOptionsComponent({ pngUrl, urlImage }) {
  const [pngName, setPngName] = useState("");
  const [scale, setScale] = useState(1);
  const previewCanvasRef = useRef(null);
  const [transparentBg, setTransparentBg] = useState(true);

  return (
    <>
      <CropComponent
        pngUrl={pngUrl}
        urlImage={urlImage}
        scale={scale}
        previewCanvasRef={previewCanvasRef}
        transparentBg={transparentBg}
      />
      <Divider />
      <H1Component icon={OPTIONS_LOGO} customIconWidht="3">
        Options
      </H1Component>
      <Slider
        className="max-w-[390px] mx-auto my-10"
        label="Scale"
        step={0.1}
        maxValue={3}
        minValue={0}
        defaultValue={scale}
        color="foreground"
        onChange={(e) => setScale(e)}
      />
      <Switch
        className="flex mx-auto"
        color="success"
        onChange={() => setTransparentBg((prev) => !prev)}
      >
        White background
      </Switch>
      <Input
        type="text"
        label="File name (optional)"
        className="w-1/2 mx-auto my-10"
        onChange={(e) => setPngName(e.target.value)}
      />
      <IconAndThumbnailButtons
        pngName={pngName}
        previewCanvasRef={previewCanvasRef}
      />
    </>
  );
}
