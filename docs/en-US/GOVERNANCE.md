# In Your Language

<p align="center">
  <a href="https://github.com/resist-js/resist/blob/master/docs/en-US/GOVERNANCE.md"
    >English</a>
  ·
  <a
    href="https://github.com/resist-js/resist/blob/master/docs/zh-CN/GOVERNANCE.md"
    >简体中文</a>
</p>

# Project Governance

<!-- TOC -->

- [Lead Maintainers](#lead-maintainers)
- [Collaborators](#collaborators)
  - [Collaborator activities](#collaborator-activities)
- [Great Contributors](#great-contributors)
- [Collaborator nominations](#collaborator-maintainers-nominations)
- [Lead Maintainers nominations](#lead-maintainers-nominations)
- [Consensus seeking process](#consensus-seeking-process)

<!-- /TOC -->

## Lead Maintainers

Lead Maintainers are the founder of the project and the organization owners.
They are the only members of the `@resist-js/leads` team.
The Lead Maintainers are the curator of the resist.js project and their key responsibility is to issue releases of resist.js and its dependencies and handle [Housekeeping](https://github.com/resist-js/resist/blob/master/docs/en-US/HOUSEKEEPING.md).

## Collaborators

Collaborators maintain the projects of the resist.js organization.

They are split into the following teams:

| Team                   | Responsibility        | Repository                                                    |
| ---------------------- | --------------------- | ------------------------------------------------------------- |
| `@resist-js/leads`     | Lead Maintainers      | GitHub organization owners                                    |
| `@resist-js/core`      | Core development      | `go`, `server`, `conformances`, `utils`, `bins`, `svelte-kit` |
| `@resist-js/component` | Component development | `components`                                                  |
| `@resist-js/api`       | API development       | `api`                                                         |
| `@resist-js/storage`   | Storage development   | `storage`                                                     |

Collaborators have:

- Commit access to the projects repository of the team they belong
- Grant to release new versions of the project

Both Collaborators and non-Collaborators may propose changes to the source code
of the projects of the organization.
The mechanism to propose such a change is a GitHub pull request.
Collaborators review and merge (_land_) pull requests following the [CONTRIBUTING](https://github.com/resist-js/resist/blob/master/CONTRIBUTING.md#rules) guidelines.

### Collaborator activities

- Helping users and novice contributors
- Contributing code and documentation changes that improve the project
- Reviewing and commenting on issues and pull requests
- Participation in working groups
- Merging pull requests
- Release plugins

The Lead Maintainers can remove inactive Collaborators or provide them with _Past Collaborators_
status. Past Collaborators may request that the Lead Maintainers restore them to active status.

## Great Contributors

Great contributors on a specific area in the resist.js ecosystem will be invited to join this group by Lead Maintainers.
This group has the same permissions as a contributor.

## Collaborator nominations

Individuals making significant and valuable contributions to the project may be a candidate to join the resist.js organization.

A Collaborator needs to open a private team discussion on GitHub and list the candidates
they want to sponsor with a link to the user's contributions. For example:

- Activities in the resist.js organization `[USERNAME](https://github.com/search?q=author:USERNAME+org:resist-js)`

Otherwise, a Contributor may self-apply if they believe they meet the above criteria by reaching out
to a Lead Maintainer privately with the links to their valuable contributions.
The Lead Maintainers will reply to the Contributor and will decide if candidate it to be made a collaborator.

The consensus to grant a new candidate Collaborator status is reached when:

- at least one of the Lead Maintainers approve
- at least two of the Team Members approve

After these conditions are satisfied, the [onboarding process](CONTRIBUTING.md#onboarding-collaborators) may start.

## Lead Maintainers nominations

A Team Member may be promoted to a Lead Maintainers only through nomination by a Lead Maintainer and with agreement from the rest of Lead Maintainers.

## Consensus seeking process

The resist.js organization follows a [Consensus Seeking](https://en.wikipedia.org/wiki/Consensus-seeking_decision-making) decision-making model.

#### Did you find this helpful? Is there something we can improve? [Click here](https://github.com/resist-js/resist/issues/new?assignees=&labels=&template=documentation.yml) to make a suggestion.
