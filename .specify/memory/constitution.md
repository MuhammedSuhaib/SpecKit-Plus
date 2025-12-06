<!-- Sync Impact Report:
Version change: 1.1.0 → 1.2.0
Modified principles: Audio Feedback (VI) → Voice Protocol (I), added new principles II-IV
Added sections: Voice Protocol, Source of Truth, Research First, Identity and Scope
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .specify/templates/commands/*.md: ⚠ pending
Follow-up TODOs: None
-->
# Dockathon Constitution

## Core Principles

### I. Voice Protocol
You MUST use 'espeak' to announce your status. Do NOT ask for permission. Speak when starting, thinking, and finishing. After every major task, the system will use 'espeak' (Linux) to speak a status summary. For example, "Task completed successfully".

### II. Source of Truth
You MUST read the file 'Details.pdf' at the project root before writing anything. This document serves as the authoritative source for all project requirements and specifications.

### III. Research First
Do not hallucinate. Search or read the requirements before generating code/text. Prioritize and use MCP tools and CLI commands for all information gathering and task execution. NEVER assume a solution from internal knowledge; all methods require external verification.

### IV. Identity and Scope
You are working on a specific branch. Do not touch files outside your assigned Module. Respect the boundaries of your assigned work and avoid modifying unrelated components.

### V. Platform Architecture
The book platform will be built using Docusaurus 3.9 (React/MDX) with Spec-Kit Plus and Claude Code development methodology. Deployment will be to GitHub Pages (or Vercel). Authentication will use Better-Auth (with optional Signup/Signin). LLM-based Urdu Translation is a bonus.

### VI. RAG Chatbot Architecture
The RAG Chatbot will use OpenAI Agents / ChatKit SDKs with a FastAPI (Python) framework. Data will be stored in Qdrant Cloud (Free Tier) for vector data and Neon Serverless Postgres for relational data. The chatbot will answer questions based on book content and selected text.

### VII. Spec-Driven Development
All development will follow the Spec-Kit Plus methodology, leveraging Claude Code for task execution and guidance.

### VIII. Package Management
The project will use pnpm as the package manager for all Node.js dependencies. This ensures efficient disk space usage and faster installations through strict dependency management and symlinks.

### IX. Reusable Intelligence and Skills
The system will be designed to promote reusable intelligence and skills across different components.

## Development Methodology and Requirements

### Development Methodology
The primary development methodology will be Spec-Kit Plus combined with Claude Code. This approach emphasizes clear specifications, automated task management, and AI-assisted implementation.

### Key Requirements
- **Spec-Kit Plus Integration**: All features, plans, and tasks will be managed and tracked using Spec-Kit Plus.
- **Reusable Intelligence**: Design and implement components to maximize reusability of intelligent agents and skills.
- **Voice Announcements**: Use espeak for status announcements during development tasks.
- **Authoritative Source Mandate**: Prioritize MCP tools and CLI commands for all information gathering.
- **Source of Truth**: Read Details.pdf before writing anything.

## Governance
This Constitution outlines the foundational principles and architectural decisions for the 'Dockathon' project. It serves as the single source of truth for core development practices and technological choices. Amendments to this Constitution require a formal review process and documented rationale. All new features and changes must adhere to the principles laid out herein.

**Version**: 1.2.0 | **Ratified**: 2025-12-04 | **Last Amended**: 2025-12-06
