import React, { useState } from "react";
import { LanguageContext } from "contexts";
import { dictionaryList } from "languages";

export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState("en");
  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    setUserLanguage,
  };
  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}
