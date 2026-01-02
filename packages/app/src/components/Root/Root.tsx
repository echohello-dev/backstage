import { PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import { NotificationsSidebarItem } from '@backstage/plugin-notifications';
import {
  HomeIcon,
  SearchIcon,
  ThreeBarsIcon,
  RepoIcon,
  PlugIcon,
  BookIcon,
  RocketIcon,
  ChecklistIcon,
  PulseIcon,
  TelescopeIcon,
} from '@primer/octicons-react';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarSpace,
  useSidebarOpenState,
  Link,
  SidebarExpandButton,
} from '@backstage/core-components';
import { IconComponent } from '@backstage/core-plugin-api';

export enum LocalStorageKeys {
  // eslint-disable-next-line no-unused-vars
  SIDEBAR_PIN_STATE = 'sidebarPinState',
}

const SidebarLogoRoot = styled('div')(() => ({
  width: sidebarConfig.drawerWidthClosed,
  height: 3 * sidebarConfig.logoHeight,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  marginBottom: -14,
}));

const SidebarLogoLink = styled(Link)(() => ({
  width: sidebarConfig.drawerWidthClosed,
  paddingLeft: '24px',
}));

const SidebarLogo = () => {
  const { isOpen } = useSidebarOpenState();

  return (
    <SidebarLogoRoot>
      <SidebarLogoLink to="/" underline="none" aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </SidebarLogoLink>
    </SidebarLogoRoot>
  );
};

const HomeOcticon: IconComponent = () => <HomeIcon size={20} />;
const RepoOcticon: IconComponent = () => <RepoIcon size={20} />;
const PlugOcticon: IconComponent = () => <PlugIcon size={20} />;
const BookOcticon: IconComponent = () => <BookIcon size={20} />;
const RocketOcticon: IconComponent = () => <RocketIcon size={20} />;
const ChecklistOcticon: IconComponent = () => <ChecklistIcon size={20} />;
const PulseOcticon: IconComponent = () => <PulseIcon size={20} />;
const TelescopeOcticon: IconComponent = () => <TelescopeIcon size={20} />;

export const Root = ({ children }: PropsWithChildren<{}>) => {
  if (
    window.localStorage.getItem(LocalStorageKeys.SIDEBAR_PIN_STATE) === null
  ) {
    window.localStorage.setItem(
      LocalStorageKeys.SIDEBAR_PIN_STATE,
      JSON.stringify(false),
    );
  }

  return (
    <SidebarPage>
      <Sidebar disableExpandOnHover={false}>
        <SidebarLogo />
        <SidebarGroup
          label="Search"
          icon={<SearchIcon size={16} />}
          to="/search"
        >
          <SidebarSearchModal />
        </SidebarGroup>
        <SidebarDivider />
        <SidebarGroup label="Menu" icon={<ThreeBarsIcon size={16} />}>
          {/* Global nav, not org-specific */}
          <SidebarItem icon={HomeOcticon} to="/" text="Home" />
          <SidebarItem icon={RepoOcticon} to="catalog" text="Catalog" />
          <SidebarItem icon={PlugOcticon} to="api-docs" text="APIs" />
          <SidebarItem icon={BookOcticon} to="docs" text="Docs" />
          <SidebarItem
            icon={RocketOcticon}
            to="self-service"
            text="Self-Service"
          />
        </SidebarGroup>
        <SidebarDivider />
        <NotificationsSidebarItem />
        <SidebarDivider />
        <SidebarItem icon={ChecklistOcticon} to="scorecard" text="Scorecard" />
        <SidebarItem icon={PulseOcticon} to="pulse-check" text="Pulse Check" />
        <SidebarItem icon={TelescopeOcticon} to="explore" text="Explore" />
        <SidebarSpace />
        <SidebarDivider />
        <SidebarGroup
          label="Settings"
          icon={<UserSettingsSignInAvatar />}
          to="/settings"
        >
          <SidebarSettings />
        </SidebarGroup>
        <SidebarExpandButton />
      </Sidebar>
      {children}
    </SidebarPage>
  );
};
