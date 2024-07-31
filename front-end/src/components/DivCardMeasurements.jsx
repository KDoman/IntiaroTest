import { ShadowDiv } from "./ShadowDiv";

export function DivCardMeasurements({ children }) {
  return (
    <ShadowDiv
      className={`w-[300px] mx-auto flex flex-col py-4 px-8 justify-evenly min-h-[300px]`}
    >
      {children}
    </ShadowDiv>
  );
}
