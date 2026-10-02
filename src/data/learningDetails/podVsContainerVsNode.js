const podVsContainerVsNode = {
    id: "pod-vs-container-vs-node",

    title: "Pod vs Container vs Node — Explained Visually",

    category: "Cloud & DevOps",

    date: "October 2026",

    readTime: "8 min read",

    technologies: [
        "Kubernetes",
        "Docker",
        "Pods",
        "Nodes",
        "Containers",
    ],

    description:
        "A beginner-friendly visual guide to understanding containers, Pods, Nodes, and how they fit together inside a Kubernetes cluster.",

    sections: [
        {
            id: "why-is-this-confusing",
            title: "Why Is This Confusing?",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "When you start learning Kubernetes, three words appear everywhere: Container, Pod, and Node. They are connected, but they are not the same thing.",
                },
                {
                    type: "paragraph",
                    text: "The easiest way to understand them is to start with the application and move upward, one layer at a time.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/pod-vs-container-vs-node.png",
                    alt: "Simple diagram showing the relationship between a Kubernetes cluster, node, pod, container and application",
                    caption:
                        "The simple relationship: a container runs the application, a Pod groups containers, and a Node runs Pods.",
                },
                {
                    type: "info",
                    variant: "concept",
                    title: "The simple picture",
                    text: "Think of it as: Cluster → Node → Pod → Container → Application.",
                },
            ],
        },

        {
            id: "container",
            title: "What Is a Container?",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "A container is a small, isolated environment where your application runs. It packages the application together with the files and dependencies it needs.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/container.png",
                    alt: "Simple illustration of a container running an application",
                    caption:
                        "A container gives an application a consistent environment to run in.",
                },
                {
                    type: "paragraph",
                    text: "For example, a Node.js application can be packaged into a Docker image and then started as a container.",
                },
                {
                    type: "code",
                    language: "bash",
                    title: "Start a container",
                    code: `docker run my-app`,
                },
                {
                    type: "info",
                    variant: "tip",
                    title: "Remember",
                    text: "Container = the place where your application runs.",
                },
            ],
        },

        {
            id: "pod",
            title: "What Is a Pod?",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "Kubernetes uses a Pod as its smallest unit for running an application. A Pod contains one or more containers.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/pod.png",
                    alt: "Simple illustration of a Kubernetes Pod containing a container",
                    caption:
                        "A Pod is the Kubernetes unit that contains one or more containers.",
                },
                {
                    type: "paragraph",
                    text: "Most of the time, you will see one main application container inside a Pod. Sometimes two or more closely related containers share the same Pod.",
                },
                {
                    type: "list",
                    items: [
                        "A Pod can contain one or more containers.",
                        "Containers in the same Pod share networking.",
                        "Kubernetes schedules Pods onto Nodes.",
                        "Pods are created and managed by Kubernetes.",
                    ],
                },
                {
                    type: "info",
                    variant: "concept",
                    title: "Remember",
                    text: "Pod = a small unit that contains one or more containers.",
                },
            ],
        },

        {
            id: "node",
            title: "What Is a Node?",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "A Node is the machine where Kubernetes runs Pods. It can be a virtual machine or a physical server.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/node.png",
                    alt: "Simple illustration of a Kubernetes Node running multiple Pods",
                    caption:
                        "A Node is a machine that provides the resources needed to run Pods.",
                },
                {
                    type: "paragraph",
                    text: "One Node can run multiple Pods, depending on the resources available and the way Kubernetes schedules the workloads.",
                },
                {
                    type: "code",
                    language: "bash",
                    title: "See Kubernetes Nodes",
                    code: `kubectl get nodes`,
                },
                {
                    type: "info",
                    variant: "tip",
                    title: "Remember",
                    text: "Node = the machine where Pods run.",
                },
            ],
        },

        {
            id: "how-they-work-together",
            title: "How They Work Together",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "Now put the three pieces together. Your application runs inside a container. Kubernetes places that container inside a Pod. The Pod runs on a Node.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/cluster.png",
                    alt: "Kubernetes cluster showing multiple Nodes, Pods and containers",
                    caption:
                        "A Kubernetes cluster can have multiple Nodes, and each Node can run multiple Pods.",
                },
                {
                    type: "list",
                    items: [
                        "Container → runs the application.",
                        "Pod → contains the container.",
                        "Node → runs the Pod.",
                        "Cluster → contains and manages the Nodes.",
                    ],
                },
                {
                    type: "info",
                    variant: "concept",
                    title: "The mental model",
                    text: "Cluster → Node → Pod → Container → Application.",
                },
            ],
        },

        {
            id: "real-example",
            title: "A Real Example",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "Imagine you have an online shopping API. You package the API into a Docker container and run it through Kubernetes.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/Realcluster.png",
                    alt: "Example Kubernetes setup with shopping application containers running in Pods on Nodes",
                    caption:
                        "The same idea can be used for a real application such as an online shopping API.",
                },
                {
                    type: "paragraph",
                    text: "The application is inside the container. The container is inside the Pod. The Pod is running on a Node. Several Nodes together make the Kubernetes cluster.",
                },
                {
                    type: "code",
                    language: "bash",
                    title: "See the Pods",
                    code: `kubectl get pods -o wide`,
                },
            ],
        },

        {
            id: "pod-failure",
            title: "What Happens When a Pod Dies?",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "Imagine your application is running in three Pods and one Pod stops working.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/pod-failure.png",
                    alt: "Kubernetes replacing a failed Pod with a new Pod",
                    caption:
                        "When a managed Pod fails, Kubernetes can create a replacement to reach the desired number of replicas.",
                },
                {
                    type: "paragraph",
                    text: "If the application is managed by something such as a Deployment and the desired number of replicas is three, Kubernetes can create another Pod to replace the missing one.",
                },
                {
                    type: "list",
                    items: [
                        "One Pod fails.",
                        "Kubernetes notices the difference between the desired and current state.",
                        "A replacement Pod is created.",
                        "The application returns to the desired number of replicas.",
                    ],
                },
                {
                    type: "info",
                    variant: "concept",
                    title: "Why this matters",
                    text: "You do not normally need to manually create a replacement every time a managed Pod fails.",
                },
            ],
        },

        {
            id: "node-failure",
            title: "What Happens When a Node Dies?",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "A Node failure is a bigger problem because every Pod running on that Node is affected.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/node-failure.png",
                    alt: "Kubernetes responding to a failed Node by creating replacement Pods on healthy Nodes",
                    caption:
                        "If a Node fails, Kubernetes can recreate managed workloads on healthy Nodes when the cluster has enough capacity.",
                },
                {
                    type: "paragraph",
                    text: "If other healthy Nodes have enough resources, Kubernetes can place replacement Pods there. This is one reason production clusters commonly use more than one Node.",
                },
                {
                    type: "info",
                    variant: "warning",
                    title: "Important",
                    text: "A single Node is a single point of failure for the Pods running on it. Multiple Nodes give the cluster more room to recover from a Node failure.",
                },
            ],
        },

        {
            id: "scaling",
            title: "How Scaling Works",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "When more users arrive, an application may need more copies of its Pods. Kubernetes can increase the number of Pods for a workload.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/Scalcluster.png",
                    alt: "Multiple Kubernetes Pods spread across Nodes for application scaling",
                    caption:
                        "More Pods can be spread across available Nodes. If there is not enough capacity, more Nodes may be needed.",
                },
                {
                    type: "code",
                    language: "bash",
                    title: "Scale a Deployment",
                    code: `kubectl scale deployment shopping-api --replicas=4`,
                },
                {
                    type: "list",
                    items: [
                        "More users can mean more Pods.",
                        "Kubernetes schedules Pods on available Nodes.",
                        "If Nodes do not have enough resources, more Node capacity may be needed.",
                    ],
                },
            ],
        },

        {
            id: "simple-mental-model",
            title: "The Simple Mental Model",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "You do not need to memorize a long Kubernetes definition. Start with this simple picture.",
                },
                {
                    type: "architecture",
                    image: "/learning/pod/pod-vs.png",
                    alt: "Simple Kubernetes mental model from cluster to application",
                    caption:
                        "The easiest mental model: Cluster → Node → Pod → Container → Application.",
                },
                {
                    type: "list",
                    items: [
                        "Container → Think application.",
                        "Pod → Think Kubernetes unit.",
                        "Node → Think machine.",
                        "Cluster → Think group of Nodes.",
                    ],
                },
                {
                    type: "learningSummary",
                    title: "Key Takeaways",
                    items: [
                        "A container runs the application.",
                        "A Pod contains one or more containers.",
                        "A Node is the machine where Pods run.",
                        "A Kubernetes cluster contains multiple Nodes.",
                        "Kubernetes manages Pods and tries to keep the desired state.",
                        "More Pods can help an application handle more traffic.",
                    ],
                },
                {
                    type: "info",
                    variant: "next",
                    title: "Next Steps",
                    text: "Once this mental model is clear, the next useful Kubernetes concepts are Deployments, ReplicaSets, Services, Ingress, scheduling, and resource requests and limits.",
                },
            ],
        },
    ],
};

export default podVsContainerVsNode;
