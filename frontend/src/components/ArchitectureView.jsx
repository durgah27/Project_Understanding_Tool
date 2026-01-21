function ArchitectureView() {
  return (
    <>
      <h3>System Architecture</h3>

      <p><b>Frontend Flow:</b><br/>
        User → React UI → API Requests
      </p>

      <p><b>Backend Flow:</b><br/>
        Routes → Controllers → Services → Database
      </p>

      <p><b>Database Role:</b><br/>
        Stores project data, analysis results, and documentation.
      </p>

      <p><b>Data Flow:</b><br/>
        UI → Server → DB → Server → UI
      </p>
    </>
  );
}

export default ArchitectureView;
