# Weather Project with AWS and TypeScript

## Description
This project displays weather information using AWS and TypeScript.

## Prerequisites

### Requirements
- Node.js
- npm
- TypeScript
- AWS CLI

### Installation
1. Install Node.js and npm:
    - Windows: Download the installer from [nodejs.org](https://nodejs.org/en/download/)
    - macOS: `brew install node`
    - Linux: `sudo apt update && sudo apt install nodejs npm`

2. Install TypeScript:
    ```bash
    npm install -g typescript
    ```

3. Install AWS CLI:
    - Windows: Download the installer from [AWS CLI](https://aws.amazon.com/cli/)
    - macOS and Linux: `pip install awscli`

4. Start the necesary dependencies 
    - npm --init
    - tsc --init

The `tsconfig.json` file can be modified using this template for the code: 

```
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "outDir": "./dist",
      "strict": true,
      "esModuleInterop": true
    }
  }
```

### Additional Setup for TypeScript and AWS

To work with AWS and Node.js in TypeScript, you'll need to install some additional packages:

```bash
npm install typescript @types/node @types/aws-sdk
```

This will allow you to work with AWS services and Node.js in a type-safe manner.


## Usage
Explain how to use the project here.

## Contribution
Instructions for contributing to the project.

## License
License under which the project is distributed.
