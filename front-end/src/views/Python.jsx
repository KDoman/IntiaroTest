import { useState } from "react";

export const Python = () => {
  const [transforms, setTransforms] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setTransforms(e.target.result);
        setFile(selectedFile);
      };

      reader.readAsText(selectedFile);
    } else {
      console.error("Invalid file type.");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("No file uploaded!");
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
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSubmit}>Log in and Submit</button>
    </div>
  );
};
