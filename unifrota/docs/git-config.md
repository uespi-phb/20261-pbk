# Git configuration notes

This document contains supplementary Git configuration guidance for users of this template.

```bash
# General settings
git config --global init.defaultBranch main
git config --global fetch.prune true
git config --global pull.rebase false

# Husky settings
git config core.hooksPath .husky

## Identity settings
git config --global user.name "John Doe"
git config --global user.email "john.doe@gmail.com"

## Editor settings
git config --global core.editor "code --wait"

## Push settings
git config --global push.followTags true
git config --global push.default current

## Alias settings
git config --global alias.c '!git add --all && git commit -m'
git config --global alias.s '!git status -s'
git config --global alias.l "!git log --pretty=format:'%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'"
git config --global alias.t "!sh -c 'git tag -a \$1 -m \$1' -"
git config --global alias.amend '!git add --all && git commit --amend --no-edit'
git config --global alias.undo '!git reset HEAD~'
```

## Notes

- `user.name` and `user.email` define the Git author identity used in commits
- `core.editor` defines the default editor used by Git
- `push.followTags true` pushes annotated tags that are reachable from the pushed commits
- `push.default current` pushes the current branch to a branch of the same name on the remote
- The aliases are convenience shortcuts and reflect a personal workflow style
- `init.defaultBranch main` defines `main` as the default branch name for new repositories
- `fetch.prune true` removes stale remote-tracking references during fetch operations
- `pull.rebase false` keeps the default merge-based pull behavior

Do not try to replicate repository-internal keys such as `repositoryformatversion`, `bare`, `filemode`, or `logallrefupdates` as global user settings.
