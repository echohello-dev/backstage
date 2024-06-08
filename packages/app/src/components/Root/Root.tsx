import React, { PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import Home from '@mui/icons-material/Home';
import Extension from '@mui/icons-material/Extension';
import Map from '@mui/icons-material/MyLocation';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import CreateComponent from '@mui/icons-material/AddCircleOutline';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { IconComponent } from '@backstage/core-plugin-api';

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
  marginLeft: 24,
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

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<Search />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<Menu />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={Home as IconComponent} to="catalog" text="Home" />
        <SidebarItem
          icon={Extension as IconComponent}
          to="api-docs"
          text="APIs"
        />
        <SidebarItem
          icon={LibraryBooks as IconComponent}
          to="docs"
          text="Docs"
        />
        <SidebarItem
          icon={CreateComponent as IconComponent}
          to="create"
          text="Create..."
        />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem
            icon={Map as IconComponent}
            to="tech-radar"
            text="Tech Radar"
          />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarSettings />
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);
