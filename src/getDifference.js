const simpleGit = require("simple-git");
const git = simpleGit();

async function getChanges() {
  const diff = await git.diffSummary(["--cached"]);
  return diff.files.map((file) => ({
    filePath: file.file,
    changes: file.changes,
  }));
}

module.exports = { getChanges };
