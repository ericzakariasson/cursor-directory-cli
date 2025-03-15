#!/usr/bin/env node

import { Command } from 'commander';
import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to extract slug from input (could be a URL or a direct slug)
function extractSlug(input) {
  // Check if input is a URL
  if (input.startsWith('http://') || input.startsWith('https://')) {
    // Extract the slug from the URL (everything after the last slash)
    const urlParts = input.split('/');
    return urlParts[urlParts.length - 1];
  }
  
  // If not a URL, assume it's already a slug
  return input;
}

const program = new Command();

program
  .name('cursor-directory')
  .description('CLI to interact with cursor.directory')
  .version('1.0.0');

// Add 'rules' command with subcommands
const rulesCommand = program.command('rules')
  .description('Manage cursor rules')
  .action(() => {
    // Display help for the rules command when it's used without a subcommand
    rulesCommand.help();
  });

// Add 'add' subcommand
rulesCommand.command('add')
  .description('Add a cursor rule from cursor.directory')
  .argument('<input>', 'Slug or URL of the cursor rule to fetch (e.g. "my-rule" or "https://cursor.directory/my-rule")')
  .action(async (input) => {
    try {
      const slug = extractSlug(input);
      console.log(`Fetching cursor rule with slug: ${slug}`);
      
      // Fetch data directly from the specific API endpoint for this rule
      const response = await fetch(`https://cursor.directory/api/${slug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch from API: ${response.statusText}`);
      }
      
      const json = await response.json();
      
      // The data structure is different from the general API - it's directly in the data object
      const rule = json.data;
      
      if (!rule) {
        throw new Error(`No rule found with slug: ${slug}`);
      }
      
      // Prepare the .cursor/rules directory
      const rulesDir = path.join(process.cwd(), '.cursor', 'rules');
      await fs.ensureDir(rulesDir);
      
      // Prepare the file content with frontmatter
      const fileContent = `---
description: ${rule.title}
globs:
alwaysApply: false
---
${rule.content.trim()}`;
      
      // Write the file
      const filePath = path.join(rulesDir, `${slug}.mdc`);
      await fs.writeFile(filePath, fileContent);
      
      console.log(`Successfully saved rule to: ${filePath}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Show help if no arguments are provided
if (process.argv.length <= 2) {
  program.help();
}

program.parse(process.argv); 