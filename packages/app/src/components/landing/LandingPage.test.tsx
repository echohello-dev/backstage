import { screen } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders the hero headline and value prop', async () => {
    await renderInTestApp(<LandingPage />);

    expect(
      screen.getByText('Everything your developers need, in one portal'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Software templates that publish to GitHub/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Try it as a guest, no account needed/),
    ).toBeInTheDocument();
  });

  it('links the primary call to action into the showcase', async () => {
    await renderInTestApp(<LandingPage />);

    const cta = screen.getByRole('link', { name: 'Explore the showcase' });
    expect(cta).toHaveAttribute('href', '/showcase');
  });

  it('links the secondary call to action into the catalog', async () => {
    await renderInTestApp(<LandingPage />);

    const cta = screen.getByRole('link', { name: 'Browse the catalog' });
    expect(cta).toHaveAttribute('href', '/catalog');
  });

  it('shows the portal screenshot with alt text', async () => {
    await renderInTestApp(<LandingPage />);

    expect(
      screen.getByAltText(
        'The plugin showcase in this portal, listing templates, GitHub integration and the answer engine',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('The plugin showcase running live in this portal.'),
    ).toBeInTheDocument();
  });
});
