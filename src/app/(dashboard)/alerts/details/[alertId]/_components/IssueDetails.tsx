import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import styles from "./information.module.scss";
import { Dialog } from "primereact/dialog";
import { Expand } from "lucide-react";

const IssueDetails = () => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.npoint.io/c748243694692e1247ef"
        );
        console.log("response data", res.data);

        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const issueDetails = data?.issue_details ?? [];

  return (
    <>
      {!loading && (
        <span>
          <span className={styles.issue_details_wrapper_heading}>
            <span className={styles.issue_details_data_heading}>
              <span>Issue Type</span>
            </span>

            <span className={styles.issue_details_data_heading}>
              <span>Description</span>
            </span>

            <span className={styles.issue_details_data_heading}>
              <span>Total Score</span>
            </span>
          </span>

          <span>
            {issueDetails.map((issue: any, index: any) => (
              <span key={index}>
                <span className={styles.issue_details_wrapper}>
                  <span className={styles.issue_details_data}>
                    <span>{issue?.issue_type}</span>
                  </span>

                  <span className={styles.issue_details_data}>
                    <span>{issue?.description}</span>
                  </span>

                  <span className={styles.issue_details_data}>
                    <span>{issue?.score}</span>
                  </span>
                </span>

                <span className={styles.issue_details_table}>
                  <DataTable value={issue.scenarios} showGridlines>
                    <Column field="scenario" header="Scenario"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="actual_value" header="Actual Value"></Column>
                    <Column field="threshold" header="Threshold"></Column>
                    <Column field="score" header="Score"></Column>
                  </DataTable>
                </span>
              </span>
            ))}
          </span>
        </span>
      )}
    </>
  );
};

export default IssueDetails;
