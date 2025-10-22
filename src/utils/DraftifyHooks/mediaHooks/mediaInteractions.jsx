export function dropHandler(e, setFile, setFileName) {
  e.preventDefault();
  [...e.dataTransfer.items].forEach((item) => {
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file) {
        setFile(URL.createObjectURL(file));
        setFileName(file.name);
      }
    }
  });
}

export function onFileChange(e, setFile, setFileName) {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    const fileUrl = URL.createObjectURL(selectedFile);
    setFile(fileUrl);
    setFileName(selectedFile.name);
  }
}

export function dragHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "blue";
  }
}

export function dragLeaveHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "grey";
  }
}
