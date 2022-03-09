import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DnsIcon from '@mui/icons-material/Dns';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const SidebarStructure = [
  { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon />,
    children: [
      {
          label: 'Active Cells',
          link: '/app/dashboard/activeCells',
      },
      {
          label: 'Change Log',
          link: '/app/dashboard/changeLog',
      },
    ],
  },
  { id: 1, label: 'Project', link: '/app/project', icon: <DnsIcon /> },
  { id: 2, label: 'License / Compute', link: '/app/license', icon: <FeedIcon /> },
  { id: 3, label: 'Design Management System', link: '/app/design', icon: <WorkIcon /> },
  { id: 4, label: 'Wiki', link: '/app/wiki', icon: <EqualizerIcon /> },
]

export default SidebarStructure
