import { H1Component } from "../components/H1Component";
import PYTHON_ICON from "../assets/python.svg";
import { Button, Divider, Input } from "@nextui-org/react";

export function Python() {
  return (
    <>
      <H1Component icon={PYTHON_ICON}>Python</H1Component>
      <div className="flex justify-evenly w-full mb-10">
        <Input type="text" label="Login" className="w-1/3" />
        <Input type="password" label="Password" className="w-1/3" />
      </div>
      <Divider />
      <Input type="text" label="Url" className="w-1/3 my-10 mx-auto" />
      <Button className="block mx-auto mb-10">Run script</Button>
    </>
  );
}
