import React from "react";
import styles from "./information.module.scss";
import Custom_Tab from "@/components/common/Custom_Tab";
import { Expand } from "lucide-react";
import { formatString } from "@/utils/formatData";
import { Dialog } from "primereact/dialog";

type Props = {
  data: any;
  loading: boolean;
};

const Information: React.FC<Props> = ({ data, loading }) => {
  console.log("loading", loading);
  console.log("data$$$$$$", data);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const tabsModel = [
    {
      label: "Communication",
      value: "Communication",
      count: 4,
    },
    { label: "Attachments", value: "Attachments", count: 9 },
  ];

  const filteredData = { ...data };
  console.log("filteredData keys", Object.keys(filteredData));
  delete filteredData.issue_details;
  delete filteredData.alert_details;

  type CommonComponentProps = {
    items: any;
    type: boolean;
  };

  const CommonComponent: React.FC<CommonComponentProps> = ({ items, type }) => {
    return (
      <div className={styles.wrapper_left}>
        {type && (
          <span className={styles.heading}>
            {formatString(items)}

            <span>
              <Expand
                onClick={() => setVisible(true)}
                style={{ cursor: "pointer" }}
              />
              <Dialog
                header={formatString(items)}
                visible={visible}
                style={{ width: "50%" }}
                onHide={() => setVisible(false)}
              >
                <CommonComponent items={items} type={false} />
              </Dialog>
            </span>
          </span>
        )}

        {Object.keys(filteredData[items])?.map((key: string, index: number) => (
          <span className={styles.description_names} key={index}>
            <span style={{ width: "50%", color: "var(--gray-500)" }}>
              {formatString(key)}
            </span>
            <span className={styles.description_values}>
              {filteredData[items][key]}
            </span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.information_wrapper}>
        <div className={styles.information_leftSide_wrapper}>
          {!loading &&
            Object.keys(filteredData)?.map((items: string, idx: number) => (
              <CommonComponent items={items} key={idx} type={true} />
            ))}
        </div>

        <div className={styles.information_rightSide_wrapper}>
          <span className={styles.heading}>
            Information Request
            <span>
              <Expand style={{ cursor: "pointer" }} />
            </span>
          </span>
          <span>
            <Custom_Tab
              TabsModel={tabsModel}
              selectedTabIndex={tabIndex}
              setSelectedTabIndex={setTabIndex}
            />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Information;
