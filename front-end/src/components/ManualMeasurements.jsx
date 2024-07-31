import { Button, Input, Switch } from "@nextui-org/react";
import { DivCardMeasurements } from "./DivCardMeasurements";
import { useRef, useState } from "react";

export function ManualMeasurements({ setValueX, setValueZ, setValueY }) {
  const [isManualMeasurementsOn, setIsManualMeasurementsOn] = useState(false);

  const inputRefX = useRef(null);
  const inputRefY = useRef(null);
  const inputRefZ = useRef(null);

  function onButtonChange() {
    setIsManualMeasurementsOn((prev) => !prev);
  }

  function calculateOnClick() {
    setValueX(inputRefX.current.value);
    setValueY(inputRefY.current.value);
    setValueZ(inputRefZ.current.value);
  }

  return (
    <DivCardMeasurements>
      <Switch size="sm" color="success" onChange={onButtonChange}>
        Manual measurements
      </Switch>
      <Input
        type="number"
        label="X"
        size="sm"
        isDisabled={!isManualMeasurementsOn}
        ref={inputRefX}
      />
      <Input
        type="number"
        label="Y"
        size="sm"
        isDisabled={!isManualMeasurementsOn}
        ref={inputRefY}
      />
      <Input
        type="number"
        label="Z"
        size="sm"
        isDisabled={!isManualMeasurementsOn}
        ref={inputRefZ}
      />
      <Button isDisabled={!isManualMeasurementsOn} onClick={calculateOnClick}>
        Calculate
      </Button>
    </DivCardMeasurements>
  );
}
