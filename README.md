# Nufacturing App

## Overview

The Nufacturing App employs a comprehensive multi-environment setup to facilitate streamlined development, rigorous testing, and seamless deployment. The environments include Local, Development, Testing, Staging, and Production. This structured setup, combined with a well-defined branching strategy and continuous integration processes, ensures robust and efficient development cycles.

### Environments

#### 1. Local Environment
- **Purpose:** Provides an isolated space for developers to work on new features and fixes.
- **Setup:**
  - Local MongoDB
  - Local Node.js API
  - Local Angular App
- **Branching Strategy:** Developers create branches from each epic with the epic key ID in the branch name, ensuring organized and traceable changes.
- **Advantages:**
  - **Development Isolation:** Prevents local changes from affecting the shared development environment.
  - **Fast Iteration:** Quick testing and debugging on local machines speed up development cycles.

#### 2. Development Environment
- **Purpose:** Integrates all individual feature branches to test their interaction.
- **Setup:**
  - Development MongoDB
  - Development API
- **Branching Strategy:** Development branches in API and frontend repositories.
- **Advantages:**
  - **Integration Testing:** Ensures new code interacts correctly with the existing codebase.
  - **Continuous Integration:** Utilizes GitHub Actions for automatic deployment, ensuring prompt testing of new changes.
  - **Collaborative Development:** Shared environment helps detect integration issues early.

#### 3. Testing Environment
- **Purpose:** Runs a full suite of automated tests to catch bugs before code reaches staging or production.
- **Setup:**
  - Testing MongoDB
  - Testing API
- **Branching Strategy:** Testing branches in API and frontend repositories.
- **Advantages:**
  - **Automated Testing:** Ensures comprehensive testing to catch bugs and issues early.
  - **Quality Assurance:** QA teams perform extensive manual and exploratory testing.
  - **Stability Verification:** Tests application behavior with real-world data scenarios.

#### 4. Staging Environment
- **Purpose:** Simulates the production environment for final validation before deployment.
- **Setup:**
  - Staging MongoDB
  - Staging API
- **Branching Strategy:** Staging branches in API and frontend repositories.
- **Advantages:**
  - **Pre-Production Validation:** Ensures the application is ready for production.
  - **User Acceptance Testing (UAT):** Stakeholders and end-users validate the application.
  - **Deployment Rehearsal:** Tests the deployment process to ensure a smooth transition to production.

#### 5. Production Environment
- **Purpose:** The live environment where the application is available to end-users.
- **Setup:**
  - Production MongoDB
  - Production API
- **Branching Strategy:** Production branches in API and frontend repositories.
- **Advantages:**
  - **Live Environment:** The final environment for end-user access.
  - **Performance Monitoring:** Real-time monitoring of application performance and user activity.
  - **High Availability and Scalability:** Ensures the application can handle the required load and provides uninterrupted service.

### Overall Advantages

#### Improved Code Quality
- **Multi-Stage Testing:** Ensures code is tested at various stages, reducing the likelihood of bugs reaching production.
- **Incremental Feedback:** Provides continuous feedback, helping in early issue identification and resolution.

#### Streamlined Deployment Process
- **Automated Deployments:** GitHub Actions ensure consistent and repeatable deployments, minimizing manual errors.
- **Controlled Rollouts:** Each environment serves as a checkpoint, ensuring only thoroughly tested code reaches production.

#### Enhanced Collaboration
- **Clear Workflow:** Jira integration and branching strategy provide clear visibility into the progress of each feature and bug fix.
- **Shared Knowledge:** Developers can see the work of their peers, leading to better collaboration and knowledge sharing.

#### Risk Mitigation
- **Environment Segregation:** Issues in one environment do not affect others, reducing the risk of widespread problems.
- **Safe Rollback:** Allows rolling back to previous stable versions if issues are detected in production.

#### Better Resource Management
- **Optimized Use of Resources:** Environments like staging and testing help in optimizing resource allocation and ensuring efficient use of infrastructure.

### Workflow Diagram
![Workflow Diagram][def]

### Summary

By maintaining these five environments, Gallimore Software ensures a robust, reliable, and efficient development and deployment process for the Nufacturing app. This approach leads to higher quality software and improved user satisfaction, aligning with our goals of delivering innovative and customer-centric solutions.


[def]: ./docs/workflow.png