# Maxwell Property Intelligence

**Current Version:** v0.1.0

Smarter Investments. Powered by Intelligence.

# Contributing to Maxwell Property Intelligence

Thank you for contributing to Maxwell Property Intelligence (MPI).

This document defines the development standards used throughout the project.

---

# Development Philosophy

Build professional software.

Prioritize readability over cleverness.

Keep code modular.

Avoid duplicate code whenever possible.

Every feature should improve the project.

---

# Folder Organization

frontend/
    components/
    pages/
    css/
    js/
    images/
    icons/
    assets/

backend/
    api/
    services/
    database/
    config/

docs/

---

# Component Rules

Every UI component should have a single responsibility.

Examples:

Sidebar

Navbar

Dashboard Card

Footer

Search Bar

Do not duplicate components.

Reuse them.

---

# CSS Rules

Separate CSS by responsibility.

variables.css

layout.css

components.css

dashboard.css

responsive.css

Avoid large CSS files.

---

# JavaScript Rules

Use descriptive function names.

Avoid duplicate logic.

Keep functions small.

Comment complex logic.

---

# Git Workflow

Every completed module should be committed.

Example:

git add .
git commit -m "Build dashboard cards"
git push

---

# Commit Message Examples

Build sidebar component

Build navigation component

Create dashboard layout

Add rental analyzer

Implement AI scoring

Improve responsive layout

---

# Documentation

Whenever a major feature is completed:

Update CHANGELOG.md

Update ROADMAP.md

Update README.md if necessary.

---

# Testing Checklist

Before committing:

✔ No console errors

✔ Responsive layout works

✔ Navigation works

✔ No duplicate code

✔ Clean formatting

✔ Git status is clean

---

# Coding Standard

Readable code wins.

Simple solutions win.

Professional structure wins.

Build software that is easy to maintain.