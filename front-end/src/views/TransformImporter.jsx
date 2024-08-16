import { useState } from "react";
import { H1Component } from "../components/H1Component";
import TRANSFORM_IMPORTER_ICON from "../assets/transform_importer.svg";
import { Button } from "@nextui-org/button";
import { UploadFileDiv } from "../components/UploadFileDiv";
import { Input } from "@nextui-org/input";

export const TransformImporter = () => {
  const [transforms, setTransforms] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleFileUpload = (event) => {
    setIsButtonDisabled(false);

    const selectedFile = event.target.files[0];

    if (!selectedFile || !selectedFile.size) {
      console.log("pusty plik");
      setIsButtonDisabled(true); // zrób coś jak plik będzie pusty
      return;
    }

    if (selectedFile && selectedFile.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setTransforms(e.target.result);
        setFile(selectedFile);
      };
      reader.readAsText(selectedFile);
    } else {
      console.error("Invalid file type."); // zrób coś jak plik nie będzie równy text/plain
    }
  };

  const handleSubmit = async () => {
    if (!file || !username || !password) {
      alert("Sprawdź dane logowania oraz plik");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // Dodaj plik do FormData

      // Dodanie dodatkowych danych
      formData.append("username", username);
      formData.append("password", password);
      formData.append("transforms", transforms);

      const response = await fetch(
        "https://karolkrusz-transforms-importer.hf.space/run-playwright/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Transforms submitted successfully."); //Zrób coś jak przejdzie
      } else if (response.status === 420) {
        alert("Błąd logowania"); // Zrób coś jak jest błąd logowania
        return;
      } else if (response.status === 503) {
        alert("Błąd serwera, skontaktuj się z developerem ;)");
      }
    } catch (err) {
      alert("Błąd serwera, skontaktuj się z developerem ;)");
    }
  };

  return (
    <>
      <H1Component icon={TRANSFORM_IMPORTER_ICON}>
        Transform Uploader
      </H1Component>
      <div className="grid gap-10 m-20">
        <Input
          size="sm"
          type="text"
          value={username}
          label="Login"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          size="sm"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <UploadFileDiv onChange={handleFileUpload} width="w-full" />

        <Button isDisabled={isButtonDisabled} onClick={handleSubmit}>
          Wyślij
        </Button>
      </div>
    </>
  );
};
