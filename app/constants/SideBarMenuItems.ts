import routes from './routes.json';

export type SideBarMenuItem = {
  index: number;
  content: string;
  link: string;
  childrenMenuItems?: SideBarMenuItem[];
};

export const SideBarMenuItemList: SideBarMenuItem[] = [
  {
    index: 1,
    content: 'Lectures',
    link: routes.LECTURE,
  },
  {
    index: 2,
    content: 'Subjects',
    link: routes.SUBJECT,
  },
  {
    index: 3,
    content: 'Buildings',
    link: routes.BUILDINGS,
  },
  {
    index: 4,
    content: 'Working days',
    link: routes.WORKING_DAYS,
  },
  {
    index: 5,
    content: 'Students',
    link: routes.STUDENT_BATCHES,
  },
  {
    index: 6,
    content: 'Statistics',
    link: routes.STATISTICS,
    childrenMenuItems: [
      {
        index: 7,
        content: 'Lecture statistics',
        link: routes.STATISTICS_LECTURE,
      },
      {
        index: 8,
        content: 'Subject statistics',
        link: routes.STATISTICS_SUBJECT,
      },
      {
        index: 9,
        content: 'Student statistics',
        link: routes.STATISTICS_STUDENT,
      },
    ],
  },
  {
    index: 10,
    content: 'Tags',
    link: routes.TAGS,
  },
];
