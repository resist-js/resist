# How Does This All Work?

The purpose of this guide is to detail, in a human-understandable way how the entire mono-repository and project is setup from creating a **GitHub Account** all the way through to the **CI & Release process**. Including, but not limited to...

> How, What and Why?

Strap in, we're about to go on a ride 🏎 that we hope everyone will enjoy.

## 1. Creating A GitHub Account

Why GitHub?

> The reasoning behind throwing our full and unwavering support behind using GitHub as our choice rather than one of the alternatives, is simply this:
> -- It's awesome. It's widely accepted as the industry standard, with huge backing and support.

How Do I Create & Setup An Account?

[Click here to Signup](https://github.com/join)

> What if I already have an account?
> You are a step ahead! However, we still recommend watching the video below and modifying your account to match how the account in the video is setup.

Watch the video below for a detailed walkthrough on exactly how your GitHub Account should be setup.

[Watch this Video](https://raw.githubusercontent.com/~REPO~/master/docs/en-US/Setup_GitHub.mp4)

## 2. Setting Up GitHub Bots

These wonderful little helpers will take a lot of the manual work that is required out of managing your mono-repository. Make sure you are logged in to your GitHub Account and then press each of the links below to add these Bots to your account.

- [Install Welcome Bot](https://probot.github.io/apps/welcome/)
- [Install Stale Bot](https://probot.github.io/apps/stale/)
- [Install Slack Bot](https://slack.github.com/)
- [Install Sentiment Bot](https://probot.github.io/apps/sentiment-bot/)
- [Install Request Info Bot](https://probot.github.io/apps/request-info/)
- [Install Generated Files Bot](https://github.com/apps/generated-files-bot)
- [Install Merge On Green Bot](https://github.com/apps/gcf-merge-on-green)
- [Install Create Issue Branch Bot](https://github.com/apps/create-issue-branch)
- [Install Background Check Bot](https://github.com/apps/background-check)
- [Install Auto Comment Bot](https://github.com/apps/auto-comment)
- [Install All Contributors Bot](https://github.com/apps/allcontributors/installations/new)

## 3. Setting Up An npm Account

> What is this?
> For an open source project such as resist.js, it's integral for people anywhere to be able to easily install and use our product. Creating an npm account allows for your projects packages to be easily distributed automatically and installed by anyone with ease.

> This step is only applicable if you intend for your mono-repository to be open-source.
> If you intend for it to be private (such as for internal company use), you can skip to the next step.

> How Do I Do It?
> Watch the video below for a detailed walkthrough on exactly how your npm Account should be setup.

[Watch this Video](https://raw.githubusercontent.com/~REPO~/master/docs/en-US/Setup_npm.mp4)

## 3.5. Setting Up A Private npm Registry

> What is this?
> A private npm registry allows you to publish, install and manage packages within your mono-repo privately. The same way that anyone can run `npm i @resistjs/go`, the same applies to a private npm registry, the exception being that only individuals that are logged into your private registry will be able to access or install those packages.

> How Do I Do It?
> Watch the video below for a detailed walkthrough on exactly how your private npm registry should be setup.

[Watch this Video](https://raw.githubusercontent.com/~REPO~/master/docs/en-US/Setup_npm_private.mp4)

## 4. Setting Up A Codacy Account

> What is this?
> The purpose of a Codacy Account is for continual monitoring and analysis of Code Quality across your mono-repo.

> How Do I Do It?
> Watch the video below for a detailed walkthrough on exactly how your Codacy Account should be setup.

[Watch this Video](https://raw.githubusercontent.com/~REPO~/master/docs/en-US/Setup_Codacy.mp4)

## 5. Setting Up A Slack Workspace

> What is this?
> The purpose of having a Slack Workspace is to foster a real-time environment in which contributors and team members a-like can discuss your project. It's also used as part of the CI/CD lifecycle, so that the status of CI/CD & GitHub Actions are posted to Slack.

> How Do I Do It?
> Watch the video below for a detailed walkthrough on exactly how your Slack Account should be setup.

[Watch this Video](https://raw.githubusercontent.com/~REPO~/master/docs/en-US/Setup_Slack.mp4)

## 6. Explanations

> What are GitHub Actions? How Do They Work?
> [See here](./docs/en-US/GITHUB_ACTIONS.md)

> How does the automatic Documentation work?
> [See here](./docs/en-US/GITHUB_DOCS.md)

> How does the commit process work?
> [See here](./docs/en-US/GITHUB_COMMIT.md)

> How does the checking/linting process work?
> [See here](./docs/en-US/GITHUB_CHECKS.md)

> How do new issues work?
> [See here](./docs/en-US/GITHUB_ISSUES.md)

> How do pull requests work?
> [See here](./docs/en-US/GITHUB_PR.md)

> How does the release process work?
> [See here](./docs/en-US/GITHUB_RELEASE.md)

> **What are all these files?**
> You may notice, there are quite a few files as part of your mono-repo. Each of these server a purpose, most of them never need to be modified. They just work!
> However, for clarity and transparency you can press the link below to find detailed explanations about each file and what the purpose of it is.

[What are these files?](./docs/en-US/STRUCTURE.md)

## 7. Do I Need To Do Anything Else?

> Did we miss something? Does anything need more explanation or clarification? If so, open an `Issue` following the `Contributor` guidelines.

## 8. What's Next?

> Now that you have an understanding of how everything works...
> Follow the Installation Section in the `README` to get started.
> **Happy Coding!** Together, through this open source project we can help make our lives as developers easier. 🎉
