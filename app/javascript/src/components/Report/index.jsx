import React, { useState, useEffect } from "react";

import Container from "components/Container";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import reportApi from "apis/report";
import Table from "components/Report/Table";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const response = await reportApi.list();
      setReports(response.data.reports);
      logger.info(response.data.reports);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }
  return (
    <Container>
      <div className="flex flex-col mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-600">Reports</h1>
          <div>
            <Button
              type="link"
              buttonText="Download"
              iconClass="ri-download-2-line"
              path="/reports/download"
            />
          </div>
        </div>
      </div>
      <Table reports={reports} />
    </Container>
  );
};

export default Report;
