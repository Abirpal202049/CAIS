import React from "react";
import styles from "./information.module.scss";
import Custom_Tab from "@/components/common/Custom_Tab";
import { Expand } from "lucide-react";
import { formatString } from "@/utils/formatData";
import { Dialog } from "primereact/dialog";
import Attachment_FileTable from "./Attachment_FileTable";
import Communication from "./Communication";

type Props = {
  data: any;
  loading: boolean;
};

const Information: React.FC<Props> = ({ data, loading }) => {
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
  console.log("filteredData keys", Object.keys(filteredData));
  delete filteredData.issue_details;
  delete filteredData.alert_details;

  type CommonComponentProps = {
    items: any;
    type: boolean;
  };

  const CommonComponent: React.FC<CommonComponentProps> = ({ items, type }) => {
    const [visible, setVisible] = React.useState(false);

    return (
      //Inside left side wrapper
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
                draggable={false}
                style={{ width: "30%" }}
                onHide={() => setVisible(false)}
              >
                <CommonComponent items={items} type={false} />
              </Dialog>
            </span>
          </span>
        )}

        {/* description of the left side of alert details */}
        {Object.keys(filteredData[items])?.map((key: string, index: number) => (
          <span className={styles.description} key={index}>
            <span className={styles.description_names}>
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
      {/* Alert details left side wrapper */}
      <div className={styles.information_leftSide_wrapper}>
        {!loading &&
          Object.keys(filteredData)?.map((items: string, idx: number) => (
            <CommonComponent items={items} key={idx} type={true} />
          ))}
      </div>

      {/* Alert details right side wrapper */}
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

        <span>{tabIndex === 1 && <Attachment_FileTable />}</span>
        <span>{tabIndex === 0 && <Communication />}</span>
      </div>
    </div>
  );
};

export default Information;
