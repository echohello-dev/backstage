import { Content, Header, InfoCard, Page } from '@backstage/core-components';
import { PrimerDemo } from './PrimerDemo';

export function PrimerDemoPage() {
  return (
    <Page themeId="home">
      <Header
        title="Primer Demo"
        subtitle="Isolated proof-of-integration for @primer/react"
      />
      <Content>
        <InfoCard title="Primer components (scoped)">
          <PrimerDemo />
        </InfoCard>
      </Content>
    </Page>
  );
}
