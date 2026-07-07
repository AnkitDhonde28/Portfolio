const portfolio = {
    name: "Ankit Dhonde",

    designation: "AWS Certified Cloud & DevOps Engineer",

    badge: "AWS Certified Solutions Architect – Associate",

    description:
        "AWS Certified Cloud & DevOps Engineer with 2+ years of experience managing production AWS infrastructure, automating deployments, and building scalable cloud-native solutions using AWS, Docker, Kubernetes, Terraform and CI/CD.",

    typing: [
        "Cloud Engineer",
        "DevOps Engineer"
    ],

    email: "ankitdhonde2015@gmail.com",

    phone: "+91 8369128209",

    location: "Mumbai, India",

    github: "https://github.com/AnkitDhonde28",

    linkedin: "https://www.linkedin.com/in/ankit-dhonde-736b82170",

    resume: "/resume.pdf",

    stats: [
        {
            value:2,
            suffix:"+",
            title: "Years Experience",
        },
        {
            value: 10,
            suffix:"+",
            title: "Projects",
        },
        {
            value: 5,
            suffix:"+",
            title: "Certificates",
        },
        {
            value: "AWS",
            title: "Certified",
        },
    ],

    about: {
        title: "Who I Am",

        description:
            "AWS Certified Cloud & DevOps Engineer with 2+ years of experience building scalable cloud infrastructure, automating deployment workflows, and delivering reliable CI/CD pipelines. I specialize in AWS, Docker, Kubernetes, Terraform, Linux, and GitHub Actions, with a strong passion for Infrastructure as Code and cloud automation. My goal is to build secure, highly available, and efficient systems that simplify deployments, improve reliability, and enable teams to deliver software faste",

        highlights: [
            "AWS Cloud",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Linux",
            "CI/CD Pipelines",
            "CloudFormation",
            "GitHub Actions",
        ],

        cards: [
            {
                title: "Experience",
                value: "2+ Years",
            },
            {
                title: "Location",
                value: "Mumbai, India",
            },
            {
                title: "Certification",
                value: "AWS Certified",
            },
            {
                title: "Status",
                value: "Open to Work",
            },
        ],
    },

    experience: [
        {
            company: "Dusane Infotech",
            role: "Technical Engineer",
            duration: "Nov 2022 – Jul 2025",
            location: "Mumbai, India",

            achievements: [
                "Designed and managed production AWS infrastructure (EC2, IAM, VPC, Route53, S3, CloudWatch).",
                "Reduced infrastructure provisioning time by 50% using Terraform and CloudFormation.",
                "Built Docker containers and Kubernetes deployments for production applications.",
                "Developed AWS Lambda functions and Bash scripts to automate operational tasks.",
                "Implemented MySQL automated backup strategy saving 15+ hours every month.",
                "Managed Red Hat Enterprise Linux servers and production environments.",
                "Integrated CI/CD pipelines using GitHub and Jenkins.",
                "Improved monitoring using CloudWatch and automated alerting.",
            ],

            technologies: [
                "AWS",
                "Terraform",
                "Docker",
                "Kubernetes",
                "Lambda",
                "Jenkins",
                "Linux",
                "CloudWatch",
            ],
        },
    ],

    skills: [
        {
            category: "Cloud",
            icon: "☁️",
            technologies: [
                "AWS",
                "EC2",
                "IAM",
                "VPC",
                "S3",
                "Lambda",
                "Route53",
                "CloudWatch",
            ],
        },

        {
            category: "DevOps",
            icon: "🚀",
            technologies: [
                "Docker",
                "Kubernetes",
                "Terraform",
                "CloudFormation",
                "Jenkins",
                "GitHub Actions",
                "Ansible",
                "Linux",
            ],
        },

        {
            category: "Backend",
            icon: "💻",
            technologies: [
                "Go",
                "Node.js",
                "Python",
                "REST APIs",
                "Bash",
            ],
        },

        {
            category: "Database",
            icon: "🗄️",
            technologies: [
                "MySQL",
                "SQL",
                "DynamoDB",
            ],
        },
    ],

    projects: [


        {
            id: 1,

            featured: true,

            title: "AI Trading Analysis Platform",

            category: "Cloud + AI",

            image: "/projects/trading.png",

            github: "https://github.com/AnkitDhonde28/alpha-trading-platform",

            demo: "https://alphasignalai.vercel.app/",

            overview:
                "AI powered crypto market analysis platform using Smart Money Concepts and Binance API.",

            problem:
                "Manual crypto market analysis takes time and requires monitoring multiple indicators.",

            solution:
                "Developed an AI-driven dashboard that combines technical indicators, Smart Money Concepts, and TradingView integration into one interface.",

            result:
                "Reduced manual analysis time and provided instant BUY / SELL recommendations.",

            architecture: [
                "React Frontend",
                "Node Backend",
                "Binance API",
                "TradingView",
                "Express"
            ],

            technologies: [
                "React",
                "Node",
                "Docker",
                "AWS"
            ],

            metrics: [
                "Real-time Market Data",
                "AI Recommendation",
                "Multi Timeframe",
                "Technical Indicators"
            ]
        },

        {
            id: 2,

            featured: true,

            title: "Kubernetes Three Tier Application",

            category: "Cloud Infrastructure",

            image: "/projects/kubernetes.png",

            github: "#",

            demo: "#",

            overview:
                "Production-ready three-tier application deployed on Kubernetes using Docker containers, AWS infrastructure, and Terraform automation.",

            problem:
                "Deploying and managing multi-tier applications manually is time-consuming and difficult to scale across environments.",

            solution:
                "Containerized the application with Docker, deployed it using Kubernetes, and automated infrastructure provisioning with Terraform for scalable and reliable deployments.",

            result:
                "Achieved a scalable, highly available deployment with simplified infrastructure management and automated application deployment.",

            architecture: [
                "React Frontend",
                "Node.js Backend",
                "MySQL Database",
                "Docker Containers",
                "Kubernetes Cluster",
                "AWS Infrastructure",
            ],

            technologies: [
                "Docker",
                "Kubernetes",
                "AWS",
                "Terraform",
                "Linux",
                "Nginx",
            ],

            metrics: [
                "3-Tier Architecture",
                "Containerized Deployment",
                "Infrastructure as Code",
                "High Availability",
                "Load Balancing",
                "Auto Scaling Ready",
            ],
        },

        {
            id: 3,

            featured: true,

            title: "Portfolio Deployment",

            category: "DevOps",

            image: "/projects/portfolio.png",

            github: "#",

            demo: "#",

            overview:
                "A modern React portfolio deployed using Docker, GitHub Actions CI/CD, and AWS EC2 with automated deployment workflows.",

            problem:
                "Manual deployment after every code update was inefficient and prone to errors.",

            solution:
                "Implemented Docker-based deployment with GitHub Actions to automate build, testing, and deployment directly to AWS EC2.",

            result:
                "Enabled one-click automated deployment, reduced manual effort, and ensured consistent production releases.",

            architecture: [
                "React",
                "Docker",
                "GitHub Actions",
                "AWS EC2",
                "Nginx",
            ],

            technologies: [
                "React",
                "Docker",
                "AWS EC2",
                "GitHub Actions",
                "Nginx",
                "Linux",
            ],

            metrics: [
                "CI/CD Pipeline",
                "Dockerized",
                "AWS Deployment",
                "Zero Downtime Deployment",
                "Automated Build",
                "Production Ready",
            ],
        },

        {
            id: 4,

            featured: false,

            title: "Sahyadri Palace Hotel Website",

            category: "Frontend Development",

            image: "/projects/hotel.png",

            github: "https://github.com/NishitaW27/hotel-website",

            demo: "https://sahyadari-palace.vercel.app/",

            overview:
                "A responsive hotel website developed to showcase rooms, amenities, and enable customers to make booking inquiries directly through WhatsApp.",

            problem:
                "The hotel lacked a professional online presence and relied on manual booking inquiries, making it difficult for customers to explore services.",

            solution:
                "Designed and developed a modern responsive website with room galleries, hotel information, Google Maps integration, and WhatsApp booking functionality.",

            result:
                "Improved the hotel's online visibility, simplified customer inquiries, and delivered a mobile-friendly booking experience.",

            architecture: [
                "React Frontend",
                "Responsive UI",
                "EmailJS",
                "WhatsApp Integration",
                "Vercel Deployment",
            ],

            technologies: [
                "React",
                "Tailwind CSS",
                "JavaScript",
                "EmailJS",
                "Vercel",
            ],

            metrics: [
                "Responsive Design",
                "WhatsApp Booking",
                "Google Maps Integration",
                "SEO Friendly",
                "Fast Loading",
                "Cross Browser Compatible",
            ],
        }

    ],

    certifications: [
        {
            title: "AWS Solutions Architect – Associate",
            issuer: "Amazon Web Services",
            year: "2025",
            image: "/certificates/aws-sa.png",
            link: "https://cp.certmetrics.com/amazon/en/public/verify/credential/861add536b0243bf830267e573a64461",
            featured: true,
        },

        {
            title: "AWS Technical Essentials",
            issuer: "Amazon Web Services",
            year: "2025",
            image: "/certificates/aws-tech.png",
            link: "https://www.credly.com/badges/25f6c455-7cf6-4952-acdd-5106ef51e94d/linked_in_profile",
        },

        {
            title: "Terraform & Ansible",
            issuer: "CloudDevOpsHub",
            year: "2025",
            image: "/certificates/terraform.png",
            link: "https://www.clouddevopshub.com/verify-certificate?serialno=PLUFLXBC",
        },

        {
            title: "RHCSA",
            issuer: "Red Hat",
            year: "2025",
            image: "/certificates/rhcsa.png",
            link: "#",
        },
    ],

    contact: {
        title: "Let's Work Together",

        description:
            "I'm currently open to Cloud & DevOps Engineer opportunities. If you'd like to discuss a project, collaboration, or job opportunity, feel free to reach out.",

        email: "ankitdhonde2015@gmail.com",

        phone: "+91 8369128209",

        location: "Mumbai, India",

        github: "https://github.com/AnkitDhonde28",

        linkedin:
            "https://www.linkedin.com/in/ankit-dhonde-736b82170",
    },



};



export default portfolio;