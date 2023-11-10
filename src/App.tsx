import Box from '@mui/material/Box';
import Tab, { TabProps } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

import Chapter02 from './components/chapters/chapter02';
import Chapter03 from './components/chapters/chapter03';
import Chapter04 from './components/chapters/chapter04';
import Chapter05 from './components/chapters/chapter05';
import Chapter06 from './components/chapters/chapter06';
import Chapter07 from './components/chapters/chapter07';

type ChapterPanelProps = {
  children: React.ReactNode;
  index: number;
  selectedIndex: number;
  chapter: number;
};

function ChapterPanel(props: ChapterPanelProps) {
  const { children, index, selectedIndex, chapter, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedIndex !== index}
      id={`chapter${chapter}-tabpanel`}
      aria-labelledby={`chapter${chapter}-tab`}
      {...other}
    >
      {selectedIndex === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function getTabProps(chapter: number): TabProps {
  return {
    label: `Chapter ${chapter}`,
    key: `chapter${chapter}`,
    id: `chapter${chapter}-tab`,
    'aria-controls': `chapter${chapter}-tabpanel`,
  };
}

function getChapterPanelProps(
  selectedIndex: number,
  index: number,
  chapter: number
): Omit<ChapterPanelProps, 'children'> & { key: string } {
  return {
    selectedIndex,
    index,
    chapter,
    key: `chapter${chapter}-panel`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const chapters = [
    <Chapter07 />,
    <Chapter06 />,
    <Chapter05 />,
    <Chapter04 />,
    <Chapter03 />,
    <Chapter02 />,
  ];
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(_, value) => setValue(value)} aria-label="Chapter tabs">
          {chapters.map((_chapter, i) => {
            const chapterNumber = chapters.length + 1 - i;
            return <Tab {...getTabProps(chapterNumber)} />;
          })}
        </Tabs>
      </Box>
      {chapters.map((chapter, i) => {
        const chapterNumber = chapters.length + 1 - i;
        return (
          <ChapterPanel {...getChapterPanelProps(value, i, chapterNumber)}>{chapter}</ChapterPanel>
        );
      })}
    </Box>
  );
}
