# In Your Language

<p align="center">
  <a href="https://github.com/resist-js/resist/blob/master/docs/en-US/GITHUB_DOCS.md"
    >English</a>
  ·
  <a
    href="https://github.com/resist-js/resist/blob/master/docs/zh-CN/GITHUB_DOCS.md"
    >简体中文</a>
</p>

# How Is Documentation Generated?

As part of the **CI/CD** process, the burden of manually generating Documentation is taken away by using GitHub Actions to automatically generate Documentation after each successful Pull Request Merge into master or a push to master.

The Documentation is generated using [Compodoc](https://compodoc.app/), based on [JSDoc](https://jsdoc.app/) standards and the rules set out in [Checks](https://github.com/resist-js/resist/docs/en-US/GITHUB_CHECKS.md).

When a push is made into the master branch, the [CI](https://github.com/resist-js/resist/blob/master/.github/workflows/ci.yml) GitHub Action is triggered, if Checks are successful, Documentation is generated and pushed to the **documentation** branch in the repository. A new version of the documentation is generated on every push to the master branch. Documentation includes all packages within the mono-repo.

#### Did you find this helpful? Is there something we can improve? [Click here](https://github.com/resist-js/resist/issues/new?assignees=&labels=&template=documentation.yml) to make a suggestion.
