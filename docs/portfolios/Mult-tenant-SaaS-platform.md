# Multi-Tenant Platform – Deep Technical & Product Overview

The `dcam25/multi-tenant-platform` repository is a SaaS application implementing a full-stack multi-tenant architecture with role-based access control (RBAC), real-time notifications, and modern authentication. Built with **Next.js 15** (frontend) and **FastAPI** (backend), it uses **Logto** for authentication and **Supabase** for database and real-time features. [web:14][web:1]

---

## 1. Product Vision

This platform targets SaaS businesses needing to serve multiple customers (tenants) from a single codebase while maintaining strict data isolation, user permissions, and real-time collaboration features.

**Core Principles:**
- **Single codebase, multiple tenants** – One deployment serves unlimited customers
- **Data isolation** – Tenant data never mixes via database row-level security
- **Scalable RBAC** – Fine-grained permissions across tenants and roles
- **Real-time everywhere** – Notifications and updates without page refreshes [web:14][web:17]

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | Tenant-specific routing, SSR/SSG, responsive UI |
| **Backend** | FastAPI (Python) | REST/GraphQL APIs, business logic, tenant middleware |
| **Auth** | Logto | Multi-tenant OIDC, social login, JWT tokens |
| **Database** | Supabase (Postgres) | Row-level security, real-time subscriptions |
| **Real-time** | Supabase Realtime | WebSocket notifications across tenants [web:14] |

---

## 3. Core Multi-Tenant Architecture

### 3.1 Tenant Resolution

**Subdomain-based tenancy** (most likely implementation):
