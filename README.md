# Cursor Directory CLI

A command-line tool to download and install [Cursor Directory](https://cursor.directory) rules directly to your local Cursor editor.

## Installation

```bash
# Install globally from npm
npm install -g cursor-directory
```

## Usage

```bash
# Add a rule by its slug or URL
cursor-directory rules add <slug|url>
```

### Examples

```bash
# Using a slug
cursor-directory rules add al-buisnesscentral-development-cursor-rules

# Using a URL
cursor-directory rules add https://cursor.directory/front-end-cursor-rules
```

## How It Works

This CLI tool:

1. Fetches the rule directly from `cursor.directory/api/[slug]`
2. If a URL is provided, extracts the slug from it
3. Saves the rule to `.cursor/rules/<slug>.mdc` with the proper frontmatter format
4. Sets up the proper metadata including title, empty globs, and alwaysApply: false

## Available Rules

Visit [cursor.directory](https://cursor.directory) to browse all available rules.

Some popular rules:
- [Front-End Developer](https://cursor.directory/front-end-cursor-rules)
- [AL Microsoft Business Central Development](https://cursor.directory/al-buisnesscentral-development-cursor-rules)
- [Expo React Native TypeScript](https://cursor.directory/expo-react-native-typescript-cursor-rules)

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