# Contributing to Discord Bot

The following is a set of guidelines for contributing to Discord Bot repo. The bot is written in **TypeScript**

## Table of contents

- [How can you contribute?](#how-can-you-contribute)
- [Style guides](#style-guides)
- [Running the bot locally](#running-the-bot-locally)
- [How does the bot work?](#how-does-the-bot-work)

## How can you contribute?

### Reporting bugs and sharing your ideas

You have an idea or you have found a bug in the bot. The simplest way to share it is via the [Wulkanowy Discord server](https://discord.gg/vccAQBr) (yes, the server that this bot is made for). You can also [file an issue](https://github.com/wulkanowy/discord-bot/issues) on GitHub. Just make sure it's not already on the list.

### Contributing code

First create a fork of the [wulkanowy/discord-bot](https://github.com/wulkanowy/discord-bot). If you are just getting started please see [How does the bot work](#how-does-the-bot-work). This will give you basic understanding of the code of the bot. To test the bot locally see [Running the bot locally](#running-the-bot-locally).
When pushing commits and creating pull requests please follow the [Style guides](#style-guides).

Please also use lint to make sure the code is correctly formatted:

```shell
npm run lint
```

## Style guides

### Git commit messages

- Use the present tense. (`Use toilet paper` not `Used toilet paper`)
- Use the imperative mood. (`Flush the toilet` not `Flushes the toilet`)
- Use this format in pull request merge commits: `Name (#Pull)`. (example: `Wash hands (#16)`)

### Git branch names

- Use `kebab-case` (aka. `hyphen-case`, `dash-case`)
  - Separate words with hyphens. (`branch-name` not `BranchName` or `branch_name`)
  - Don't include characters other than letters, numbers and hyphens.
  - Use lowercase letters. (`cool-branch` not `Cool-Branch`)
- Make them descriptive. (`fix-windows-install` not `fix-bugs`)
- Keep them short. (`install-lint` not `install-eslinter-to-keep-code-clean`)

## Running the bot locally

To run the bot on your machine first install all the required dependencies using:

```shell
npm install
```

Then you will have to set up a bot on [Discord Developers Portal](https://discordapp.com/developers) and add it on your Discord server.

After that copy the bot token form the bot settings and set it as the `DISCORD_TOKEN` environmental variable.

If you are using a Unix-based system launch the bot using:

```shell
DISCORD_TOKEN=YOUR_TOKEN_HERE npm start
```

If you are running Windows and using cmd use:

```shell
set DISCORD_TOKEN=YOUR_TOKEN_HERE
npm start
```

If you are using PowerShell use:

```powershell
$env:DISCORD_TOKEN=YOUR_TOKEN_HERE
npm start
```

### Additional environmental variables

#### GITHUB_API_TOKEN
`GITHUB_API_TOKEN` is the API token for GitHub. Specifying it increases your API calls limit from 60 to 5000 per hour.

## How does the bot work?

`src/index.ts` is the main file in the bot. It handles connecting to the Discord API via **Discord.js** using `DISCORD_TOKEN` as the bot token (see [Running the bot locally](#running-the-bot-locally)). It also loads all the commands end events.

### Events

All client instance events are stored in the `event-handlers` folder. They are ts modules exporting function that is triggered from an event. The parameters are `client` and after that all event callback parameters. (Example: The `message` callback takes `(client, message)`). All event have to be registered in `index.ts`.

### Commands

All commands are stored in `commands`. They export (using `export default`) a **function** taking three arguments:

- `client` - Discord client (same as in events)
- `message` - Instance of Discord `Message` class - message triggering the command
- `args` - Array containing the rest of arguments, seperated by spaces. (Example: `!tell everyone something nice` will be `[everyone, something, nice]`). To join arguments back to a string just use `array.join(arguments)`.

When adding a new function don't forget to add it to `commands/index.ts`.

### Help

Commands help is stored in the `commands/pomoc.ts` command in the `help` array. The array contains objects with `command` and `text` properties indicating - *you've guessed it* - command name and help text.

### Config

`config.json` stores editable bot config. It's properties can be accessed via `client.config`.

**NOTE:** This file should not contain any secure variables - they should be stored in environmental variables.
