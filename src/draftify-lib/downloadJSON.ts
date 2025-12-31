import { DraftifyDocument } from "../draftify-core/schema/draftify.schema";

export const handleDownloadJSON = (doc: DraftifyDocument): void => {
  const dataStr = JSON.stringify(doc, null, 2); // Convert blocksData to pretty JSON

  // Create a timestamp for uniqueness
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} [${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}]`;

  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.metadata?.docTitle || `draftify-${timestamp}`}.json`; // Unique file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
