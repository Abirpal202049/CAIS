"use client";
import Custom_Table from "@/components/common/Custom_Table";
import styles from "./tabSlug.module.scss";
import { formatDate, formatPrice, formatString } from "@/utils/formatData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Expand } from "lucide-react";
import { Dialog } from "primereact/dialog";
import IssueDetails from "../_components/IssueDetails";

type Props = {
  params: {
    tabSlug: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <>
      {params.tabSlug === "alert_details" && <Alert_Details />}
      {params.tabSlug === "position" && <Position />}
      {params.tabSlug === "trades" && <Trades />}
      {params.tabSlug === "historical_trades" && <Trades />}
      {params.tabSlug === "prior_alerts" && <Alert_Details />}
      {params.tabSlug === "financial_advisor" && <Financial_Advisors />}
      {params.tabSlug === "other_alerts" && <div>Other Alerts</div>}
    </>
  );
}

function Alert_Details() {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);

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

  const alertDetails = "alert_details" in data ? data.alert_details : {};

  return (
    <>
      {!loading && (
        // alert_and_issue_details_wrapper
        <div className={styles.alert_and_issue_details_wrapper}>
          {/* Alert details  */}
          <div className={styles.alert_details}>
            <span className={styles.heading}>Alert Details</span>

            <span className={styles.alert_Details_description}>
              {alertDetails &&
                Object.keys(alertDetails).length &&
                Object.keys(alertDetails).map((ele, index) => (
                  <span key={index} className={styles.alert_Details_data}>
                    <span style={{ width: "60%", color: "var(--gray-500)" }}>
                      {formatString(ele)}
                    </span>
                    <span>{data.alert_details[ele]}</span>
                  </span>
                ))}
            </span>
          </div>

          {/* Issue details */}
          <div className={styles.issue_details}>
            <span className={styles.heading}>
              Issue Details
              <span>
                <Expand
                  onClick={() => setVisible(true)}
                  style={{ cursor: "pointer" }}
                />
                <Dialog
                  header="Issue Details"
                  visible={visible}
                  draggable={false}
                  onHide={() => setVisible(false)}
                >
                  <IssueDetails />
                </Dialog>
              </span>
            </span>
            <IssueDetails />
          </div>
        </div>
      )}
    </>
  );
}

function Position() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/6f33ea27b8ac14ac49aa");

      setData(res.data);
    })();
  }, []);

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      case "SYMBOL":
        return <div className={`${styles.blue}`}>{data[field]}</div>;
      case "BASE_CURR_PRICE":
      case "BASE_CURR_VALUE":
        return (
          <div className={`${styles.green}`}>{formatPrice(data[field])}</div>
        );
      default:
        return <div>{data[field]}</div>;
    }
  };
  return (
    <Custom_Table
      tableType="alerts"
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Trades() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/65c1706f2f4be7cbc4f8");

      setData(res.data);
    })();
  }, []);

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      case "ORIG_CURR_CD":
      case "BASE_CURR_CD":
        return (
          <div className={`${styles.backgroundRed} ${styles.rounded}`}>
            {data[field]}
          </div>
        );
      case "EXECUTION_LOCAL_DATE_TIME":
        return <div>{data[field].split(" ")[0]}</div>;
      case "DIRECTION_CD":
        return (
          <div
            className={`${
              data[field] === "B" ? "text-success" : "text-red-800"
            }`}
          >
            {data[field]}
          </div>
          // <div className={`${data[field] === "B" ? styles.green : styles.red}`}>
          //   {data[field]}
          // </div>
        );
      case "BASE_CURR_AMOUNT":
      case "ORIG_CURR_AMOUNT":
      case "BASE_CURR_NET_AMOUNT":
      case "BASE_CURR_TRADE_PRICE":
        return (
          <div className={`${styles.green}`}>{formatPrice(data[field])}</div>
        );
      case "EXECUTION_LOCAL_DATE_TIME":
        return <div>{formatDate(data[field])}</div>;
      default:
        return <div>{data[field]}</div>;
    }
  };
  return (
    <Custom_Table
      tableType="alerts"
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Historical_Trades() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/65c1706f2f4be7cbc4f8");

      setData(res.data);
    })();
  }, []);

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      case "create_date":
        return <div>{formatDate(data.create_date)}</div>;
      default:
        return <div>{data[field]}</div>;
    }
  };
  return (
    <Custom_Table
      tableType="alerts"
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Financial_Advisors() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/e31ba500e557b4487e48");

      setData(res.data.financial_advisors);
    })();
  }, []);

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      case "id":
        return <div className={`${styles.primary}`}>{data[field]}</div>;
      default:
        return <div>{data[field]}</div>;
    }
  };
  return (
    <Custom_Table
      tableType="alerts"
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}
