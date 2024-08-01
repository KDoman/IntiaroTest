import { H1Component } from "../components/H1Component";
import PYTHON_ICON from "../assets/python.svg";
import { Button, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

export function Python() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const sendData = async () => {
    await axios
      .post(API_URL, {
        login: login,
        password: password,
        url: url,
        fileName: fileName,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <H1Component icon={PYTHON_ICON}>Python</H1Component>
      <div className="flex justify-evenly w-full mb-10">
        <Input
          type="text"
          label="Login"
          className="w-1/3"
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          className="w-1/3"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Divider />
      <div className="flex justify-evenly w-full my-10">
        <Input
          type="text"
          label="Url"
          className="w-1/3"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Input
          type="text"
          label="File name"
          className="w-1/3"
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <Button className="block mx-auto mb-10" onClick={sendData}>
        Run script
      </Button>
    </>
  );
}
