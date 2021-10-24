# Contributing to ~APP_NAME~

The [Open Source Guides](https://opensource.guide/) website has a collection of resources for individuals, communities, and companies. These resources help people who want to learn how to run and contribute to projects in an effective way. Contributors and people new to will find the following guides especially useful:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Building Welcoming Communities](https://opensource.guide/building-community/)

## Get involved

There are many ways to contribute to ~APP_NAME~, and many of them do not involve writing any code. Here's a few ideas to get started:

- Simply start using ~APP_NAME~. Go through the [Getting Started](~HOMEPAGE~start) guide. Does everything work as expected? If not, we're always looking for improvements. Let us know by [opening an issue](#reporting-new-issues).
- Look through the [open issues](~GITHUB_URL~issues). A good starting point would be issues tagged [good first issue](~GITHUB_URL~issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). Provide workarounds, ask for clarification, or suggest labels. Help [triage issues](#triaging-issues-and-pull-requests).
- If you find an issue you would like to fix, [open a pull request](#your-first-pull-request).
- Read through our [tutorials](~HOMEPAGE~start). If you find anything that is confusing or can be improved, you can make make a Pull Request.
- Take a look at the [features requested](~GITHUB_URL~labels/enhancement) by others in the community and consider opening a pull request if you see something you want to work on.

Contributions are very welcome. If you think you need help planning your contribution, please ping us on Slack at [~HOMEPAGE~chat](~HOMEPAGE~chat) and let us know you are looking for a bit of help.

### Triaging issues and pull requests

One great way you can contribute to the project without writing any code is to help triage issues and pull requests as they come in.

- Ask for more information if you believe the issue does not provide all the details required to solve it.
- Suggest [labels](~GITHUB_URL~labels) that can help categorize issues.
- Flag issues that are stale or that should be closed.
- Ask for test plans and review code.

## Bugs

We use [GitHub issues](~GITHUB_URL~issues) for our public bugs. If you would like to report a problem, take a look around and see if someone already opened an issue about it. If you are certain this is a new unreported bug, you can submit a [bug report](#reporting-new-issues).

If you have questions about using ~APP_NAME~, contact us on Slack at [~HOMEPAGE~chat]((~HOMEPAGE~chat), and we will do our best to answer your questions.

If you see anything you'd like to be implemented, create a [feature request issue](~GITHUB_URL~issues/new?template=feature_request.md)

## Reporting new issues

When [opening a new issue](~GITHUB_URL~issues/new/choose), always make sure to fill out the issue template. **This step is very important!** Not doing so may result in your issue not being managed in a timely fashion. Don't take this personally if this happens, and feel free to open a new issue once you've gathered all the information required by the template.

- **One issue, one bug:** Please report a single bug per issue.
- **Provide reproduction steps:** List all the steps necessary to reproduce the issue. The person reading your bug report should be able to follow these steps to reproduce your issue with minimal effort.

## RFCs

If you'd like to propose an implementation for a large new feature or change then please [create an RFC](~GITHUB_URL~rfcs) to discuss it up front.

## Developing

This is a monorepo meaning the repo holds multiple packages. It requires the use of [pnpm](https://pnpm.js.org/en/). You can [install pnpm](https://pnpm.io/installation) with:

```bash
npm i -g pnpm
```

`pnpm` commands run in the project's root directory will run on all sub-projects. You can checkout the code and build all sub-projects with:

```bash
git clone git@github.com:resist-js/resist.git
cd resist
pnpm i
pnpm build
```

## Pull requests

### Your first pull request

So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

Working on your first Pull Request? You can learn how from this free video series:

[**How to Contribute to an Open Source Project on GitHub**](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

### Proposing a change

If you would like to request a new feature or enhancement but are not yet thinking about opening a pull request, you can also file an issue with [feature template](~GITHUB_URL~issues/new?template=feature_request.md).

If you're only fixing a bug, it's fine to submit a pull request right away but we still recommend that you file an issue detailing what you're fixing. This is helpful in case we don't accept that specific fix but want to keep track of the issue.

### Sending a pull request

Small pull requests are much easier to review and more likely to get merged. Make sure the PR does only one thing, otherwise please split it.

Please make sure the following is done when submitting a pull request:

1. Fork [the repository](~GITHUB_URL~) and create your branch from `master`.
1. Describe your **test plan** in your pull request description. Make sure to test your changes.
1. Make sure your code lints (`pnpm run check`).
1. Make sure your tests pass (`pnpm run test`).

All pull requests should be opened against the `master` branch.

#### Test plan

A good test plan has the exact commands you ran and their output, provides screenshots or videos if the pull request changes UI.

- If you've changed APIs, update the documentation.

#### Testing

Run `pnpm test` to run the tests for all subpackages.

You can run the tests for a single package by first moving to that directory. E.g. `cd packages/go`.

You must rebuild each time before running the tests if you've made code changes.

To run a single integration test, provide the `FILTER` env var with the test name. E.g. `FILTER="includes paths" pnpm test:integration`. You can also open up the file and change `test` to `test.only`.

You can run the test server with `pnpm go` to hit it with your browser.

#### Breaking changes

When adding a new breaking change, follow this template in your pull request:

```md
### New breaking change here

- **Who does this affect**:
- **How to migrate**:
- **Why make this breaking change**:
- **Severity (number of people affected x effort)**:
```

### What happens next?

The core ~APP_NAME~ team will be monitoring for pull requests. Do help us by making your pull request easy to review by following the guidelines above.

## Style guide

[Eslint](https://eslint.org) will catch most styling issues that may exist in your code. You can check the status of your code styling by simply running `pnpm run check`.

### Coding style

There are a few guidelines we follow:

- Internal variables are written with `snake_case` while external APIs are written with `camelCase`
- Provide a single object as the argument to public APIs. This object can have multiple properties
- Avoid creating new test projects under `packages/*/test/apps` but reuse an existing one when possible
- Ensure `pnpm check` pass.

### Generating changelogs

For changes to be reflected in package changelogs, run `pnpx changeset` and follow the prompts.

### Releases

The [Changesets GitHub action](https://github.com/changesets/action#with-publishing) will create and update a PR that applies changesets and publishes new versions of changed packages to npm.

New packages will need to be published manually the first time if they are scoped to the `@resistjs` organisation, by running this from the package directory:

```bash
npm publish --access=public
```

## License

By contributing to resist.js, you agree that your contributions will be licensed under its [MIT license](~GITHUB_URL~blob/master/LICENSE).
