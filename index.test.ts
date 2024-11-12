import * as ts from 'typescript';
import { expect, test, describe } from 'bun:test';
import * as path from 'path';

describe(`TypeScript Configuration`, () => {
  const validateConfigs = (configFilename: string) =>
    test(`"${configFilename}" tsconfig should be resolvable`, async () => {
      const configFilePath = path.resolve(__dirname, `configs`, configFilename);

      if (!configFilePath) {
        throw new Error(`Config file not found`);
      }

      const parseConfig = async () =>
        ts.readConfigFile(configFilePath, ts.sys.readFile);

      expect(parseConfig).not.toThrow();

      const { config, error } = await parseConfig();

      expect(config).not.toBeNull();
      expect(config).not.toBeUndefined();
      expect(error).toBeUndefined();
    });

  [`base.json`, `next.json`].forEach(validateConfigs);
});
