# In Your Language

<p align="center">
  <a href="https://github.com/resist-js/resist/blob/master/docs/en-US/GITHUB_SETUP.md"
    >English</a>
  ·
  <a
    href="https://github.com/resist-js/resist/blob/master/docs/zh-CN/GITHUB_SETUP.md"
    >简体中文</a>
</p>

# 这一切是如何运作的？

本说明旨在用易于理解的方式详细介绍整个项目以及单一代码库是如何设置的，从创建 **GitHub 帐户** 一直到 **持续集成和发布过程**。包括但不仅限于...

> 是什么，为什么和怎么做？

请系好安全带，接下来我们即将开始一段说明之旅🏎，我们希望每个人都会喜欢。

## 1. 创建一个 GitHub 帐户

为什么选择 GitHub？

> 我们全力推行 GitHub 作为我们的选择（而不是方案之一）的原因很简单：
> -- 它太棒了。它被广泛地接纳为行业标准，拥有巨量的支持者。

如何创建和设置帐户？

[点此注册](https://github.com/join)

> 如果我已经注册过账户了呢？
> 那么您已经领先别人一步了！但是，我们仍然建议您观看下面的视频，并依照视频中帐户的设置方式修改您的帐户。

观看下面的视频以详细了解如何设置 GitHub 帐户。

[观看此视频](https://raw.githubusercontent.com/resist-js/resist/master/docs/en-US/Setup_GitHub.mp4)

## 2. 设置 GitHub 机器人助手

这些优秀的小助手们将承担您单一代码库管理工作中所需的大量手动作业。请确保您已登录到您的 GitHub 帐户，然后点击以下链接将这些机器人助手添加到您的帐户。

- [安装“欢迎”机器人助手](https://probot.github.io/apps/welcome/)
- [安装“识别非活跃问题”机器人助手](https://github.com/marketplace/stale)
- [安装Slack机器人助手](https://slack.github.com/)
- [安装“情绪管理”机器人助手](https://probot.github.io/apps/sentiment-bot/)
- [安装“求详细”机器人助手](https://probot.github.io/apps/request-info/)
- [安装“Generated Files”机器人助手](https://github.com/apps/generated-files-bot)
- [安装“绿灯后自动合并PR”机器人助手](https://github.com/apps/gcf-merge-on-green)
- [安装“创建问题分支”机器人助手](https://github.com/apps/create-issue-branch)
- [安装“背景调查”机器人助手](https://github.com/apps/background-check)
- [安装“自动评论”机器人助手](https://github.com/apps/auto-comment)
- [安装“全体贡献人”机器人](https://github.com/apps/allcontributors/installations/new)

## 3. 设置一个 npm 账户

> 这是什么？
> 对于诸如resist.js 之类的开源项目，这将能让他人轻松地安装和使用这些产品。创建 npm 帐户之后，您的项目包便可轻松地被自动分发出去，亦会让他人使用自如。

> 此步骤仅适用于您打算将单一代码库开源的情况。
> 如果您打算将其设为私有库（例如供公司内部使用），您可以跳到下一步。

> 我该怎么做？
> 观看下面的视频以详细了解您的 npm 帐户应该如何设置。

[观看此视频](https://raw.githubusercontent.com/resist-js/resist/master/docs/en-US/Setup_npm.mp4)

## 3.5 设置私有 npm 注册表

> 这是什么？
> 私有 npm 注册表允许您私下发布、安装和管理您的单一代码库中的依赖包。就像人们可以运行 `npm i @resistjs/go` 一样，这也适用于私有 npm 注册表当中的项目包，但只有登录到您的私有注册表的个人才能访问或安装这些包。

> 我该怎么做？
> 观看下面的视频以详细了解您的私有 npm 注册表应该如何设置。

[观看此视频](https://raw.githubusercontent.com/resist-js/resist/master/docs/en-US/Setup_npm_private.mp4)

## 4. 设置 Codacy 帐户

> 这是什么？
> Codacy 帐户的目的是持续监控和分析您的单一代码库中的代码质量。

> 我该怎么做？
> 观看下面的视频以详细了解您的 Codacy 帐户应该如何设置。

[观看此视频](https://raw.githubusercontent.com/resist-js/resist/master/docs/en-US/Setup_Codacy.mp4)

## 5. 设置 Slack 工作空间

> 这是什么？
> 拥有 Slack 工作空间的目的是创造一个让贡献者和团队成员等可以进行实时讨论的环境。它还将作为持续开发/持续集成生命周期的一部分，因为持续开发/持续集成以及GitHub动作历史都可发布到Slack当中。

> 我该怎么做？
> 观看下面的视频以详细了解您的 Slack 帐户应该如何设置。

[观看此视频](https://raw.githubusercontent.com/resist-js/resist/master/docs/en-US/Setup_Slack.mp4) 

## 6. 相关解释

> 什么是GitHub动作（GitHub Actions）？它们是如何运作的？
> [见这里](./docs/en-US/GITHUB_ACTIONS.md)

> 自动文档（automatic documentation）是如何运作的？
> [见这里](./docs/en-US/GITHUB_DOCS.md)

> 提交过程（commit process）是如何运作的？
> [见这里](./docs/en-US/GITHUB_COMMIT.md)

> 检查/整理过程（checking/linting process）是如何运作的？
> [见这里](./docs/en-US/GITHUB_CHECKS.md)

> 提新问题（new issues）是如何运作的？
> [见这里](./docs/en-US/GITHUB_ISSUES.md)

> 拉取请求（pull requests）是如何运作的？
> [见这里](./docs/en-US/GITHUB_PR.md)

> 发布流程（release process）是如何运作的？
> [见这里](./docs/en-US/GITHUB_RELEASE.md)

> **所有的这些文件都是干什么用的呢？**
> 您可能会注意到，您的单一代码库里还有很多其他文件。他们都有各自的作用，而其中的绝大多数文件您几乎永远无需修改。他们会自动发挥自己的作用！
> 但是您若希望更清楚的一探究竟，您可以点击下面的链接以查阅有关每个文件及其用途的详细说明。

[这些文件是什么？](./docs/en-US/STRUCTURE.md)

## 7. 还有什么要做的吗？

> 这份指南是否忽略了什么？有什么需要更多解释或澄清的吗？如果是这样，请按照“贡献者指南”中的说明提交一条您的问题。

## 8. 接下来怎么办？

> 现在您已经了解这一切是如何运作的了...
> 请按照“README”中的安装部分开始下一步吧。
> **编程愉快！** 让我们一起通过这个开源项目使开发人员的人生更加轻松。 🎉