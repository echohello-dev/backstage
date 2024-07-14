export interface Config {
  plausible?: {
    /**
     * Whether Plausible Analytics is enabled.
     *
     * @visibility frontend
     */
    enabled: boolean;

    /**
     * Plausible data domain to track.
     *
     * @visibility frontend
     * @example example.com
     */
    dataDomain: string;

    /**
     * Plausible source URL to load the script from.
     *
     * @visibility frontend
     * @example https://plausible.example.com/js/script.js
     */
    sourceUrl: string;
  };
}
