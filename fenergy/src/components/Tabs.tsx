import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import type { JSX } from "react";

export interface TabItem {
  value: string; // es. "1", "2", "3" o "settimana-1"
  label: string; // testo della tab
  content?: React.ReactNode | JSX.Element; // cosa renderizzare nel pannello
}

interface TabsProps {
  tabs: TabItem[];
  value?: string; // per uso "controlled"
  defaultValue?: string; // per uso "uncontrolled"
  onChange?: (value: string) => void;
}

export default React.memo(function Tabs({
  tabs,
  value,
  defaultValue,
  onChange,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? (tabs[0]?.value || "1")
  );

  const currentValue = value ?? internalValue;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (!value) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={currentValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="scrollable" // 🔥 abilita lo scroll
            scrollButtons="auto" // mostra le frecce quando servono
            allowScrollButtonsMobile // (opzionale) frecce anche su mobile
          >
            {tabs.map((tab, index) => (
              <Tab key={index} value={tab.value} label={tab.label} />
            ))}
          </TabList>
        </Box>

        {tabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
});
