import React from "react";
import { useLanguage } from "../languageProvider";

const UserHistory = ({ history }) => {
  const { t } = useLanguage();

  return (
    <div>
      <h2>{t("ui.section1.title")}</h2>
      <p>{t("ui.section1.text")}</p>

      <h3>{t("ui.historyTitle")}</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.date} - {t(item.actionKey)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHistory;
