# In Your Language

<p align="center">
  <a href="~GITHUB_URL~blob/master/docs/en-US/GITHUB_CHECKS.md"
    >English</a>
</p>

# How Do We Check Code Quality, Run Linting, etc.?

In the lifecycle, it's important to maintain a high level of standards when it comes to code quality and security. We try to automate this as much as possible. For example, when any code is pushed, or a pull request is made or during the **CI** process, we enforce linting checks. If these checks fail, the issues reported must be resolved before a Pull Request can be merged or before code can be pushed.

We use the following checks:

- commitlint
  - This process occurs when preparing to make a commit. The [commitizen](https://github.com/commitizen/cz-cli) defaults are enforced, so that commit messages are consistent and uniform across the project.
  - It is required that each file has a specific commit message on what has changed. For full details, see [Contributing](~GITHUB_URL~CONTRIBUTING.md).
- eslint
  - This process occurs: Pull Requests and CI/CD or manually when running `pnpm run check`.
  - The basis rules we conform to are:
    - eslint:recommended
    - [plugin:@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint)
    - [plugin:sonarjs/recommended](https://github.com/SonarSource/eslint-plugin-sonarjs)
    - [plugin:jsdoc/recommended](https://github.com/gajus/eslint-plugin-jsdoc)
      - As well as enforcement of requiring JSDoc comments in functions, classes, interfaces, etc.
    - prettier
- xo
  - This process occurs: Pull Requests and CI/CD or manually when running `pnpm run check`.
  - The basis rules we conform to are:
    - [Here](https://github.com/xojs/xo)
- stylelint
  - This process occurs: Pull Requests and CI/CD or manually when running `pnpm run check`.
  - The basis rules we conform to are:
  - [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
  - [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)
- Prettier
  - This process occurs: Pull Requests and CI/CD or manually when running `pnpm run check`.
  - The basis rules we conform to are:
    - Single Quote
    - 120 Print Width
    - 2 Tab Width
    - No Semicolon
    - Avoiding Arrow Parens
    - Trailing Comma
    - No Tabs, Use Spaces
- spellcheck
  - This process occurs: CI/CD.
  - A spelling check of code is conducted in the CI/CD process. The check will fail, and issues must be resolved if there are any spelling mistakes in code.
- security
  - Automated Security checks are provided via GitHub and Codacy on a regular basis.
  - For other security issues please refer to [here](~GITHUB_URL~SECURITY.md).
- dependencies
  - Dependencies across all packages in the mono-repository are automatically bumped (minor versions only) and a corresponding Pull Request is made automatically by Dependabot.
  - Dependency reviews are conducted on a specified basis by `@~APP_NAME~/core` team members, according to the policies set out [here](~GITHUB_URL~HOUSEKEEPING.md).

> Rule reviews/modifications for eslint/xo/stylelint/Prettier are conducted by `@~APP_NAME~/core` team members, according to the policies set out [here](~GITHUB_URL~HOUSEKEEPING.md).

#### Did you find this helpful? Is there something we can improve? [Click here](~GITHUB_URL~issues/new?assignees=&labels=&template=documentation.yml) to make a suggestion.
