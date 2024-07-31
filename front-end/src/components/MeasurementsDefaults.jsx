import { Switch } from "@nextui-org/react";
import { H1Component } from "./H1Component";
import { NoRotationDefault } from "./NoRotationDefaults";
import { RotationDefaults } from "./RotationDefaults";
import { useState } from "react";
import RULER from "../assets/ruler.svg";
import { MeasurementsDefaultsModal } from "./MeasurementsDefaultsModal";

export function MeasurementsDefaults({ valueX, valueZ }) {
  const [isRotationOn, setIsRotationOn] = useState(false);
  return (
    <>
      <H1Component className="text-center" icon={RULER}>
        Defaults
      </H1Component>
      <div className="flex justify-evenly flex-col mb-10 mx-auto max-w-max h-[100px] items-center">
        <Switch
          color="success"
          size="sm"
          onChange={() => setIsRotationOn((prev) => !prev)}
        >
          Rotation
        </Switch>
        <MeasurementsDefaultsModal />
      </div>
      {!isRotationOn ? (
        <NoRotationDefault valueX={valueX} />
      ) : (
        <RotationDefaults valueX={valueX} valueZ={valueZ} />
      )}
    </>
  );
}
