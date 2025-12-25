# 🚀 AWS Serverless Java 17 Demo
**API Gateway + Lambda + DynamoDB + S3 Event + GitHub Actions (CI/CD)**

A production-ready demo project showcasing how to build a **serverless architecture on AWS** using **Java 17**, **AWS SAM**, and **GitHub Actions**.

This project is suitable for:
- Technical seminars / internal sharing
- Java backend engineers learning AWS Serverless
- Architecture demos (API-driven + event-driven)

---

## 🏗️ Architecture Overview

### API Flow
Client  
→ API Gateway (HTTP API)  
→ Lambda (Java 17)  
→ DynamoDB

### Event Flow
S3 Upload  
→ S3 Event  
→ Lambda (Java 17)

---

## ✨ Features

- Java 17 Lambda functions
- HTTP API Gateway
- DynamoDB (PAY_PER_REQUEST)
- S3 Event Trigger (ObjectCreated)
- Infrastructure as Code with AWS SAM
- CI/CD with GitHub Actions
- One-click Deploy & Destroy

---

## 🧱 Tech Stack

| Layer | Technology |
|-----|-----------|
| Language | Java 17 (Amazon Corretto) |
| Build Tool | Maven |
| Serverless | AWS SAM |
| API | API Gateway (HTTP API) |
| Compute | AWS Lambda |
| Database | DynamoDB |
| Storage | Amazon S3 |
| CI/CD | GitHub Actions |

---

## 📂 Project Structure

```
.
├── template.yaml
├── pom.xml
├── src/main/java
│   └── com/lucas/demoawsserverless
│       ├── HelloApiHandler.java
│       └── S3EventHandler.java
├── .github/workflows
│   ├── deploy.yml
│   └── destroy.yml
└── README.md
```

---

## ⚙️ Lambda Functions

### 1. HelloApiFunction (API → DynamoDB)

- **Endpoint:** `POST /hello`
- **Trigger:** API Gateway (HTTP API)
- **Behavior:**
    - Generate UUID
    - Save request payload to DynamoDB

**Sample Response**
```json
{
  "id": "uuid",
  "status": "SAVED",
  "table": "demo-hello-table"
}
```

---

### 2. S3EventFunction (S3 Event Handler)

- **Trigger:** `s3:ObjectCreated:*`
- **Behavior:**
    - Log uploaded file information
    - Bucket name
    - Object key
    - File size

---

## 🚀 Deployment (CI/CD)

See GitHub Actions workflows:
- Deploy AWS SAM Stack
- Destroy AWS SAM Stack

---

## 👤 Author

Lucas  
Solution Architect  
AWS & Cloud Enthusiast ☁️
