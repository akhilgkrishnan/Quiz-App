import React, { useState } from "react";

import Container from "components/Container";
import Button from "components/Button";

const DownloadReport = () => {
  const [delay, setDelay] = useState(false);

  setTimeout(() => {
    setDelay(true);
  }, 10 * 1000);

  return (
    <Container>
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-bold text-gray-600">Reports</h1>
      </div>
      <div className="flex flex-row items-center justify-center mt-40">
        <h1 className="text-lg leading-5 flex flex-col items-center justify-center">
          {delay ? (
            <>
              <p>Report is now ready for download</p>
              <form className="mt-4" action="/report/generate_report.csv">
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
