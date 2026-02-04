# Contributing to Cipher

We welcome contributions to the Cipher programming language! Whether you're reporting a bug, suggesting a new feature, or submitting code, your help is invaluable.

## 🐛 Bug Reports

If you find a bug, please open an issue on our [GitHub Issues page](https://github.com/your-username/cipher/issues). When reporting a bug, please include:

*   A clear and concise description of the bug.
*   Steps to reproduce the behavior.
*   Expected behavior.
*   Actual behavior.
*   Any relevant code snippets or error messages.
*   Your operating system and Node.js version.

## ✨ Feature Suggestions

Have an idea for a new feature or improvement? We'd love to hear it! Please open an issue on our [GitHub Issues page](https://github.com/your-username/cipher/issues) and describe your suggestion. Explain why you think it would be a good addition to Cipher and how it would be used.

## 💻 Code Contributions

We appreciate code contributions! To contribute code, please follow these steps:

1.  **Fork the repository:** Start by forking the `cipher` repository to your GitHub account.
2.  **Clone your fork:**
    ```bash
    git clone https://github.com/your-username/cipher.git # Replace with your fork's URL
    cd cipher
    ```
3.  **Create a new branch:** For each new feature or bug fix, create a new branch:
    ```bash
    git checkout -b feature/your-feature-name # For features
    git checkout -b bugfix/your-bug-name    # For bug fixes
    ```
4.  **Set up your development environment:**
    *   Install dependencies: `npm install`
    *   Compile the project: `npm run build:dist`
    *   Run tests: `npm test`
5.  **Make your changes:**
    *   Implement your feature or bug fix.
    *   Write **unit tests** to cover your changes. We aim for high test coverage.
    *   Ensure your code adheres to the existing coding style and conventions.
    *   Run tests (`npm test`) to make sure everything passes.
    *   Run `npm run build:dist` to ensure compilation is successful.
6.  **Commit your changes:** Write clear and concise commit messages.
    ```bash
    git commit -m "feat: Add new feature" # For features
    git commit -m "fix: Fix bug in lexer" # For bug fixes
    ```
7.  **Push to your fork:**
    ```bash
    git push origin feature/your-feature-name
    ```
8.  **Open a Pull Request:**
    *   Go to the original `cipher` repository on GitHub.
    *   You should see an option to open a Pull Request from your branch.
    *   Provide a descriptive title and detailed explanation of your changes.
    *   Link to any relevant issues.

## 📝 Coding Style

*   We use TypeScript, so please follow TypeScript best practices.
*   Keep functions and methods focused on a single responsibility.
*   Write clear and concise comments where necessary (explaining *why*, not *what*).
*   Ensure your code is well-formatted.

## 🌐 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms. (A `CODE_OF_CONDUCT.md` will be added soon).

Thank you for helping to build Cipher!
