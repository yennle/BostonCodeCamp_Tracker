import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Session',
    path: '/session',
    icon: <AiIcons.AiFillAppstore />,
    cName: 'nav-text pl-4'
  },
  {
    title: 'Time Slot',
    path: '/timeslot',
    icon: <AiIcons.AiOutlineFieldTime />,
    cName: 'nav-text pl-4'
  },
  {
    title: 'Speaker',
    path: '/speaker',
    icon: <FaIcons.FaStreetView />,
    cName: 'nav-text pl-4'
  },
  {
    title: 'Room',
    path: '/room',
    icon: <FaIcons.FaTable />,
    cName: 'nav-text pl-4'
  },
 
];
