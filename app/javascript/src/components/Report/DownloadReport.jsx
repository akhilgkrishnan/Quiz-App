import React, { useState, useEffect } from "react";

import Container from "components/Container";
import Button from "components/Button";
import reportApi from "apis/report";

const DownloadReport = () => {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportPath, setReportPath] = useState("");

  const fetchQuizDetails = async () => {
    try {
      const response = await reportApi.generate();
      setReportPath(response.data.report_path);
    } catch (error) {
      logger.error(error);
    } finally {
      setReportGenerated(true);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-bold text-gray-600">Reports</h1>
      </div>
      <div className="flex flex-row items-center justify-center mt-40">
        <h1 className="text-lg leading-5 flex flex-col items-center justify-center">
          {reportGenerated ? (
            <>
              <p>Report is now ready for download</p>
              <form className="mt-4" action={reportPath}>
                <Button type="submit" buttonText="Download Report" />
              </form>
            </>
          ) : (
            <div className="flex items-center">
              <div className="w-10 h-10 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
              <div className="items-center px-2">
                Your report is being prepared for downloading
              </div>
            </div>
          )}
        </h1>
      </div>
    </Container>
  );
};

export default DownloadReport;
