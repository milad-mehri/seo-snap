const simpleGit = require("simple-git");
const git = simpleGit();

async function getChanges() {
  try {
    const diff = await git.diff(["--color"]);

    const diffSummary = await git.diffSummary();

    const changes = diffSummary.files.map((file) => ({
      filePath: file.file,
      changes: file.changes,
      insertions: file.insertions,
      deletions: file.deletions,
    }));

    return { diff, changes };
  } catch (error) {
    console.error("Error getting changes:", error);
    return { diff: "", changes: [] };
  }
}

module.exports = { getChanges };
