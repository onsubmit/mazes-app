import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

import Chapter02 from './components/chapters/chapter02';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`chapter-tabpanel-${index}`}
      aria-labelledby={`chapter-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `chapter-tab-${index}`,
    'aria-controls': `chapter-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const chapters = [<Chapter02 />];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Chapter tabs">
          {chapters.map((_chapter, i) => (
            <Tab label={`Chapter ${i + 2}`} key={`chpt${i}`} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {chapters.map((chapter, i) => (
        <CustomTabPanel value={value} index={i} key={`chpt-panel${i}`}>
          {chapter}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
