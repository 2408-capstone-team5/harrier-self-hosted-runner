# Harrier Deployment Guide

## Overview

This repository contains the automated deployment process for **Harrier**, an open-source developer productivity tool to accelerate CI/CD build times of GitHub Actions workflows by automating deployment of AWS self-hosted runners and persistent cache storage.

Learn more about Harrier:  
- [Website](https://harrier-gha-runner.github.io/)  
- [Case Study](https://harrier-gha-runner.github.io/case-study/)

---

## Infrastructure Overview

Harrier deploys the following key components in your AWS account:

<p align="center">
  <img 
    src="./static/diagrams/harrier-architecture-bg-white.png"
    alt="Harrier architecture including GitHub and deployed AWS resources"
  >
</p>

---

## Deployment and Management

### Key Features
- **Secure AWS Integration**: Harrier securely integrates with your AWS and GitHub using OIDC and AWS Secrets Manager.
- **Smart Configurations**: Generate setup workflows with smart defaults or customized preferences.
- **Open-Source Transparency**: All code is publicly accessible, ensuring full transparency.

### Workflow Overview
1. Configure your AWS and GitHub accounts (detailed steps below).  
2. Generate a `setup.yml` file using the `Try Harrier` feature.  
3. Deploy `setup.yml` as a GitHub Actions workflow in your organization.  
4. Use your self-hosted runners with a simple workflow change:  

   🚫 `- ubuntu-latest`  
   ✅ `+ self-hosted`

---

## Preflight Checklist

Before starting, ensure you have:
- An active **AWS account**
- An active **GitHub account**
- A **GitHub organization**

---

## Setup Steps

### Step 1: AWS - Create an IAM Identity Provider

1. **Login to your AWS account** and navigate to **Identity and Access Management (IAM)**.
2. Select **Identity Providers** from the left-hand menu and click **Add provider**.
3. Choose **OpenID Connect** as the provider type.
4. Enter the following details:
   - **Provider URL**: `https://token.actions.githubusercontent.com`
   - **Audience**: `sts.amazonaws.com`
5. Click **Add provider**.
6. Assign a role to the new provider:
   - Click on the provider name (`token.actions.githubusercontent.com`).
   - Select **Assign role** > **Create a new role**.
   - Configure the role with:
     - **Trusted entity**: Web identity
     - **Identity provider**: `token.actions.githubusercontent.com`
     - **Audience**: `sts.amazonaws.com`
     - **GitHub organization name** (e.g., `harrier-gha-runner`)
   - Add the following permissions:
     - `AmazonVPCFullAccess`
     - `AmazonEC2FullAccess`
     - `AmazonS3FullAccess`
     - `AWSLambda_FullAccess`
     - `IAMFullAccess`
     - `AmazonAPIGatewayAdministrator`
     - `AmazonEventBridgeFullAccess`
     - `AWSWAFConsoleFullAccess`
     - `SecretsManagerReadWrite`
   - **Role Name**: `setup-harrier` (required).

### Step 2: GitHub - Create a Personal Access Token

Follow [GitHub's guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) or:

1. Login to GitHub and go to **Settings > Developer settings > Tokens (classic)**.
2. Click **Generate new token (classic)** and configure:
   - **Note**: Add a descriptive name.
   - **Expiration**: Choose or set a custom date.
   - **Scopes**: Select the following:
     - `repo`
     - `workflow`
     - `admin:org`
     - `admin:org_hook`
3. Click **Generate token** and save it securely.

### Step 3: AWS - Store GitHub Token in Secrets Manager

1. Go to **Secrets Manager** in AWS and click **Store a new secret**.
2. Select **Other type of secret** > **Plaintext**.
3. Paste the GitHub token into the field.
4. Set the **Secret name**: `github/pat/harrier` (required).
5. Complete the wizard, leaving **Automatic rotation** off.

### Step 4 (Optional): GitHub - Add DockerHub Secrets

1. Navigate to your GitHub repository's **Settings > Security > Secrets and variables**.
2. Add new secrets for DockerHub credentials (e.g., `DOCKER_USER` and `DOCKER_TOKEN`).

---

## Using Harrier

### Deploying Harrier Infrastructure

Create a new GitHub Actions workflow using the **Harrier-setup** YAML and run from any repo in your GitHub Actions organization to deploy the necessary AWS resources in your AWS account.

Setup template:
(replace AWS_REGION and AWS_ACCOUNT and any other inputs with your own information)

```yml
name: Setup GitHub Actions Self-hosted Runners in your AWS

on:
  workflow_dispatch:

jobs:
  setup-harrier-runner:
    runs-on: ubuntu-22.04

    permissions:
      id-token: write
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Configure AWS Credentials for Harrier setup
        uses: aws-actions/configure-aws-credentials@v4
        with:
          audience: sts.amazonaws.com
          aws-region: <<AWS_REGION>>
          role-to-assume: arn:aws:iam::<<AWS_ACCOUNT_NUMBER>>:role/setup-harrier

      - name: Harrier Self-Hosted Runner Setup
        uses: harrier-gha-runner/harrier-self-hosted-runner@main
        with:
          region: <<AWS_REGION>>
          ghOwnerName: ${{ github.repository_owner }}
          awsAccountId: <<AWS_ACCOUNT_NUMBER>>
          instanceType: m7a.large
          cacheTtlHours: 168
          cidrBlockVPC: 10.0.0.0/16
          cidrBlockSubnet: 10.0.0.0/24
```


### Using Self-Hosted Runners

Update workflows to use Harrier’s self-hosted runners by replacing `ubuntu-22.04` or `ubuntu-latest` with `self-hosted`.

```yml
name: CI
on: push

jobs:
   build:
   - runs-on: ubuntu-22.04
   + runs-on: self-hosted
```

### Persistent Caching in Workflows

Use Harrier’s caching features to optimize workflow execution by using predefined cache keys and locations.

---

## Teardown

### Destroying Harrier Infrastructure

To remove all Harrier-related resources, run the **Harrier-cleanup** action.
Create a new GitHub Actions workflow using the **Harrier-cleanup** YAML and run from any repo in your GitHub Actions organization to destroy any Harrier-provisioned resources on your AWS account.

Cleanup template:
(replace AWS_REGION and AWS_ACCOUNT and any other inputs with your own information)

```yml
name: Cleanup Harrier (tear down) from AWS

on:
  workflow_dispatch:

jobs:
  cleanup-harrier-runner:
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Configure AWS Credentials for Harrier setup
        uses: aws-actions/configure-aws-credentials@v4
        with:
          audience: sts.amazonaws.com
          aws-region: <<AWS_REGION>>
          role-to-assume: arn:aws:iam::<<AWS_ACCOUNT_NUMBER>>:role/setup-harrier

      - name: Cleanup Harrier from AWS (tear down)
        uses: harrier-gha-runner/harrier-self-hosted-runner@main
        with:
          region: <<AWS_REGION>>
          ghOwnerName: ${{ github.repository_owner }}
          awsAccountId: <<AWS_ACCOUNT_NUMBER>>
          instanceType: m7a.large
          cleanOnly: true
```

**⚠ Warning**:  
This cleanup action permanently deletes all resources and data. Use with caution. To start fresh, you can re-run the setup process.
