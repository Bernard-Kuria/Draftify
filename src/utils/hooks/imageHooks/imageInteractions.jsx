export function dropHandler(e, setFiles) {
  e.preventDefault();
  [...e.dataTransfer.items].forEach((item) => {
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file) {
        setFiles(URL.createObjectURL(file));
      }
    }
  });
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
