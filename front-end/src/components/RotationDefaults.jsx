import { Divider } from "@nextui-org/react";
import ROTATION_KIND_LEFT from "../assets/RotationKindLeft.png";
import ROTATION_KIND_RIGHT from "../assets/RotationKindRight.png";
import { CustomSnippet } from "./CustomSnippet";
import { ShadowDiv } from "./ShadowDiv";
import {
  getKindNegativeResult,
  getKindPositiveResult,
} from "../helpers/getRotationCalculations";

export function RotationDefaults({ valueX, valueZ }) {
  return (
    <ShadowDiv className=" grid grid-cols-2 grid-rows-5 gap-5 p-10 place-items-center max-w-[800px] mx-auto">
      <img
        src={ROTATION_KIND_LEFT}
        className="col-start-1 row-start-1 row-end-3 w-[150px]"
      />
      <ShadowDiv className="flex flex-col justify-evenly items-center w-[200px] h-[200px]">
        <p>Kind Left</p>
        <CustomSnippet imgVariant={3} width={"w-[80%]"}>
          {getKindNegativeResult(valueZ)}
        </CustomSnippet>
      </ShadowDiv>
      <ShadowDiv className="flex flex-col justify-evenly items-center w-[200px] h-[200px]">
        <p>Kind Right</p>
        <CustomSnippet imgVariant={1} width={"w-[80%]"}>
          {getKindPositiveResult(valueX)}
        </CustomSnippet>
      </ShadowDiv>
      <Divider className="row-start-3 col-span-full" />
      <img
        src={ROTATION_KIND_RIGHT}
        className="col-start-1 row-start-4 row-span-full w-[150px]"
      />
      <ShadowDiv className="flex flex-col justify-evenly items-center w-[200px] h-[200px] row-start-4">
        <p>Kind Left</p>
        <CustomSnippet imgVariant={1} width={"w-[80%]"}>
          {getKindNegativeResult(valueX)}
        </CustomSnippet>
      </ShadowDiv>
      <ShadowDiv className="flex flex-col justify-evenly items-center w-[200px] h-[200px] row-start-5">
        <p>Kind Right</p>
        <CustomSnippet imgVariant={3} width={"w-[80%]"}>
          {getKindNegativeResult(valueZ)}
        </CustomSnippet>
      </ShadowDiv>
    </ShadowDiv>
  );
}
