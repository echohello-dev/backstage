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

  it('renders the four feature highlights', async () => {
    await renderInTestApp(<LandingPage />);

    expect(screen.getByText('What you can try')).toBeInTheDocument();
    expect(screen.getByText('Software templates')).toBeInTheDocument();
    expect(screen.getByText('Software catalog')).toBeInTheDocument();
    expect(screen.getByText('GitHub integration')).toBeInTheDocument();
    expect(screen.getByText('Answer engine')).toBeInTheDocument();
    expect(
      screen.getByText(/Search the catalog and TechDocs in one place/),
    ).toBeInTheDocument();
  });

  it('links each highlight to its live surface', async () => {
    await renderInTestApp(<LandingPage />);

    expect(
      screen.getByRole('link', { name: 'Use a template' }),
    ).toHaveAttribute('href', '/self-service');
    expect(
      screen.getByRole('link', { name: 'Browse services' }),
    ).toHaveAttribute('href', '/catalog');
    expect(
      screen.getByRole('link', { name: 'See GitHub integration' }),
    ).toHaveAttribute('href', '/showcase');
    expect(
      screen.getByRole('link', { name: 'Search catalog and docs' }),
    ).toHaveAttribute('href', '/search');
  });

  it('renders the footer with a second path into the demo', async () => {
    await renderInTestApp(<LandingPage />);

    expect(screen.getByText('Ready to look around?')).toBeInTheDocument();
    expect(
      screen.getByText(/The demo runs as a guest with read-only access/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Start with the showcase' }),
    ).toHaveAttribute('href', '/showcase');
    expect(
      screen.getByRole('link', { name: 'Open the catalog' }),
    ).toHaveAttribute('href', '/catalog');
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
