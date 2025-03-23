# Contributing to android-credential-manager

Thank you for considering contributing to android-credential-manager! This document provides guidelines and instructions to help make the contribution process smooth and effective.

## Code of Conduct

Please be respectful and considerate when interacting with other contributors. We aim to foster an inclusive and welcoming community.

## Commit Message Convention

We follow a specific commit message format to keep our history clean and to facilitate automated versioning. All commit messages MUST follow this pattern:

```
<type>: :<gitmoji>: <subject>
```

For example:

```
feat: :sparkles: Add new credential storage method
```

### Components

- **type**: Must be one of the following:

  - `feat`: New features
  - `fix`: Bug fixes
  - `docs`: Documentation changes
  - `style`: Code style changes (formatting, missing semicolons, etc.; no code change)
  - `refactor`: Code refactoring (no functionality change)
  - `perf`: Performance improvements
  - `test`: Adding or updating tests
  - `build`: Build system or external dependency changes
  - `ci`: CI configuration changes
  - `chore`: Other changes that don't modify src or test files
  - `revert`: Reverts a previous commit
  - `patch`: Small fixes that don't qualify as a full fix
  - `deps`: Dependency updates

- **gitmoji**: An official emoji code that visually represents the commit type (e.g., `:sparkles:`, `:bug:`, `:books:`)

- **subject**: A concise description of the change (max 100 characters)

Commit structure is verified by pre commit hooks

## Development Workflow

1. **Fork the repository**: Create your own fork of the project
2. **Create a branch**: Create a branch for your feature or fix
3. **Make your changes**: Write your code following the project's coding standards
4. **Commit your changes**: Follow the commit message convention described above
5. **Push to your fork**: Push your changes to your fork
6. **Submit a pull request**: Create a pull request from your fork to the main repository

## Development Setup

1. Clone the repository:

   ```
   git clone https://github.com/Guhan-SenSam/android-credential-manager.git
   cd android-credential-manager
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Install Git Hooks
   ```
   yarn prepare
   ```

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the tests if necessary
3. The PR should work for all supported Android versions within reason
4. A maintainer will review your PR and may request changes
5. Once approved, a maintainer will merge your PR

## Release Process

Our package is published to npm automatically when changes are merged to the master branch. The GitHub Actions workflow will handle versioning and publishing.

Note: Commits that start with `docs:` will not trigger the publishing workflow as they typically don't involve code changes that require a new package version.

## Getting Help

If you need help with anything, please open an issue with the label "question" or "help wanted".

Thank you for contributing to android-credential-manager!
