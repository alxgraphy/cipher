# Cipher Programming Language

![Cipher Logo](https://img.shields.io/badge/Language-Cipher-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)

## 🌟 Vision & Philosophy

Cipher is a modern, general-purpose scripting language designed for clarity, expressiveness, and ease of use. It aims to be an intuitive and enjoyable language for both beginners and experienced programmers, suitable for small to medium-sized projects, automation, and educational purposes.

Inspired by the clean syntax of languages like Python and the safety features seen in Rust, Cipher prioritizes readability and developer happiness. Our goal is to create a powerful yet predictable language that makes coding a joyful experience.

## ✨ Key Features (Current & Planned)

*   **Simple & Expressive Syntax:** Designed for readability, reducing boilerplate and making code intuitive.
*   **Strong Data Types:** Supports `int`, `float`, `string`, `bool`, `null`, `list`, and `map`.
*   **Intuitive Control Flow:** Standard `if/else`, `while`, and `for-in` loops.
*   **Function Definitions:** Clear and concise function syntax.
*   **Pipeline Operator (`|>`)**: For elegant chaining of data transformations.
*   **String Interpolation**: Easy-to-use f-strings for dynamic text.
*   **Explicit Error Handling (Planned)**: Utilizing a `Result` type for robust and clear error management.

## 🚀 Getting Started

This repository contains the foundational interpreter for the Cipher language, built using TypeScript and Node.js.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cipher.git # Replace with actual repo URL
    cd cipher
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Compile the project:**
    ```bash
    npm run build:dist
    ```

## ▶️ Running the REPL

The Read-Eval-Print Loop (REPL) allows you to interact with the Cipher language directly in your terminal.

To start the REPL:

```bash
npm start
```

You will see the `>>` prompt. Type in your Cipher code and press Enter to see the result. To exit, type `exit` and press Enter.

**Example Usage:**

```cipher
>> 5;
5
>> 10 + 2; # (Note: Infix expressions are not yet fully implemented in the evaluator)
10 + 2
>> exit
```

## 🧪 Testing

To run the test suite and ensure everything is working correctly:

```bash
npm test
```

## 🤝 Contributing

We welcome contributions to the Cipher programming language! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to report bugs, suggest features, and contribute code.

## 📄 License

This project is licensed under the [BSD 2-Clause](LICENSE.md).

## 🧑‍💻 Development Roadmap

*   **Lexer:** Complete tokenization of all language constructs. (✅ Done)
*   **Parser:** Build robust Abstract Syntax Tree (AST) for all language constructs, including proper operator precedence. (Partially Done - basic statements and expressions)
*   **Object System:** Define all native objects (integers, booleans, strings, functions, arrays, maps). (Partially Done - basic objects)
*   **Evaluator:** Implement logic to evaluate all AST nodes. (Partially Done - basic evaluation)
*   **Standard Library:** Develop core built-in functions.
*   **Error Handling:** Implement robust error reporting and recovery.
*   **Compiler/Transpiler:** Explore options for compiling Cipher to other targets.
