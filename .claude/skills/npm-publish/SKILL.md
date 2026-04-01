---
name: npm-publish
description: Build, bump version, and publish the discord.js-temporary-channel package to npm
disable-model-invocation: true
---

# npm-publish

Publish a new version of the package to npm.

## Steps

1. **Pre-flight checks**
   - Ensure the working directory is clean (`git status`)
   - Ensure all TypeScript compiles without errors (`npx tsc --noEmit`)

2. **Version bump**
   - Ask the user which semver bump to apply: patch, minor, or major
   - Run `npm version <bump>` to update package.json and create a git tag

3. **Build**
   - Run `npm run build` to compile TypeScript to JavaScript
   - Verify that `index.js` and `index.d.ts` are generated

4. **Publish**
   - Run `npm publish` to publish to the npm registry
   - Confirm success by checking the output

5. **Post-publish**
   - Push the version commit and tag to the remote: `git push && git push --tags`
   - Report the published version to the user
