import { H1Component } from "../components/H1Component";
import GHOST_ICON from "../assets/ghost.svg";

export function Ghost() {
  return (
    <>
      <H1Component icon={GHOST_ICON}>Ghost</H1Component>
      <img
        src={GHOST_ICON}
        className="max-w-[200px] mx-auto animate-bounce-slow mt-40"
      />
      <H1Component>Comming soon...</H1Component>
    </>
  );
}
