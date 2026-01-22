import { uploadFiles } from "../services/api";

function UploadSection({ onFilesSelected, onAnalyze, files }) {
  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    onFilesSelected(selected);
  };

  const handleUpload = async () => {
    try {
      const res = await uploadFiles(files);
      alert(`✅ Uploaded & Indexed! Total chunks: ${res.total_chunks}`);
      onAnalyze();
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed. Check backend running on 5000.");
    }
  };

  return (
    <>
      <h3>Upload Project</h3>

      <input type="file" multiple onChange={handleChange} />

      {files.length > 0 && (
        <p style={{ marginTop: "10px" }}>{files.length} files selected</p>
      )}

      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload & Analyze
      </button>
    </>
  );
}

export default UploadSection;
