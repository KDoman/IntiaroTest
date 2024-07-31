import { FullMeasurements } from "../components/FullMeasurements";
import { H1Component } from "../components/H1Component";
import { ManualMeasurements } from "../components/ManualMeasurements";
import { MeasurementsResult } from "../components/MeasurementsResult";
import { MeasurementsDefaults } from "../components/MeasurementsDefaults";
import CALC_ICON from "../assets/calc.svg";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

export function Measurements() {
  const [fullValue, setFullValue] = useState("");
  const [valueX, setValueX] = useState("");
  const [valueY, setValueY] = useState("");
  const [valueZ, setValueZ] = useState("");

  return (
    <div className="mb-10 relative">
      <H1Component icon={CALC_ICON}>Measurements</H1Component>
      <div className="grid grid-cols-[repeat(2,minmax(200px,1fr))] grid-rows-2 gap-y-10">
        <FullMeasurements
          fullValue={fullValue}
          setFullValue={setFullValue}
          setValueX={setValueX}
          setValueY={setValueY}
          setValueZ={setValueZ}
        />
        <MeasurementsResult valueX={valueX} valueY={valueY} valueZ={valueZ} />
        <ManualMeasurements
          setValueX={setValueX}
          setValueY={setValueY}
          setValueZ={setValueZ}
        />
      </div>
      <Divider className="mb-10" />
      <MeasurementsDefaults valueX={valueX} valueZ={valueZ} />
    </div>
  );
}
