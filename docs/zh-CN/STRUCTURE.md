# In Your Language

<p align="center">
  <a href="https://github.com/resist-js/resist/blob/master/docs/en-US/STRUCTURE.md"
    >English</a>
  ·
  <a
    href="https://github.com/resist-js/resist/blob/master/docs/zh-CN/STRUCTURE.md"
    >简体中文</a>
</p>

# 结构

本指南的目的是描述`resistjs`的整体结构，并用简单易懂的方式解释结构当中的每个文件的用途。

## base

单一代码库的顶层。

[什么是单一代码库？](https://en.wikipedia.org/wiki/Monorepo)

- [.all-contributorsrc](https://github.com/resist-js/resist/blob/master/.all-contributorsrc)
  [是什么？](https://github.com/all-contributors/all-contributors)

> 这是对开源项目贡献者的认可规范，奖励每一种贡献，而不仅仅是代码贡献。

- [.czrc](https://github.com/resist-js/resist/blob/master/.czrc)
  [是什么？](https://github.com/commitizen/cz-cli)

> 让您获得提交说明信息（commit message）格式的即时反馈，并提示您填写必填项。例如，在对单一代码库的任何分支进行任何推送/提交(push/commit)操作时，都会参考这个文件。

- [.editorconfig](https://github.com/resist-js/resist/blob/master/.editorconfig)
  [是什么？](https://editorconfig.org/)

> EditorConfig帮助多个开发者在不同的编辑器和IDE中为同一个项目工作时保持一致的编码风格。

- [.eslintignore](https://github.com/resist-js/resist/blob/master/.eslintignore)
  [是什么？](https://eslint.org/docs/user-guide/configuring/ignoring-code)

> 当使用ESLint时，这个文件可用来排除一些文件、目录或命名模式，这样这些文件或目录将不被包含在这个代码格式化过程中。
> 这是整个单一代码库的最顶层忽略文件。
>
> - 子包可以定义属于他们自己的`.eslintignore`来取代顶层的这个文件。
> - 这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.eslintrc.json](https://github.com/resist-js/resist/blob/master/.eslintrc.json)]
  [是什么？](https://eslint.org/)

> 当使用ESLint时，这个文件用来存放配置选项。这是整个单一代码库的最顶层设置文件。
>
> - 子包可以定义属于他们自己的`.eslintrc`来取代顶层的这个文件。
> - 这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.gitattributes](https://github.com/resist-js/resist/blob/master/.gitattributes)
  [是什么？](https://git-scm.com/docs/gitattributes)

> [To be translated: 待翻译]

- [.gitignore](https://github.com/resist-js/resist/blob/master/.gitignore)
  [是什么？](https://git-scm.com/docs/gitignore)

> 这个文件可用来排除一些文件、目录或命名模式，这样这些文件或目录将不被包含在代码提交/推送中。
> 这是整个单一代码库的最顶层忽略文件。
>
> - 子包可以定义属于他们自己的`.gitignore`来取代顶层的这个文件。

- [.npmrc](https://github.com/resist-js/resist/blob/master/.npmrc)
  [是什么？](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)

> `npm`的各种顶层设置。

- [.nvmrc](https://github.com/resist-js/resist/blob/master/.nvmrc)
  [是什么？](https://github.com/nvm-sh/nvm)

> 这个文件的目的是推断出这个单一代码库及其所有子包必须使用的特定`node`版本。

- [.prettierignore](https://github.com/resist-js/resist/blob/master/.prettierignore)
  [是什么？](https://prettier.io/docs/en/ignore.html)

> 当使用 Prettier 时，这个文件可用来排除一些文件、目录或命名模式，这样这些文件或目录将不被包含在prettier执行的过程中。
> 这是整个单一代码库的最顶层忽略文件。
>
> - 子包可以定义属于他们自己的`.prettierignore`来取代顶层的这个文件。
> - 这个文这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.prettierrc](https://github.com/resist-js/resist/blob/master/.prettierrc)
  [是什么？](https://prettier.io/docs/en/configuration.html)

> 当使用Prettier时，这个文件用来存放配置选项。
> 这是整个单一代码库的最顶层设置文件。
>
> - 子包可以定义属于他们自己的`.prettierrc`来取代顶层的这个文件。
> - 这个文这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.stylelintrc.json](https://github.com/resist-js/resist/blob/master/.stylelintrc.json)
  [是什么？](https://stylelint.io/user-guide/configure/)

> 当使用stylelint时，这个文件用来存放配置选项。
> 这是整个单一代码库的最顶层设置文件。
>
> - 子包可以定义属于他们自己的`.stylelintrc.json`来取代顶层的这个文件。
> - 这个文这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.prettierrc](https://github.com/resist-js/resist/blob/master/.prettierrc)
  [是什么？](https://prettier.io/docs/en/configuration.html)

> 当使用Prettier时，这个文件用来存放配置选项。
> 这是整个单一代码库的最顶层设置文件。
>
> - 子包可以定义属于他们自己的`.prettierrc`来取代顶层的这个文件。
> - 这个文这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.stylelintrc.json](https://github.com/resist-js/resist/blob/master/.stylelintrc.json)
  [是什么？](https://stylelint.io/user-guide/configure/)

> 当使用stylelint时，这个文件用来存放配置选项。
> 这是整个单一代码库的最顶层设置文件。
>
> - 子包可以定义属于他们自己的`.stylelintrc.json`来取代顶层的这个文件。
> - 这个文这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [.xo-config.json](https://github.com/resist-js/resist/blob/master/.xo-config.json)
  [是什么？](https://github.com/xojs/xo)

> 当使用XO（Linting）时，这个文件用来存放配置选项。
> 这是整个单一代码库的最顶层设置文件。
>
> - 子包可以定义属于他们自己的`.xo-config.json`来取代顶层的这个文件。
> - 这个文这个文件将在运行`pnpm run check`时，以及代码和并请求（PR），提交/推送，GitHub持续集成（GitHub Actions CI）这些动作发生时被引用。

- [CODE_OF_CONDUCT.md](https://github.com/resist-js/resist/blob/master/CODE_OF_CONDUCT.md)
  [是什么？](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)

```
行为准则（Code of Conduct的目的是为所有成员建立一个健康的、受尊重的环境。
```

- [CONTRIBUTING.md](https://github.com/resist-js/resist/blob/master/CONTRIBUTING.md)

> `贡献(Contributing)`的目的是树立成为项目贡献成员的要求、最佳做法和指导。

- [GOVERNANCE.md](https://github.com/resist-js/resist/blob/master/GOVERNANCE.md)

> `管理(Governance)`的目的是建立组织和项目结构，决策过程和仲裁。

- [LICENSE.md](https://github.com/resist-js/resist/blob/master/LICENSE.md)

> `许可证(License)`的目的是明确建立项目所遵守的许可条款。

- [package.json](https://github.com/resist-js/resist/blob/master/package.json)

> 顶层的`package.json`的目的是提供子包依赖包的全局可用性，以及。
>
> - 跨包脚本：
> -- 单元测试
> -- 连接（Build）
> -- 格式检查(Linting)
> -- 发布
> -- 文档生成

- [PROJECT_CHARTER.md](https://github.com/resist-js/resist/blob/master/PROJECT_CHARTER.md)

> `项目章程(Project Charter)`的目的是建立组织/项目结构、决策过程和仲裁。

- [README.md](https://github.com/resist-js/resist/blob/master/README.md)

> 代码仓库或任何子包内的`Readme`文件的目的是清楚地描述以下信息：
>
> - 徽章，包括
> -- 许可证
> -- 是否还在维护？
> -- 当前的发布版本
> -- GitHub持续集成状态
> -- GitHub发布状态
> -- Codacy代码质量等级分析
> -- Snyk安全漏洞分析
> -- 会话
> - 网站URL
> - 文档URL
> - 入门指南URL
> - 项目的6项最重要特点总结
> - 一个简短的20-30秒的项目演示GIF
> - 功能列表URL
> - 安装指南
> - 简要入门指南
> - 贡献板块
> - 遵循 "所有贡献者（All Contributors）"规范的贡献者板块

- [SECURITY.md](https://github.com/resist-js/resist/blob/master/SECURITY.md)

> `安全(Security)`的目的是建立一个明确的流程来报告项目中的漏洞。

- [tsconfig.doc.json](https://github.com/resist-js/resist/blob/master/tsconfig.doc.json)

> 这个文件的目的是定义模式匹配的路径，在生成项目文档时使用。

## .changeset

- [changelog-github-custom.cjs](https://github.com/resist-js/resist/blob/master/.changeset/changelog-github-custom.cjs)

> 这个文件的目的是为changeset生成changelogs的方式提供自定义。

- [config.json](https://github.com/resist-js/resist/blob/master/.changeset/config.json)
  [是什么？](https://github.com/atlassian/changesets)

> 作为发布过程的一部分，重要的是要遵循语义上的版本管理和基于上次发布后的提交信息的自动更新日志生成。
> 这个文件承载了该过程的设置。
>
> - 这个文件将在运行`pnpm run changeset:version`时被引用。这将会自动提升整个mono-repo中所有有变化的软件包的所有版本。关于这个过程的更多细节，它的目的可以在项目的`base`中找到`GITHUB_SETUP.md`。

## .githooks

- [pre-push](https://github.com/resist-js/resist/blob/master/.githooks/pre-push)
  [是什么？](https://git-scm.com/docs/githooks)

> 这个文件的目的是在执行推送到版本库时拦截git。
> 会发生什么。
>
> - 全局性地安装 @resistjs/conformances
> - 安装所有在`package.json`中定义的依赖项
> - 运行`pnpm run check`。

- [prepare-commit-msg](https://github.com/resist-js/resist/blob/master/.githooks/prepare-commit-msg)
  [是什么？](https://git-scm.com/docs/githooks)

> 这个文件的目的是在准备提交时拦截git，并将操作重定向到使用https://github.com/commitizen/cz-cli。

## .github

- [auto-comment.yml](https://github.com/resist-js/resist/blob/master/.github/auto-comment.yml)
  [是什么？](https://github.com/marketplace/actions/auto-comment)

> 这个文件的目的是为 "自动评论 "的GitHub机器人提供设置。
> 这个机器人将自动处理对新问题和拉动请求的评论，并将其提交给仓库。

- [code_owners](https://github.com/resist-js/resist/blob/master/.github/CODE_OWNERS)
  [是什么？](https://docs.gitlab.com/ee/user/project/code_owners.html)

> `CODE_OWNERS`的目的是定义谁拥有版本库中的特定文件或目录。

- [config.yml](https://github.com/resist-js/resist/blob/master/.github/config.yml)

> 这个文件的目的是为不同的 GitHub 机器人提供设置。
> 目前使用的是。
>
> - https://github.com/probot/no-response
> - 如果问题的作者在设定的时间内没有回应更多信息的请求，就会关闭该问题。
> - https://github.com/behaviorbot/new-issue-welcome
> - 为在版本库中打开第一个问题的用户提供一个友好的问候语。
> - https://github.com/behaviorbot/new-pr-welcome
> - 为在版本库中打开第一个拉动请求的用户提供一个友好的问候。
> - https://github.com/behaviorbot/first-pr-merge
> - 在贡献者第一次成功合并拉动请求后向其表示祝贺。
> - https://github.com/behaviorbot/request-info
> - 要求从默认标题或空白正文的 PRs/Issues 中获得更多信息，或不充分符合 `CONTRIBUTORS'准则。

- [dependabot.yml](https://github.com/resist-js/resist/blob/master/.github/dependabot.yml)
  [是什么？](https://dependabot.com/docs/config-file/)

> 这个文件定义了GitHub的Dependabot的设置，当mono-repo中的任何包的依赖性过期时，Dependabot会处理自动提出拉动请求。

- [FUNDING.yml](https://github.com/resist-js/resist/blob/master/.github/FUNDING.yml)
  [是什么？](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository)

> 这个文件的目的是定义在GitHub仓库的 "赞助此项目 "部分所显示的URL。

- [generated-files-bot.yml](https://github.com/resist-js/resist/blob/master/.github/generated-files-bot.yml)
  [是什么？](https://github.com/googleapis/repo-automation-bots/tree/main/packages/generated-files-bot)

> 这个文件定义了机器人的设置。如果你在修改模板文件，模板机器人会自动对拉动请求进行评论。

- [lock.yml](https://github.com/resist-js/resist/blob/master/.github/lock.yml)
  [是什么？](https://github.com/dessant/lock-threads-app)

> 这个文件定义了机器人的设置。
> 锁定线程机器人会在一段时间的非活动后锁定已关闭的问题和拉动请求。

- [PULL_REQUEST_TEMPLATE.md](https://github.com/resist-js/resist/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
  [是什么？](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

> 这个文件的目的是定义用户打开一个新的拉取请求时使用的设置。这提供了自定义默认值的能力。

- [SAVED_REPLIES.md](https://github.com/resist-js/resist/blob/master/.github/SAVED_REPLIES.md)

> 这个文件的目的是支持团队应该用来关闭问题跟踪器上属于所列解决类别的问题的预制回复。

- [stale.yml](https://github.com/resist-js/resist/blob/master/.github/stale.yml)
  [是什么？](https://github.com/probot/stale)

> 这个文件的目的是定义用于 GitHub stale Bot 的设置。这个机器人会在一段时间的非活动后关闭废弃的问题和拉动请求。

### issue_template

- [bug_report.yml](https://github.com/resist-js/resist/blob/master/.github/ISSUE_TEMPLATE/bug_report.yml)
  [是什么？](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> 这个文件的目的是定义通过GitHub问题创建错误报告的默认设置和准则。

- [config.yml](https://github.com/resist-js/resist/blob/master/.github/ISSUE_TEMPLATE/config.yml)
  [是什么？](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> 这个文件的目的是定义在 GitHub Issues 中创建问题时可用的默认选项。

- [document.yml](https://github.com/resist-js/resist/blob/master/.github/ISSUE_TEMPLATE/documentation.yml)
  [是什么？](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> 这个文件的目的是定义通过 GitHub Issues 创建文档改进时的默认设置和指南。

- [feature_request.yml](https://github.com/resist-js/resist/blob/master/.github/ISSUE_TEMPLATE/feature_request.yml)
  [是什么？](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/manually-creating-a-single-issue-template-for-your-repository)

> 这个文件的目的是定义通过GitHub问题创建功能请求的默认设置和指南。

###工作流程

- [automerge.yml](https://github.com/resist-js/resist/blob/master/.github/workflows/automerge.yml)
  [是什么？](https://github.com/ridedott/merge-me-action)

> 这个GitHub动作的目的是在所有CI检查都成功通过后自动合并拉动请求。

- [ci.yml](https://github.com/resist-js/resist/blob/master/.github/workflows/ci.yml)

> 这个GitHub动作的目的是作为持续集成的把关人。
> 这个过程中执行的动作如下。
>
> - 通知Slack，CI正在进行中
> - 安装 pnpm
> - 全局安装@resistjs/conformances
> - 尝试构建mono-repo中的所有子包
> - 试图运行单体-repo和所有子包的单元测试
> - 试图运行检查（eslint、stylelint、xo和prettier）。
> - 尝试生成当前提交的 API 文档，并将其推送到文档分支。
> - 对所有源代码文件进行拼写检查
> - 如果上述任何步骤失败，那么CI就会失败，发布周期就不会触发。
> 如果上述任何步骤失败，那么在问题解决之前，将不允许合并拉动请求。
> - 如果上面的任何步骤失败或成功，Slack会被通知

- [codeql.yml](https://github.com/resist-js/resist/blob/master/.github/workflows/codeql.yml)

> 这个GitHub动作的目的是对推送到任何仓库的任何分支以及使用Codacy的所有拉动请求进行代码质量分析。
> 这个过程中执行的操作如下。
>
> - 通知Slack一个CodeQL正在进行中
> - 运行 CodeQL
> - 通知Slack一个CodeQL已经完成。

- [release.yml](https://github.com/resist-js/resist/blob/master/.github/workflows/release.yml)

> 这个GitHub动作的目的是准备和发布一个新版本。
> 这个过程中执行的动作如下。
>
> - 通知slack一个发布正在进行中
> -- 运行与`ci.yml`中相同的流程
> - 运行`pnpm release`。
> - 这应该是，触发一个变化集动作，发布到公共或私有的npm注册处

- [stucked.yml](https://github.com/resist-js/resist/blob/master/.github/workflows/stuck.yml)
  [是什么？](https://github.com/jrylan/github-action-stuck-pr-notifier)

> 这个GitHub动作的目的是自动标记和提及/通知用户关于卡住的拉动请求。

## 包裹

> packages文件夹包含所有属于`base`单版本的软件包。
> 关于每个包的用途的信息，请浏览每个包目录。

#### 这份说明对您有帮助吗? 我们是否有可以改进的地方? [点击此处](https://github.com/resist-js/resist/issues/new?assignees=&labels=&template=documentation.yml)来提出您的建议.