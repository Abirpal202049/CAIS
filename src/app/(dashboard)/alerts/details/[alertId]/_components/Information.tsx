import React from "react";
import styles from "./information.module.scss";
import Custom_Tab from "@/components/common/Custom_Tab";
import { ExternalLink } from "lucide-react";

type Props = {
  data: any;
  loading: boolean;
};

const Information: React.FC<Props> = ({ data, loading }) => {
  console.log("loading", loading);
  console.log("data$$$$$$", data);
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabsModel = [
    {
      label: "Communication",
      value: "Communication",
      count: 4,
    },
    { label: "Attachments", value: "Attachments", count: 9 },
  ];

  const filteredData = { ...data };
  delete filteredData.issue_details;

  function formatString(inputString: string) {
    const cleanedString = inputString.replace(/[:"_]/g, "");
    const formattedString = cleanedString.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );

    return formattedString.trim();
  }

  return (
    <div className={styles.information_wrapper}>
      <div className={styles.information_leftSide_wrapper}>
        {!loading &&
          Object.keys(filteredData)?.map((items: string, idx: number) => (
            <div className={styles.wrapper_left} key={idx}>
              <span className={styles.account}>
                {formatString(items)
                  .split(" ")
                  .map((word, wordIdx) => (
                    <span key={wordIdx}>{word} </span>
                  ))}
                <span>
                  <ExternalLink />
                </span>
              </span>

              {Object.keys(filteredData[items])?.map(
                (key: string, index: number) => (
                  <span className={styles.countries_and_names} key={index}>
                    <span className={styles.countries}>
                      {formatString(key)
                        .split(" ")
                        .map((word, wordIdx) => (
                          <span key={wordIdx}>{word}</span>
                        ))}
                    </span>
                    <span className={styles.countries_name}>
                      {JSON.stringify(filteredData[items][key])}
                    </span>
                  </span>
                )
              )}
            </div>
          ))}
      </div>

      <div className={styles.information_rightSide_wrapper}>
        <span className={styles.information_request}>
          <span>Information Request</span>
          <span>
            <ExternalLink />
          </span>
        </span>
        <span style={{ height: "auto" }}>
          <Custom_Tab
            TabsModel={tabsModel}
            selectedTabIndex={tabIndex}
            setSelectedTabIndex={setTabIndex}
          />
        </span>
        <span></span>
      </div>
    </div>
  );
};

export default Information;
