import React, { PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import Home from '@mui/icons-material/Home';
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
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FortRoundedIcon from '@mui/icons-material/FortRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
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

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={Home as IconComponent} to="/" text="Home" />
        <SidebarItem
          icon={FortRoundedIcon as IconComponent}
          to="catalog"
          text="Catalog"
        />
        <SidebarItem
          icon={ExtensionRoundedIcon as IconComponent}
          to="api-docs"
          text="APIs"
        />
        <SidebarItem
          icon={MenuBookRoundedIcon as IconComponent}
          to="docs"
          text="Docs"
        />
        <SidebarItem
          icon={CreateComponent as IconComponent}
          to="create"
          text="Create..."
        />
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
