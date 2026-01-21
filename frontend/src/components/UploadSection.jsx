function UploadSection({ onFilesSelected, onAnalyze, files }) {

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    onFilesSelected(selected);
  };

  return (
    <>
      <h3>Upload Project</h3>

      <input type="file" multiple onChange={handleChange} />

      {files.length > 0 && (
        <p style={{ marginTop: "10px" }}>
          {files.length} files selected
        </p>
      )}

      <button
        onClick={onAnalyze}
        disabled={files.length === 0}
        style={{ opacity: files.length === 0 ? 0.5 : 1 }}
      >
        Upload & Analyze
      </button>
    </>
  );
}

export default UploadSection;
