import { execSync } from 'child_process';
import path from 'path';

describe('Integration tests for npm scripts', () => {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  
  const runScript = (script: string) => {
    const projectRoot = path.resolve(__dirname, '../../');  // Adjust this to your project root
    try {
      return execSync(`${npmCommand} run ${script}`, {
        cwd: projectRoot,
        stdio: 'pipe'
      }).toString();
    } catch (err: any) {
      throw new Error(err.stderr ? err.stderr.toString() : err.message);
    }
  };

  it('should run the build script successfully', () => {
    const output = runScript('build');
    expect(output).toContain('Compilation complete');
  });

  it('should run the dev script and start nodemon', () => {
    const output = runScript('dev');
    expect(output).toContain('watching path(s): src/**/*.ts');
  });

  it('should run the lint script and pass with no errors', () => {
    const output = runScript('lint');
    expect(output).toContain('Done');
  });

  it('should run the test script successfully', () => {
    const output = runScript('test');
    expect(output).toContain('Test Suites:');
  });

  it('should run the e2e script successfully', () => {
    const output = runScript('e2e');
    expect(output).toContain('All specs passed!');
  });

  it('should run the format script and apply prettier formatting', () => {
    const output = runScript('format');
    expect(output).toContain('Prettier has been applied');
  });

  // You can continue to add similar tests for other scripts in your package.json
});
