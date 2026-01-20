---
# Leave the homepage title empty to use the site title
title: ""
summary: ""
date: 2026-01-05
type: landing

design:
  # Default section spacing
  spacing: "0"

sections:
  # Developer Hero - Gradient background with name, role, social, and CTAs
  - block: dev-hero
    id: hero
    content:
      username: me
      greeting: "Hi, I'm"
      show_status: true
      show_scroll_indicator: true
      typewriter:
        enable: true
        prefix: "I build"
        strings:
          - "full-stack web apps"
          - "scalable APIs"
          - "beautiful UIs"
          - "open source tools"
        type_speed: 70
        delete_speed: 40
        pause_time: 2500
      cta_buttons:
        - text: What I do
          url: "#tech-sandbox"
          icon: arrow-down
        - text: Get In Touch
          url: "#contact"
          icon: envelope
    design:
      style: centered
      avatar_shape: circle
      animations: true
      background:
        color:
          light: "#fafafa"
          dark: "#0a0a0f"
      spacing:
        padding: ["6rem", "0", "4rem", "0"]

  # Filterable Portfolio - Alpine.js powered project filtering
  - block: portfolio
    id: tech-sandbox
    content:
      title: "Tech Sandbox"
      subtitle: "A selection of all my POCs and experiments"
      count: 0
      filters:
        folders:
          - tech-sandbox
      buttons:
        - name: All
          tag: "*"
        - name: Node.js
          tag: Node.js
        - name: TypeScript
          tag: TypeScript
        - name: React Native
          tag: ReactNative
        - name: Java
          tag: Java
        - name: AI
          tag: AI
        - name: Python
          tag: Python
        - name: DevOps
          tag: DevOps
        - name: Rust
          tag: Rust
        - name: Go
          tag: Go
      default_button_index: 0
      # Archive link auto-shown if more projects exist than 'count' above
      # archive:
      #   enable: false  # Set to false to explicitly hide
      #   text: "Browse All"  # Customize text
      #   link: "/work/"  # Custom URL
    design:
      columns: 3
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Visual Tech Stack - Icons organized by category
  - block: tech-stack
    id: skills
    content:
      title: "Tech Stack"
      subtitle: "Technologies I use to build things"
      categories:
        - name: Languages
          items:
            - name: TypeScript
              icon: devicon/typescript
            - name: Java
              icon: devicon/java
            - name: Python
              icon: devicon/python
            - name: Rust
              icon: devicon/rust
        - name: Frontend
          items:
            - name: React
              icon: devicon/react
            - name: "React Native"
              icon: devicon/react
            - name: Next.js
              icon: devicon/nextjs
            - name: Tailwind CSS
              icon: devicon/tailwindcss
        - name: Backend
          items:
            - name: Node.js
              icon: devicon/nodejs
            - name: Express
              icon: devicon/express
            - name: PostgreSQL
              icon: devicon/postgresql
            - name: Redis
              icon: devicon/redis
        - name: DevOps
          items:
            - name: Docker
              icon: devicon/docker
            - name: AWS
              icon: devicon/amazonwebservices-wordmark
            - name: GitHub Actions
              icon: brands/github
            - name: Vercel
              icon: devicon/vercel
    design:
      style: grid
      show_levels: false
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Experience Timeline
  - block: resume-experience
    id: experience
    design:
      columns: "1"
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Recent Blog Posts
  - block: collection
    id: blog
    content:
      title: Recent Posts
      subtitle: "Thoughts on web development, tech, and more"
      text: ""
      filters:
        folders:
          - blog
        exclude_featured: false
      count: 3
      order: desc
    design:
      view: card
      columns: 3
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Contact Section
  - block: contact-info
    id: contact
    content:
      title: Get In Touch
      subtitle: "Let's build something amazing together"
      text: |-
        I'm always interested in hearing about new projects and opportunities.
        Whether you're looking to hire, collaborate, or just want to say hi, feel free to reach out!
      email: hi@leonardosalles.com
      autolink: true
    design:
      columns: "1"
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # CTA Card
  - block: cta-card
    content:
      title: "More about me"
      text: |-
        If you want to take a better look at my professional background, check out my resume.

        Let's connect and discuss how I can help your team.
      button:
        text: "Download Resume"
        url: uploads/resume.pdf
        new_tab: true
    design:
      card:
        # Light mode: soft pastel theme gradient | Dark mode: rich deep gradient
        css_class: "bg-gradient-to-br from-primary-200 via-primary-100 to-secondary-200 dark:from-primary-600 dark:via-primary-700 dark:to-secondary-700"
        text_color: dark
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["4rem", "0", "6rem", "0"]
---
