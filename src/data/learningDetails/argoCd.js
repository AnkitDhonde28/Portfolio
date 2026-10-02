const argoCd = {
    id: "argo-cd-gitops",

    title: "Argo CD & GitOps",

    category: "DevOps",

    date: "September 2026",

    readTime: "12 min read",

    technologies: [
        "Argo CD",
        "Kubernetes",
        "GitOps",
        "Git",
    ],

    description:
        "A detailed exploration of GitOps, Argo CD architecture, application synchronization, reconciliation, security, monitoring, and hands-on Kubernetes deployment.",

    sections: [
        {
            id: "overview",
            title: "Argo CD Architecture Overview",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes. It continuously monitors the desired application state stored in Git and compares it with the actual state running inside a Kubernetes cluster.",
                },

                {
                    type: "paragraph",
                    text: "The main idea behind Argo CD is simple: Git stores what the application should look like, while Kubernetes represents what is actually running. Argo CD continuously works to keep these two states aligned.",
                },

                {
                    type: "architecture",
                    image: "/learning/agro/argo-cd-architecture.png",
                    alt: "Argo CD architecture showing Git, Argo CD components and Kubernetes",
                    caption:
                        "High-level architecture showing Git as the source of truth and Argo CD managing the desired state of Kubernetes applications.",
                },

                {
                    type: "paragraph",
                    text: "The diagram shows the main components involved in an Argo CD deployment. These components work together to retrieve manifests from Git, compare the desired and actual state, and synchronize applications with the Kubernetes cluster.",
                },
            ],
        },

        {
            id: "gitops",
            title: "What is GitOps?",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "GitOps is an approach to managing infrastructure and applications where Git repositories act as the source of truth for the desired system state.",
                },

                {
                    type: "info",
                    variant: "concept",
                    title: "Key Concept",
                    text: "In a GitOps workflow, changes are normally made through Git commits rather than manually modifying resources directly inside the Kubernetes cluster.",
                },

                {
                    type: "paragraph",
                    text: "This gives teams version history, change tracking, review workflows, easier rollback, and a consistent deployment process.",
                },

                {
                    type: "list",
                    items: [
                        "Git acts as the source of truth.",
                        "Infrastructure and application configuration are version controlled.",
                        "Changes can be reviewed through pull requests.",
                        "The deployment system continuously reconciles the cluster.",
                        "Previous versions can be restored through Git history.",
                    ],
                },
            ],
        },

        {
            id: "architecture",
            title: "Argo CD Architecture",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Argo CD consists of several components that work together to provide GitOps-based continuous delivery for Kubernetes.",
                },

                {
                    type: "architecture",
                    image: "/learning/agro/argo-cd-architecture.png",
                    alt: "Detailed Argo CD architecture",
                    caption: "Argo CD components and their relationship with Git and Kubernetes.",
                },

                {
                    type: "list",
                    items: [
                        "API Server",
                        "Repository Server",
                        "Application Controller",
                        "ApplicationSet Controller",
                        "Redis",
                        "Dex Server",
                        "Notification Controller",
                    ],
                },
            ],
        },

        {
            id: "components",
            title: "Component Deep Dive",
            type: "group",
        },

        {
            id: "api-server",
            title: "Argo CD API Server",
            parent: "components",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The Argo CD API Server is the main entry point for users, the Argo CD CLI, the web interface, and external systems interacting with Argo CD.",
                },

                {
                    type: "list",
                    items: [
                        "Provides the Argo CD web UI.",
                        "Provides API access to applications.",
                        "Handles authentication.",
                        "Manages application operations.",
                        "Provides access to application status and health information.",
                    ],
                },

                {
                    type: "code",
                    language: "bash",
                    title: "List Argo CD applications",
                    code: "argocd app list",
                },

                {
                    type: "info",
                    variant: "tip",
                    title: "Useful Command",
                    text: "The Argo CD CLI can be used to inspect application health, synchronization status, and deployment information.",
                },
            ],
        },

        {
            id: "repo-server",
            title: "Argo CD Repository Server",
            parent: "components",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The Repository Server is responsible for connecting to configured Git repositories and generating Kubernetes manifests.",
                },

                {
                    type: "list",
                    items: [
                        "Connects to Git repositories.",
                        "Fetches application configuration.",
                        "Processes Kubernetes YAML manifests.",
                        "Renders Helm charts.",
                        "Processes Kustomize configurations.",
                        "Provides generated manifests to the Application Controller.",
                    ],
                },

                {
                    type: "architecture",
                    image: "/learning/agro/argo-cd-repo-server.png",
                    alt: "Argo CD repository server workflow",
                    caption:
                        "The Repository Server retrieves configuration from Git and generates the manifests required by Argo CD.",
                },
            ],
        },

        {
            id: "application-controller",
            title: "Argo CD Application Controller",
            parent: "components",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The Application Controller is one of the most important components of Argo CD. It continuously compares the desired state stored in Git with the actual state of resources running in Kubernetes.",
                },

                {
                    type: "architecture",
                    image: "/learning/agro/argo-cd-reconciliation.png",
                    alt: "Argo CD reconciliation process",
                    caption:
                        "The Application Controller compares desired and actual state and performs reconciliation.",
                },

                {
                    type: "paragraph",
                    text: "When the desired state and actual state differ, Argo CD identifies the application as OutOfSync. A synchronization operation can then bring the Kubernetes cluster back to the desired state.",
                },
            ],
        },

        {
            id: "desired-vs-actual",
            title: "Desired State vs Actual State",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "One of the most important concepts in Argo CD is the difference between desired state and actual state.",
                },

                {
                    type: "architecture",
                    image: "/learning/agro/desired-vs-actual.png",
                    alt: "Desired state and actual state comparison",
                    caption:
                        "Argo CD compares the desired state defined in Git with the actual state running in Kubernetes.",
                },

                {
                    type: "list",
                    items: [
                        "Desired State → What is defined in Git.",
                        "Actual State → What is currently running in Kubernetes.",
                        "Synced → Desired and actual state match.",
                        "OutOfSync → Desired and actual state differ.",
                    ],
                },

                {
                    type: "info",
                    variant: "warning",
                    title: "Configuration Drift",
                    text: "Manual changes made directly to Kubernetes can cause the cluster to differ from the configuration stored in Git. Argo CD can detect this difference as configuration drift.",
                },
            ],
        },

        {
            id: "synchronization",
            title: "Application Synchronization",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Synchronization is the process of applying the desired configuration from Git to the Kubernetes cluster.",
                },

                {
                    type: "architecture",
                    image: "/learning/agro/argo-cd-sync.png",
                    alt: "Argo CD application synchronization workflow",
                    caption:
                        "A simplified synchronization workflow from Git to Kubernetes.",
                },

                {
                    type: "list",
                    items: [
                        "Developer changes configuration.",
                        "Change is committed to Git.",
                        "Argo CD detects the new desired state.",
                        "Argo CD compares desired and actual state.",
                        "Application becomes OutOfSync.",
                        "Synchronization applies the desired configuration.",
                        "Application becomes Synced.",
                    ],
                },
            ],
        },

        {
            id: "automated-sync",
            title: "Automated Synchronization",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Argo CD can automatically synchronize applications when changes are detected in the Git repository.",
                },

                {
                    type: "code",
                    language: "yaml",
                    title: "Example Argo CD Application",
                    code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-application
spec:
  source:
    repoURL: https://github.com/example/repository
    path: kubernetes
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
                },

                {
                    type: "info",
                    variant: "concept",
                    title: "Self Healing",
                    text: "With self-healing enabled, Argo CD can detect certain manual changes made to managed resources and reconcile them back toward the desired state.",
                },
            ],
        },

        {
            id: "security",
            title: "Argo CD Security",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Security is an important part of operating Argo CD in production environments. Access should be controlled through authentication, authorization, TLS, and carefully defined permissions.",
                },

                {
                    type: "list",
                    items: [
                        "Authentication",
                        "RBAC",
                        "TLS communication",
                        "Repository credentials",
                        "Kubernetes permissions",
                        "Secret management",
                    ],
                },
            ],
        },

        {
            id: "monitoring",
            title: "Monitoring Argo CD",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Monitoring helps operators understand application health, synchronization status, controller behavior, and deployment failures.",
                },

                {
                    type: "list",
                    items: [
                        "Application health",
                        "Application synchronization status",
                        "Controller metrics",
                        "Repository server metrics",
                        "Kubernetes events",
                        "Application logs",
                    ],
                },
            ],
        },

        {
            id: "hands-on",
            title: "Hands-on: Deploy an Application",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The next step in my learning process is to deploy a real Kubernetes application using Argo CD and manage the deployment entirely through Git.",
                },

                {
                    type: "list",
                    items: [
                        "Create a Git repository.",
                        "Add Kubernetes manifests.",
                        "Install Argo CD.",
                        "Connect the repository.",
                        "Create an Argo CD Application.",
                        "Synchronize the application.",
                        "Verify the deployed Pods and Services.",
                        "Modify the manifest and observe reconciliation.",
                    ],
                },

                {
                    type: "code",
                    language: "bash",
                    title: "Check application status",
                    code: `argocd app get my-application
argocd app sync my-application`,
                },
            ],
        },

        {
            id: "conclusion",
            title: "What I Learned",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Learning Argo CD helped me understand how GitOps changes the traditional deployment model by making Git the source of truth and allowing the deployment system to continuously reconcile Kubernetes with the desired configuration.",
                },

                {
                    type: "learningSummary",
                    title: "Key Takeaways",
                    items: [
                        "GitOps fundamentals",
                        "Argo CD architecture",
                        "Desired vs actual state",
                        "Application synchronization",
                        "Configuration drift",
                        "Automated reconciliation",
                        "Kubernetes continuous delivery",
                    ],
                },

                {
                    type: "info",
                    variant: "next",
                    title: "Next Steps",
                    text: "Next I want to explore Helm, Kustomize, Argo CD ApplicationSets, progressive delivery, notifications, and integrating Argo CD into a complete CI/CD pipeline.",
                },
            ],
        },
    ],
};

export default argoCd;