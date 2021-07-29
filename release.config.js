const branch = process.env.CI_COMMIT_BRANCH

const config = {
  branches: ["+([0-9])?(.{+([0-9]),x}).x",'production', {name:"staging", prerelease:"rc"},{name:"main", prerelease: "beta"}],
  plugins: ['@semantic-release/commit-analyzer', '@semantic-release/release-notes-generator'],
  repositoryUrl: "git@github.com:Atamos/test-release.git"
}

if (config.branches.some(it => it === branch || (it.name === branch && !it.prerelease))) {
  config.plugins.push('@semantic-release/changelog', [
    '@semantic-release/git',
    {
      assets: ['CHANGELOG.md'],
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
    },
  ]);
}
module.exports = config;

