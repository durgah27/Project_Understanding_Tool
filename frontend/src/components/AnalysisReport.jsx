function AnalysisReport() {
  return (
    <>
      <h3>Code Analysis Report</h3>

      <p><b>Security:</b></p>
      <ul>
        <li>Passwords not encrypted</li>
        <li>No role-based authorization</li>
      </ul>

      <p><b>Performance:</b></p>
      <ul>
        <li>No caching used</li>
        <li>Large components detected</li>
      </ul>

      <p><b>Best Practices:</b></p>
      <ul>
        <li>Missing global error handler</li>
        <li>Controllers too tightly coupled</li>
      </ul>
    </>
  );
}

export default AnalysisReport;
