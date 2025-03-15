# Cursor Directory CLI

A command-line tool to download and install [Cursor Directory](https://cursor.directory) rules directly to your local Cursor editor.

## Installation

There are two ways to use this tool:

### Option 1: Use with npx (recommended)

Run directly without installing using npx:

```bash
npx cursor-directory rules add <slug|url>
```

### Option 2: Install globally

```bash
npm install -g cursor-directory
```

Then run with:

```bash
cursor-directory rules add <slug|url>
```

## Usage

```bash
# Using npx (without installation)
npx cursor-directory rules add <slug|url>

# Or if globally installed
cursor-directory rules add <slug|url>
```

### Examples

```bash
# Using npx with a slug
npx cursor-directory rules add al-buisnesscentral-development-cursor-rules

# Using npx with a URL
npx cursor-directory rules add https://cursor.directory/front-end-cursor-rules

# Or if installed globally
cursor-directory rules add al-buisnesscentral-development-cursor-rules
```

## How It Works

This CLI tool:

1. Fetches the rule directly from `cursor.directory/api/[slug]`
2. If a URL is provided, extracts the slug from it
3. Saves the rule to `.cursor/rules/<slug>.mdc` with the proper frontmatter format
4. Sets up the proper metadata including title, empty globs, and alwaysApply: false

## Available Rules

Visit [cursor.directory](https://cursor.directory) to browse all available rules.

## Features

- Fetches cursor rules directly from the specific API endpoint
- Supports both direct slugs and full URLs
- Saves rules in the proper MDC format
- Creates the necessary directory structure if it doesn't exist
- Validates the existence of rules before attempting to save

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 