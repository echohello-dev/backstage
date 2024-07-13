export interface Config {
  plausible?: {
    /**
     * @visibility frontend
     */
    enabled: boolean;

    /**
     * @visibility frontend
     */
    dataDomain: string;

    /**
     * @visibility frontend
     */
    soureDomain: string;
  };
}
