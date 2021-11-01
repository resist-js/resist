# In Your Language

<p align="center">
  <a href="~GITHUB_URL~blob/master/docs/en-US/HOUSEKEEPING.md"
    >English</a>
</p>

# Housekeeping Policies

At ~APP_NAME~ we aim to automate as much as the lifecycle process as possible, while maintaining a high standard of quality, inter-cooperation, transparency and standards. Below are what standard **Housekeeping** policies the `@~APP_NAME~/core` team handles directly or delegates to others in accordance with [Contributing](~GITHUB_URL~blob/master/CONTRIBUTING.md), [Governance](~GITHUB_URL~blob/master/GOVERNANCE.md), [Project Charter](~GITHUB_URL~blob/master/PROJECT_CHARTER.md) and [Code Of Conduct](~GITHUB_URL~blob/master/CODE_OF_CONDUCT.md).

## Bot Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

> Current Bots In Use
>
> - [Welcome Bot](https://probot.github.io/apps/welcome/)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Stale Bot](https://probot.github.io/apps/stale/)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Slack Bot](https://slack.github.com/)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Sentiment Bot](https://probot.github.io/apps/sentiment-bot/)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Request Info Bot](https://probot.github.io/apps/request-info/)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Generated Files Bot](https://github.com/apps/generated-files-bot)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Merge On Green Bot](https://github.com/apps/gcf-merge-on-green)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition:
> - [Create Issue Branch Bot](https://github.com/apps/create-issue-branch)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Background Check Bot](https://github.com/apps/background-check)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [Auto Comment Bot](https://github.com/apps/auto-comment)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a
> - [All Contributors Bot](https://github.com/apps/allcontributors/installations/new)
>   - Addition Date: Oct/31/2021
>   - Reason For Addition: n/a

Due to the nature of our use of GitHub Bots, we need to take time to review our usage of each Bot that is currently in use to assess the following:

- Is it still suited to our needs?
- Is it regularly maintained?
- Are there any outstanding security implications?
- Is it open-source and licensed under a permissive license?
- Does the community for the repository follow a Code Of Conduct like our own?

If any of these points are "No", the `@~APP_NAME~/leads` team must have a discussion to consider its removal and potential replacement, while not disrupting the overall stability, performance or security of the project and community. All `@~APP_NAME~/leads` team members must be in consensus and agreement.

The same above applies when considering adding a new GitHub Bot.

Regardless, any addition and/or removal of any GitHub Bot will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/leads` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Bot Review** will be updated through a Pull Request by a `@~APP_NAME~/leads` team member on conclusion of the discussion, including the **Current Bots In Use** with a link to each Bots repository as well as a list of **Past Used** Bots, Repository URL, the Removal/Addition Date and Reason For Removal/Addition.

## Dependencies Assessment Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

Due to the nature of many projects, we need to take time to review our usage of each Dependency that is currently in use to assess the following:

- Is it still suited to our needs?
- Is it regularly maintained?
- Are there any outstanding security implications?
- Is it open-source and licensed under a permissive license?
- Does the community for the repository follow a Code Of Conduct like our own?

If any of these points are "No", the `@~APP_NAME~/leads` team must have a discussion to consider its removal and potential replacement, while not disrupting the overall stability, performance or security of the project and community. All `@~APP_NAME~/leads` team members must be in consensus and agreement.

The same above applies when considering adding a new Dependency to the root of the mono-repo.
Additions/removals from any sub-package requires the approval of at least one senior team member from the respective sub-package as well as approval of at least one team member from `@~APP_NAME~/leads`.

In addition, any alteration of dependencies must pass all checks as detailed in [Contributing](~GITHUB_URL~blob/master/CONTRIBUTING.md)

Regardless, any addition and/or removal of any Dependency will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/leads` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Dependencies Assessment Review** will be updated through a Pull Request by a `@~APP_NAME~/leads` team member on conclusion of the discussion, a list of **Past Used** Dependencies, the Removal/Addition Date, Repository URL and Reason For Removal/Addition.

## Dependencies Update Review

> Frequency: Every 1 Month
> Last Review: Oct/31/2021

We need to take time to review availability of all **non-patch** version of each Dependency that is currently in use to assess the following:

- Is it still suited to our needs?
- Is it regularly maintained?
- Are there any outstanding security implications?
- Is it open-source and licensed under a permissive license?
- Does the community for the repository follow a Code Of Conduct like our own?

Patch updates will generally be handled automatically by **Dependabot** making automated Pull Requests. and should require no manual intervention. This Review is specific to **non-patch** version updates of Dependencies across the mono-repo.

If any of these points are "No", the `@~APP_NAME~/core` team must have a discussion to consider its removal and potential replacement, while not disrupting the overall stability, performance or security of the project and community. All `@~APP_NAME~/core` team members must be in consensus and agreement.

The same above applies when considering updating a new Dependency in the root of the mono-repo.
Updates for any sub-package requires the approval of at least one senior team member from the respective sub-package as well as approval of at least one team member from `@~APP_NAME~/core`.

In addition, any alteration of dependencies must pass all checks as detailed in [Contributing](~GITHUB_URL~blob/master/CONTRIBUTING.md)

Regardless, any update of any Dependency will be discussed, and appropriate action taken once every 1 month. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Dependencies Update Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

## Conformances Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

From time to time the `@~APP_NAME~/core` team will review the Conformances that are in place for this project. Conformances are those rules/defaults provided by `@~APP_NAME~/conformances` and checked/applied through various methods such as when running `pnpm run check` and as part of the CI/CD lifecycle.

The implications of discussing alterations to the existing defaults/rules must be carefully weighed due to the far-reaching implications of alteration. For example, a simple rule change within `eslint` may result in all packages within the mono-repo failing checks as the `@~APP_NAME~/conformance` rules are applied to the mono-repo and all sub-packages.

The discussion will include any alterations to:

- eslint
- xo
- stylelint
- prettier
- commitizen
- Codacy
- editorconfig

> The current rulesets/defaults for the above can be found in the corresponding files in `@~APP_NAME~/conformances` and [Structure](~GITHUB_URL~docs/en-US/STRUCTURE.md).

The process is as follows:

- If a new dependency is to be added/removed, it must first be discussed as part of the `Dependency Assessment Review`.
- If a rule/default is removed/added, what are the implications?
- If a rule/default is removed/added, what are the reasons?
- If a rule/default is removed/added, do all the CI/CD lifecycle checks still pass?
- Does the change require any significant adjustment by the community and its contributors?

In addition, any alteration of Conformances must pass all checks as detailed in [Contributing](~GITHUB_URL~blob/master/CONTRIBUTING.md).

Regardless, any alteration of any Conformances will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Conformances Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion, a list of **Past Used** Rules/Defaults, the Removal/Addition Date, Repository URL and Reason For Removal/Addition/Alteration.

## Contributions Guideline Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

Our Contribution Guidelines are an integral part of fostering healthy and productive progress for the project. The `@~APP_NAME~/core` team will review and discuss the guidelines in place and how they can be improved to better suit our community.

The process is as follows:

- Is the most recent Contributor Covenant version in use? If not, what are the alterations?
- Does the change require any significant adjustment by the community and its contributors?

Regardless, any alteration of the Contributions will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Contributions Guideline Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

## Security Policy Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

- Does the change require any significant adjustment by the community and its contributors?
- Has there been significant lapses in security with the current Security Policy?

As part of the Security Policy review the `@~APP_NAME~/core` team must take into consideration all past security issues, how they were handled in regards to the current Security Policy and come to a consensus on how to improve.

Regardless, any alteration of the Security Policy will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Security Policy Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

## Code Of Conduct Policy Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

Our Code Of Conduct is adapted from the [Contributor Covenant, version 2.0](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). In the `@~APP_NAME~/core` team's discussions surrounding Code Of Conduct an assessment should be made on whether any addendums need to be made separate from the Contributor Covenant. At this time we also need to verify we are using the most recent Contributor Covenant version. Any alterations in the Code Of Conduct requires that all community members be notified of the alterations, and the reasoning.

Regardless, any alteration of the Code Of Conduct Policy will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Code Of Conduct Policy Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

## Project Charter & Governance Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

The `@~APP_NAME~/leads` team will at times discuss any adjustments that should be made to the Project Charter and Governance based on discussions among the broader community.

Regardless, any alteration of the Project Charter & Governance Policy will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Project Charter & Governance Policy Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

## RFC Policy Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

The `@~APP_NAME~/leads` team will at times discuss any adjustments that should be made to the RFC Policy based on discussions among the broader community.

Regardless, any alteration of the RFC Policy will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **RFC Policy Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

## Documentation Policy Review

> Frequency: Every 3 Months
> Last Review: Oct/31/2021

The `@~APP_NAME~/core` team will at times discuss any adjustments that should be made to the Documentation Policy based on discussions among the broader community.

Regardless, any alteration of the Documenation Review will be discussed, and appropriate action taken once every 3 months. The frequency of this may be adjusted by consensus from the `@~APP_NAME~/core` team. Every **Review** and the contents thereof will be freely and transparently available in `#~APP_NAME~` in [Slack](~HOMEPAGE~chat). The _Last Review_ for **Documentation Review** will be updated through a Pull Request by a `@~APP_NAME~/core` team member on conclusion of the discussion.

#### Did you find this helpful? Is there something we can improve? [Click here](~GITHUB_URL~issues/new?assignees=&labels=&template=documentation.yml) to make a suggestion.
