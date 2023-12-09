import HistoryIcon from '@/assets/icons/history';
import CommunityIcon from '@/assets/icons/community';
import SettingsIcon from '@/assets/icons/settings';
import ActiveChat from '@/assets/icons/activeChat';

export interface LinkItemProps {
  label: string;
  path: string;
  icon?: React.FC;
  activeIcon?: React.FC;
}

const LinkItems: LinkItemProps[] = [
  {
    label: 'Chatbot',
    path: '/',
    // icon: ActiveHome,
    activeIcon: ActiveChat
  },
  {
    label: 'Chat history',
    path: '/history',
    icon: HistoryIcon
  },
  {
    label: 'Community',
    path: '/community',
    icon: CommunityIcon
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsIcon
  }
];

export default LinkItems;
