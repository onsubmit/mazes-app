import Box from '@mui/material/Box';
import Tab, { TabProps } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { lazy, Suspense, useState } from 'react';

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
  const [value, setValue] = useState(0);

  const ChapterComponents = [
    lazy(() => import('./components/chapters/chapter08')),
    lazy(() => import('./components/chapters/chapter07')),
    lazy(() => import('./components/chapters/chapter06')),
    lazy(() => import('./components/chapters/chapter05')),
    lazy(() => import('./components/chapters/chapter04')),
    lazy(() => import('./components/chapters/chapter03')),
    lazy(() => import('./components/chapters/chapter02')),
  ];
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(_, value) => setValue(value)} aria-label="Chapter tabs">
          {ChapterComponents.map((_chapter, i) => {
            const chapterNumber = ChapterComponents.length + 1 - i;
            return <Tab {...getTabProps(chapterNumber)} />;
          })}
        </Tabs>
      </Box>
      {ChapterComponents.map((Chapter, i) => {
        const chapterNumber = ChapterComponents.length + 1 - i;
        return (
          <ChapterPanel {...getChapterPanelProps(value, i, chapterNumber)}>
            <Suspense>
              <Chapter />
            </Suspense>
          </ChapterPanel>
        );
      })}
    </Box>
  );
}
