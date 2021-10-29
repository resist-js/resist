# In Your Language

<p align="center">
  <a href="https://github.com/~REPO~/blob/master/docs/en-US/STRUCTURE.md"
    >English</a>
</p>

# Structure

The purpose of this is to describe the overall structure of `resistjs`, with easy to understand descriptions of the purpose of each file within the structure.

## base

The top-level of the mono-repository.

[What is a mono-repository?](https://en.wikipedia.org/wiki/Monorepo)

- [.all-contributorsrc](https://github.com/~REPO~/blob/master/.all-contributorsrc)
  [What is this?](https://github.com/all-contributors/all-contributors)

> This is a specification for recognizing contributors to an open source project in a way that rewards each and every contribution, not just code.

- [.czrc](https://github.com/~REPO~/blob/master/.czrc)
  [What is this?](https://github.com/commitizen/cz-cli)

> Get instant feedback on your commit message formatting and be prompted for required fields. This file will be referenced for example when making any Push/commit to any branch of the mono-repo.

- [.editorconfig](https://github.com/~REPO~/blob/master/.editorconfig)
  [What is this?](https://editorconfig.org/)

> EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

- [.eslintignore](https://github.com/~REPO~/blob/master/.eslintignore)
  [What is this?](https://eslint.org/docs/user-guide/configuring/ignoring-code)

> When using ESLint, this file is used to exclude files, directories or patterns from being included in this linting process.
> This is the top-level ignore file used across the mono-repo.
>
> - Sub-packages may define their own `.eslintignore` which will supercede this one.
> - This file will be referenced for example when running `pnpm run check`, as well as: Pull Requests, Commit/Push, Github Actions CI.

- [.eslintrc.json](https://github.com/~REPO~/blob/master/.eslintrc.json)]
  [What is this?](https://eslint.org/)

> When using ESLint, this file provides settings that will be used.
> This is the top-level settings file used across the mono-repo.
>
> - Sub-packages may define their own `.eslintrc` which will supercede this one.
> - This file will be referenced for example when running `pnpm run check`, as well as: Pull Requests, Push, Github Actions CI.

- [.gitattributes](https://github.com/~REPO~/blob/master/.gitattributes)
  [What is this?](https://git-scm.com/docs/gitattributes)

> This file is used by git in relation to the top-level of the project when performing git operations.
> Sub-packages may define their own `.gitattributes` which will supercede this one.

- [.gitignore](https://github.com/~REPO~/blob/master/.gitignore)
  [What is this?](https://git-scm.com/docs/gitignore)

> This file is used to exclude files, directories or patterns from being included when using Push/Commit in a repository.
> This is the top-level ignore file used across the mono-repo.
>
> - Sub-packages may define their own `.gitignore` which will supercede this one.

- [.npmrc](https://github.com/~REPO~/blob/master/.npmrc)
  [What is this?](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)

> Various top-level settings for `npm`.

- [.nvmrc](https://github.com/~REPO~/blob/master/.nvmrc)
  [What is this?](https://github.com/nvm-sh/nvm)

> The purpose of this file is to infer that a specific `node` version must be used for this mono-repo and all it's sub-packages.

- [.prettierignore](https://github.com/~REPO~/blob/master/.prettierignore)
  [What is this?](https://prettier.io/docs/en/ignore.html)

> When using Prettier, this file is used to exclude files, directories or patterns from being included in this prettier process.
> This is the top-level ignore file used across the mono-repo.
>
> - Sub-packages may define their own `.prettierignore` which will supercede this one.
> - This file will be referenced for example when running `pnpm run check`, as well as: Pull Requests, Commit/Push, Github Actions CI.

- [.prettierrc](https://github.com/~REPO~/blob/master/.prettierrc)
  [What is this?](https://prettier.io/docs/en/configuration.html)

> When using Prettier, this file provides settings that will be used.
> This is the top-level settings file used across the mono-repo.
>
> - Sub-packages may define their own `.prettierrc` which will supercede this one.
> - This file will be referenced for example when running `pnpm run check`, as well as: Pull Requests, Push, Github Actions CI.

- [.stylelintrc.json](https://github.com/~REPO~/blob/master/.stylelintrc.json)
  [What is this?](https://stylelint.io/user-guide/configure/)

> When using stylelint, this file provides settings that will be used.
> This is the top-level settings file used across the mono-repo.
>
> - Sub-packages may define their own `.stylelintrc.json` which will supercede this one.
> - This file will be referenced for example when running `pnpm run check`, as well as: Pull Requests, Push, Github Actions CI.

- [.xo-config.json](https://github.com/~REPO~/blob/master/.xo-config.json)
  [What is this?](https://github.com/xojs/xo)

> When using XO (Linting), this file provides settings that will be used.
> This is the top-level settings file used across the mono-repo.
>
> - Sub-packages may define their own `.xo-config.json` which will supercede this one.
> - This file will be referenced for example when running `pnpm run check`, as well as: Pull Requests, Push, Github Actions CI.

- [CODE_OF_CONDUCT.md](https://github.com/~REPO~/blob/master/CODE_OF_CONDUCT.md)
  [What is this?](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)

```
The purpose of a `Code of Conduct` is to establish a healthy, respectable environment for all members.
```

- [CONTRIBUTING.md](https://github.com/~REPO~/blob/master/CONTRIBUTING.md)

> The purose of `Contributing` is to establish requirements, best practices and guidance on how to become a contributory member of a project.

- [GOVERNANCE.md](https://github.com/~REPO~/blob/master/GOVERNANCE.md)

> The purpose of `Governance` is to establish the organizational/project structure, the decision making process and arbitration.

- [LICENSE.md](https://github.com/~REPO~/blob/master/LICENSE.md)

> The purpose of `License` is to clearly establish the licensing terms that the project adheres to.

- [package.json](https://github.com/~REPO~/blob/master/package.json)

> The purpose of the top-level `package.json` is to provide global availability of dependencies in sub-packages as well as:
>
> - Cross-package scripts that support:
>   -- Unit Testing
>   -- Building
>   -- Checking (Linting)
>   -- Publishing
>   -- Documentation Generation

- [PROJECT_CHARTER.md](https://github.com/~REPO~/blob/master/PROJECT_CHARTER.md)

> The purpose of `Project Charter` is to establish the organizational/project structure, the decision making process and arbitration.

- [README.md](https://github.com/~REPO~/blob/master/README.md)

> The purpose of a `Readme` file within a repository or any sub-packages is to clearly describe the following information:
>
> - Badges For
>   -- License
>   -- Maintained?
>   -- Current Release Version
>   -- Github CI Action Status
>   -- Github Release Action Status
>   -- Codacy Code Quality Analysis Grade
>   -- Security Vulnerabilities from Snyk
>   -- Chat
> - Website URL
> - Documentation URL
> - Getting Started URL
> - A 6-Point Summary of the most important features of a project
> - A short 20-30 second Video GIF demonstrating the project
> - Features List URL
> - Installation Directions
> - Short Getting Started Directions
> - Contributing Section
> - Contributors Section following `All Contributors` specification

- [SECURITY.md](https://github.com/~REPO~/blob/master/SECURITY.md)

> The purpose of `Security` is to establish a clear process of reporting vulnerabilities in a project.

- [tsconfig.doc.json](https://github.com/~REPO~/blob/master/tsconfig.doc.json)

> The purpose of this file is to define the pattern-matched paths that will be used when generating project documentation.

## .changeset

- [changelog-github-custom.cjs](https://github.com/~REPO~/blob/master/.changeset/changelog-github-custom.cjs)

> The purpose of this file is to provide customization in how changeset generates changelogs.

- [config.json](https://github.com/~REPO~/blob/master/.changeset/config.json)
  [What is this?](https://github.com/atlassian/changesets)

> As part of the release process, it's important to follow semantic versioning & automatic changelog generation based on the commit messages since the last release.
> This file hosts the settings for that process.
>
> - This file will be refererenced when running `pnpm run changeset:version`. Which will automatically bump all versions in all packages across the mono-repo that have changes. Further details on this process, it's purpose can be found in `GITHUB_SETUP.md` in the `base` of the project.

## .githooks

- [pre-push](https://github.com/~REPO~/blob/master/.githooks/pre-push)
  [What is this?](https://git-scm.com/docs/githooks)

> The purpose of this file is to intercept git when performing a push to a repository.
> What happens:
>
> - Globally install @resistjs/conformances
> - Install all dependencies as defined in `package.json`
> - Run `pnpm run check`

- [prepare-commit-msg](https://github.com/~REPO~/blob/master/.githooks/prepare-commit-msg)
  [What is this?](https://git-scm.com/docs/githooks)

> The purpose of this file is to intercept git when preparing a commit and redirect the operation to use https://github.com/commitizen/cz-cli.

## .github

- [auto-comment.yml](https://github.com/~REPO~/blob/master/.github/auto-comment.yml)
  [What is this?](https://github.com/marketplace/actions/auto-comment)

> The purpose of this file is to provide settings for the `Auto Comment` Github Bot.
> This bot will handle automatically comment on new issues and pull requests to the repository.

- [CODE_OWNERS](https://github.com/~REPO~/blob/master/.github/CODE_OWNERS)
  [What is this?](https://docs.gitlab.com/ee/user/project/code_owners.html)

> The purpose of `CODE_OWNERS` is to define who owns specific files or directories in a repository.

- [config.yml](https://github.com/~REPO~/blob/master/.github/config.yml)

> The purpose of this file is to provide settings for varying Github Bots.
> Currently in use are:
>
> - https://github.com/probot/no-response
>   - Closes Issues where the author of the issue has not responsed to a request for more information after a set time.
> - https://github.com/behaviorbot/new-issue-welcome
>   - Provides a friendly greeting to users who open their first issue in a repository.
> - https://github.com/behaviorbot/new-pr-welcome
>   - Provides a friendly greeting to users who open their first pull request in a repository.
> - https://github.com/behaviorbot/first-pr-merge
>   - Congratulates contributors after their first successful pull request mergins.
> - https://github.com/behaviorbot/request-info
>   - Requests more info from PRs/Issues with either the default title or a blank body or insufficient conformance to the `CONTRIBUTORS` guidelines.

- [dependabot.yml](https://github.com/~REPO~/blob/master/.github/dependabot.yml)
  [What is this?](https://dependabot.com/docs/config-file/)

> This file defines the settings for Github's Dependabot which handles automatically making Pull Requests when a depenedency in any package within the mono-repo is outdated.

- [FUNDING.yml](https://github.com/~REPO~/blob/master/.github/FUNDING.yml)
  [What is this?](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository)

> The purpose of this file is to define the URL that will be displayed in "Sponsor this project" section on a github repository.

- [generated-files-bot.yml](https://github.com/~REPO~/blob/master/.github/generated-files-bot.yml)
  [What is this?](https://github.com/googleapis/repo-automation-bots/tree/main/packages/generated-files-bot)

> This file defines the settings for the bot. The template bot automatically comments on pull requests if you are modifying templated files.

- [lock.yml](https://github.com/~REPO~/blob/master/.github/lock.yml)
  [What is this?](https://github.com/dessant/lock-threads-app)

> This file defines the settings for the bot.
> The Lock Threads bot locks closed issues and pull requests after a period of inactivity.

- [PULL_REQUEST_TEMPLATE.md](https://github.com/~REPO~/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
  [What is this?](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

> The purpose of this file is to define the settings that are used when users open a new pull request. This provides the ability to customize the defaults.

- [SAVED_REPLIES.md](https://github.com/~REPO~/blob/master/.github/SAVED_REPLIES.md)

> The purpose of this files is to support canned responses that the team should use to close issues on the issue tracker that fall into the listed resolution categories.

- [stale.yml](https://github.com/~REPO~/blob/master/.github/stale.yml)
  [What is this?](https://github.com/probot/stale)

> The purpose of this file is to define the settings that are used for the Github stale Bot. This bot closes abandoned Issues and Pull Requests after a period of inactivity.

### ISSUE_TEMPLATE

- [bug_report.yml](https://github.com/~REPO~/blob/master/.github/ISSUE_TEMPLATE/bug_report.yml)
  [What is this?](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> The purpose of this file is to define the default settings and guidelines for creating a bug report through Github Issues.

- [config.yml](https://github.com/~REPO~/blob/master/.github/ISSUE_TEMPLATE/config.yml)
  [What is this?](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> The purpose of this file is to define the default options available when creating an Issue in Github Issues.

- [feature_request.yml](https://github.com/~REPO~/blob/master/.github/ISSUE_TEMPLATE/feature_request.yml)
  [What is this?](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> The purpose of this file is to define the default settings and guidelines for creating a feature request through Github Issues.

### workflows

- [automerge.yml](https://github.com/~REPO~/blob/master/.github/workflows/automerge.yml)
  [What is this?](https://github.com/ridedott/merge-me-action)

> The purpose of this Github Action is to automatically merge pull requests when all CI checks have successfully passed.

- [ci.yml](https://github.com/~REPO~/blob/master/.github/workflows/ci.yml)

> The purpose of this Github Action is to act as the gate-keeper for Continuous Integration.
> The actions performed in this process are as follows:
>
> - Notify Slack that CI is in progress
> - Install pnpm
> - Install @resistjs/conformances globally
> - Attempt to build all sub-packages in the mono-repo
> - Attempt to run unit tests for the mono-repo and all sub-packages
> - Attempt to run linting (eslint, styleline, xo and prettier)
> - Attempt to generate API documentation for the current commit and push that to the documentations branch
> - Run a spell check on all source files
> - If any of the steps above fail, then the CI fails and the Release cycle won't trigger
> - If any of the steps above fail, then a Pull Request will not be allowed to merge until the issues are resolved
> - If any of the steps above fail or succeed, Slack is notified

- [codeql.yml](https://github.com/~REPO~/blob/master/.github/workflows/codeql.yml)

> The purpose of this Github Action is to run a Code Quality Analysis on pushes to any branch in any repository as well on all Pull Requests using Codacy.
> The actions performed in this process are as follows:
>
> - Notify Slack that a CodeQL is in progress
> - Run CodeQL
> - Notify Slack that a CodeQL has finished

- [release.yml](https://github.com/~REPO~/blob/master/.github/workflows/release.yml)

> The purpose of this Github Action is to prepare and publish a new release.
> The actions performed in this process are as follows:
>
> - Notify slack that a Release is in progress
> - - Run the same process as in `ci.yml`
> - Run `pnpm release`
>   - Which should, trigger a changeset action, publish to a public or private npm registry

- [stuck.yml](https://github.com/~REPO~/blob/master/.github/workflows/stuck.yml)
  [What is this?](https://github.com/jrylan/github-action-stuck-pr-notifier)

> The purpose of this Github Action is to automatically label and mention/notify users about stuck pull requests.

## packages

> The packages folder contains all of the packages that belong to the `base` mono-repo.
> For information on what each package is for, navigate to each package directory.
