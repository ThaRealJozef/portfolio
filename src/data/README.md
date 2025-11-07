# Projects Data

This file contains the data for all projects displayed on my portfolio website.

## How to Edit

To add, modify, or remove projects, edit the `projects.json` file in this directory.

### Project Structure

Each project should have the following fields:

```json
{
  "name": "project name",
  "description": "short description of what the project does",
  "languages": ["test", "test"],
  "technologies": ["test", "test", "test"],
  "link": "https://github.com/tharealjozef/project-name",
}
```

### Fields Explanation

- **name** (required):name of project
- **description** (required): brief description (1-2 sentences max)
- **languages** (required): array of programming languages used (eg ["JavaScript", "Python"])
- **technologies** (required): array of frameworks, tools, or technologies used (eg ["React", "TensorFlow"])
- **link** (required): url to the gitHub repository

### Tips

1. Keep descriptions concise and clear
2. List only the main languages and technologies
3. Projects are displayed in the order they appear in the JSON file
4. The portfolio displays up to 6 projects by default

### Example

```json
[
  {
    "name": "my awesome App",
    "description": "a mobile app that helps users track their daily habits",
    "languages": ["TypeScript", "Dart"],
    "technologies": ["React Native", "Firebase"],
    "link": "https://github.com/tharealjozef/my-awesome-app",
  }
]
```