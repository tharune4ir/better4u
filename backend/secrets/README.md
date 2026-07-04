# VIZIER Secrets Directory

This directory is designated for secret credential files that should **never** be committed to Git.

### Expected Files:
1. `google_oauth_client.json` - The Desktop OAuth client secrets JSON file downloaded from the Google Cloud Console.
2. Other OAuth token cache files (e.g. `token.json`) that are created dynamically by the application.

> [!CAUTION]
> This folder is strictly ignored by `.gitignore`. Do not remove the ignore rules or check in any secrets.
