import { ShadowDiv } from "./ShadowDiv";
import { CustomSnippet } from "../components/CustomSnippet";
import NO_ROTATION_KIND_LEFT from "../assets/NoRotationKindLeft.png";
import NO_ROTATION_KIND_RIGHT from "../assets/NoRotationKindRight.png";
import { Divider } from "@nextui-org/react";
import {
  getKindNegativeResult,
  getKindPositiveResult,
} from "../helpers/getRotationCalculations";

export function NoRotationDefault({ valueX }) {
  return (
    <ShadowDiv className=" grid grid-cols-2 grid-rows-3 gap-5 p-10 place-items-center max-w-[800px] mx-auto">
      <img src={NO_ROTATION_KIND_LEFT} className="w-[150px]" />
      <ShadowDiv className="flex flex-col justify-evenly items-center w-[200px] h-[200px]">
        <p>Kind Left</p>
        <CustomSnippet width={"w-[80%]"} imgVariant={1}>
          {getKindNegativeResult(valueX)}
        </CustomSnippet>
      </ShadowDiv>
      <Divider className="col-span-full" />
      <img src={NO_ROTATION_KIND_RIGHT} className="w-[150px]" />
      <ShadowDiv className="flex flex-col justify-evenly items-center w-[200px] h-[200px]">
        <p>Kind Right</p>
        <CustomSnippet width={"w-[80%]"} imgVariant={1}>
          {getKindPositiveResult(valueX)}
        </CustomSnippet>
      </ShadowDiv>
    </ShadowDiv>
  );
}
