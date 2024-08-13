import { useState } from "react";

const parseTxtToTransforms = (fileContents) => {
  const transforms = {};
  let currentTransform = null;
  let currentSection = null;
  let transformCounter = 0;

  fileContents.forEach((content) => {
    const lines = content.split("\n");

    lines.forEach((line) => {
      line = line.trim();

      if (!line) return;

      if (line.includes("Position")) {
        transformCounter += 1;
        currentTransform = `Transform ${transformCounter}`;
        transforms[currentTransform] = {};
        currentSection = "Position";
        transforms[currentTransform][currentSection] = [];
      } else if (line.includes("Rotation")) {
        currentSection = "Rotation";
        transforms[currentTransform][currentSection] = [];
      } else if (line.includes("Scale")) {
        currentSection = "Scale";
        transforms[currentTransform][currentSection] = [];
      } else if (
        currentSection &&
        (line.includes("X:") || line.includes("Y:") || line.includes("Z:"))
      ) {
        const value = parseFloat(line.split(":")[1].trim());
        transforms[currentTransform][currentSection].push(value);
      }
    });
  });

  return transforms;
};

export const Python = () => {
  const [transforms, setTransforms] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const fileReaders = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      fileReaders.push(
        new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(files[i]);
        })
      );
    }

    Promise.all(fileReaders).then((contents) => {
      const parsedTransforms = parseTxtToTransforms(contents);
      setTransforms(parsedTransforms);
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://intiaro-back-end.vercel.app/submit-transforms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transforms,
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("Transforms submitted successfully.");
      } else {
        alert("Error submitting transforms.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting transforms.");
    }
  };

  return (
    <div>
      <h1>Transform Uploader</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileUpload} />
      <button onClick={handleSubmit}>Log in and Submit</button>
    </div>
  );
};
