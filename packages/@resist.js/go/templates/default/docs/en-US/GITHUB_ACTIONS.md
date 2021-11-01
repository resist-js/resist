# In Your Language

<p align="center">
  <a href="~GITHUB_URL~blob/master/docs/en-US/GITHUB_ACTIONS.md"
    >English</a>
</p>

# What Are GitHub Actions?

GitHub actions make it easy to automate the Lifecyle of software development. Build, test, and deploy code right from GitHub. Make code reviews, manage branches, generate documentation, and issue triaging work the way you want.

[Learn Here](https://docs.github.com/en/actions/learn-github-actions)

# How Do We Use GitHub Actions?

We use 5 central Actions as part of the CI/CD lifecycle process. This allows as to automate everything from code quality checking on Pull Requests to Releasing a new version to npm.

Below, we will explain line-by-line each Action.

## Action: [CI](~GITHUB_URL~blob/master/.github/workflows/ci.yml)

> What is this?
> This action automatically runs on every Pull Request, on every push to **master** branch.

```yaml=
on: # The conditions that must be met in order for the Action to run
  push:
    branches:
      - master # Run when pushing to master branch
  pull_request: # Run on any Pull Request
env: # Environment variables
  CI: true # Running in C/I mode
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1'

jobs:
  CI:
    runs-on: ubuntu-latest # The vm to run the task on
    steps:
      - name: Talk To Slack # Post Message to Slack
        if: success() # Only run if Action is successful
        id: slack
        env: # Environment variables
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }} # The secret token in your GitHub Account -> Secrets
        uses: voxmedia/github-action-slack-notify-build@v1 # The external repository to use (https://github.com/voxmedia/github-action-slack-notify-build)
        with: # The options for `uses`
          channel: ~APP_NAME~ # The Slack Channel
          status: STARTING # The Status in the message
          color: warning # The color of the left bar in the message

      # Checkout the repository and setup node
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2.4.1
        with:
          node-version: '16.11.1' # The node version to use

      - name: Cache ~/.pnpm-store
        uses: actions/cache@main
        with:
          path: ~/.pnpm-store
          key: ${{ runner.os }}-${{ matrix.node-version }}-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-${{ matrix.node-version }}
      # Install `pnpm, @~APP_NAME~/conformances` globally, then install all dependencies, build project and then run checks
      - run: npm install -g pnpm
      - run: npm i -g @~APP_NAME~/conformances --reporter=silent
      - run: pnpm install --frozen-lockfile=false --reporter=silent
      - run: pnpm run build --filter ./packages
      - run: pnpm run check

      # Generate Documentation
      - name: Generate Documentation
        run: pnpm run docs

      # Version Documentation
      - name: Version Documentation
        uses: bobrown101/version-docs@v2.1.20 # The external repository to use (https://github.com/bobrown101/version-docs)
        with: # Options for `uses`
          github-token: ${{ secrets.GITHUB_TOKEN }}
          doc-location: documentation # The location of the documentation in the repository
          doc-branch: documentation # The branch in the repository
          commit-msg: 🌻 # The commit message

      # Run a spell check on all code
      - name: Spellcheck
        uses: reviewdog/action-shellcheck@v1 # The external repository to use (https://github.com/reviewdog/action-shellcheck)
        with: # The options for `uses`
          github_token: ${{ secrets.github_token }}
          reporter: github-pr-review

      # If Action is successful then post a message to Slack
      - name: Workflow Success
        if: success()
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }}
        uses: voxmedia/github-action-slack-notify-build@v1
        with:
          channel: ~APP_NAME~
          status: SUCCESS
          color: good

        # If Action fails then post a message to Slack
      - name: Workflow Failure
        if: failure()
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }}
        uses: voxmedia/github-action-slack-notify-build@v1
        with:
          channel: ~APP_NAME~
          status: FAILED
          color: danger
```

## Action: [CodeQL](~GITHUB_URL~blob/master/.github/workflows/codeql.yml)

> What is this?
> This action automatically runs on every Pull Request, on every push to **master** branch and weekly. It uses a third-party service, [Codacy](https://codacy.com) to run Code Quality Analysis. Which is a more thorough analysis of Code Quality than the checks in **CI**.

```yaml=
on: # The conditions that must be met in order for the Action to run
  push:
    branches:
      - master # Run when pushing to master branch
  pull_request:
    branches:
      - master # Run when a Pull Request is made on the master branch
  schedule:
    - cron: '0 0 * * 0' # Run weekly

jobs: # The tasks
  analyze: # The task name
    name: Analyze
    runs-on: ubuntu-latest # The vm to run the task on
    permissions: # The permissions for Codacy
      actions: read
      contents: read
      security-events: write

    strategy: # The strategy/options for Codacy
      fail-fast: false
      matrix:
        languages: ['javascript', 'typescript']

    steps:
      - name: Talk To Slack # Post Message to Slack
        if: success() # Only run if Action is successful
        id: slack
        env: # Environment variables
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }} # The secret token in your GitHub Account -> Secrets
        uses: voxmedia/github-action-slack-notify-build@v1 # The external repository to use (https://github.com/voxmedia/github-action-slack-notify-build)
        with: # The options for `uses`
          channel: ~APP_NAME~ # The Slack Channel
          status: STARTING # The Status in the message
          color: warning # The color of the left bar in the message
      - name: Checkout repository
        uses: actions/checkout@v2

      # Initializes the CodeQL tools for scanning.
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v1
        with:
          languages: ${{ matrix.language }}

      - name: Autobuild
        uses: github/codeql-action/autobuild@v1

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v1

      # If Action is successful then post a message to Slack
      - name: Workflow Success
        if: success()
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }}
        uses: voxmedia/github-action-slack-notify-build@v1
        with:
          channel: ~APP_NAME~
          status: SUCCESS
          color: good

        # If Action fails then post a message to Slack
      - name: Workflow Failure
        if: failure()
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }}
        uses: voxmedia/github-action-slack-notify-build@v1
        with:
          channel: ~APP_NAME~
          status: FAILED
          color: danger

```

## Action: [Release](~GITHUB_URL~blob/master/.github/workflows/release.yml)

> What is this?
> This action automatically runs when the **CI** action has successfully run against a Pull Request.

```yaml=
on: # The conditions that must be met in order for the Action to run
  workflow_run: # When an "Action" has run
    types: # The statuses of the "Action"
      - completed # The status
    workflows: # The "Action(s)"
      - 'CI' # The name of the Action

jobs: # The single task
  release: # The task name
    # prevents this action from running on forks
    if: github.repository == '~REPO~'
    name: Release
    runs-on: ubuntu-latest # The vm to run the task on
    steps: # The steps
      - name: Talk To Slack # Post Message to Slack
        if: success() # Only run if Action is successful
        id: slack
        env: # Environment variables
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }} # The secret token in your GitHub Account -> Secrets
        uses: voxmedia/github-action-slack-notify-build@v1 # The external repository to use (https://github.com/voxmedia/github-action-slack-notify-build)
        with: # Options for `uses`
          channel: ~APP_NAME~ # The Slack Channel
          status: STARTING # The Status in the message
          color: warning # The color of the left bar in the message

      - name: Checkout Repo
        uses: actions/checkout@master
        with:
          # This makes Actions fetch all Git history so that Changesets can generate changelogs with the correct commits
          fetch-depth: 0

      - name: Setup Node.js 16.x
        uses: actions/setup-node@v2.4.1
        with:
          node-version: '16.11.1' # The node version to use

      # Install `pnpm, @~APP_NAME~/conformances` globally, then install all dependencies, build project and then run checks
      - run: npm install -g pnpm
      - run: npm i -g @~APP_NAME~/conformances --reporter=silent
      - run: pnpm install --frozen-lockfile=false --reporter=silent
      - run: pnpm run build --filter ./packages
      - run: pnpm run check

      - name: Create Tag & Publish to npm
        id: changesets
        uses: changesets/action@master
        with: # Options for `uses`
          publish: pnpm release
        env: # Environment variables
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

        # If Action is successful then post a message to Slack
      - name: Workflow Success
        if: success()
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }}
        uses: voxmedia/github-action-slack-notify-build@v1
        with:
          channel: ~APP_NAME~
          status: SUCCESS
          color: good # The color of the left bar in the message

        # If Action fails then post a message to Slack
      - name: Workflow Failure
        if: failure()
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_NOTIFICATIONS_BOT_TOKEN }}
        uses: voxmedia/github-action-slack-notify-build@v1
        with:
          channel: ~APP_NAME~
          status: FAILED
          color: danger # The color of the left bar in the message
```

## Action: [Auto-Merge](~GITHUB_URL~blob/master/.github/workflows/automerge.yml)

> What is this?
> This action automatically runs when the **CI** action has successfully run against a Pull Request. It will Automatically Merge Pull Requests.

```yaml=
on: # The conditions that must be met in order for the Action to run
  workflow_run: # When an "Action" has run
    types: # The statuses of the "Action"
      - completed # The status
    workflows: # The "Action(s)"
      - 'CI' # The name of the Action

jobs: # The single task
  merge-me: # The task name
    runs-on: ubuntu-latest # The vm to run the task on
    steps: # The steps
      - name: Auto Merge # Step name
        uses: ridedott/merge-me-action@v2 # The external repository to use (https://github.com/ridedott/merge-me-action)
        with: # The options for `uses`
          GITHUB_LOGIN: dependabot-preview
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Action: [Stuck PRs](~GITHUB_URL~blob/master/.github/workflows/stuck.yml)

> What is this?
> This action automatically runs once per hour and will check if there are any Pull Requests in a stuck state and label it and post a message to the Author of the Pull Request that it's stuck. This might occur for example when a Pull Request is made and not all of the Status Checks pass.

```yaml=
on: # The conditions that must be met in order for the Action to run
  schedule: # The schedule of the action
    - cron: '0 * * * *' # Run once per hour

jobs: # The single task
  stuck-prs: # The task name
    runs-on: ubuntu-latest # The vm to run the task on
    steps: # The steps
      - uses: jrylan/github-action-stuck-pr-notifier@main # The external repository to use (https://github.com/jrylan/github-action-stuck-pr-notifier)
        with: # The options for `uses`
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          message: 'Hey, this PR appears to be stuck.' # The message that will be posted on the PR that is stuck
          search-query: 'author:app/dependabot-preview author:app/dependabot'
```

#### Did you find this helpful? Is there something we can improve? [Click here](~GITHUB_URL~issues/new?assignees=&labels=&template=documentation.yml) to make a suggestion.
