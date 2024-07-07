export interface Config {
  plausible?: {
    /**
     * @visibility frontend
     */
    enabled: boolean;

    /**
     * @visibility frontend
     */
    domain: string;
  };
}
