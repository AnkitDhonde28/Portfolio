const webRequestJourney = {
    id: "what-happens-when-you-open-a-website",

    title: "What Actually Happens When You Open a Website?",

    category: "Cloud & DevOps",

    date: "October 2026",

    readTime: "10 min read",

    technologies: [
        "DNS",
        "HTTP",
        "TCP",
        "TLS",
        "Nginx",
        "Load Balancer",
        "Networking",
    ],

    description:
        "A practical journey through what happens after you enter a URL, from DNS resolution and TCP/TLS connections to load balancers, reverse proxies, application servers, databases, and the final response.",

    sections: [
        {
            id: "overview",
            title: "The Journey Begins",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "You type https://example.com into your browser, press Enter, and a webpage appears a moment later. It feels simple, but behind that single action is a chain of systems communicating with each other.",
                },

                {
                    type: "paragraph",
                    text: "For someone learning DevOps, understanding this journey is more useful than simply memorizing individual tools. Once you understand how a request travels through infrastructure, troubleshooting becomes much easier.",
                },

                {
                    type: "architecture",
                    image: "/learning/web-request-journey.png",
                    alt: "Web request journey from browser through DNS, load balancer, reverse proxy, application and database",
                    caption:
                        "A simplified view of the journey from a user's browser to the backend application and database.",
                },

                {
                    type: "info",
                    variant: "concept",
                    title: "The Mental Model",
                    text: "When troubleshooting a web application, think about the request as a journey. Find where the request stopped working instead of immediately trying to restart everything.",
                },
            ],
        },

        {
            id: "dns",
            title: "DNS Resolution",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The first problem the browser needs to solve is simple: where is example.com? Humans use domain names, while network communication eventually needs an IP address.",
                },

                {
                    type: "architecture",
                    image: "/learning/dns-resolution.png",
                    alt: "DNS resolution from browser to DNS resolver and IP address",
                    caption:
                        "DNS translates a domain name into an address that the client can use to reach the destination.",
                },

                {
                    type: "list",
                    items: [
                        "The browser needs the IP address associated with the domain.",
                        "The operating system and browser may already have a cached result.",
                        "If a cached result is unavailable, a DNS resolver is queried.",
                        "The resolver obtains the required DNS information.",
                        "The client can then attempt to connect to the destination.",
                    ],
                },

                {
                    type: "code",
                    language: "bash",
                    title: "Inspect DNS resolution",
                    code: `nslookup example.com`,
                },

                {
                    type: "info",
                    variant: "tip",
                    title: "Troubleshooting Question",
                    text: "If the domain does not resolve, there is little value in debugging Nginx or the application yet. Start at the layer where the request is actually failing.",
                },
            ],
        },

        {
            id: "tcp",
            title: "TCP Connection",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Once the destination address is known, the client needs a network connection. For traditional HTTP/HTTPS connections using TCP, the client and server establish a connection through the TCP handshake.",
                },

                {
                    type: "architecture",
                    image: "/learning/tcp-handshake.png",
                    alt: "TCP three way handshake showing SYN SYN-ACK and ACK",
                    caption:
                        "A simplified TCP three-way handshake between the client and server.",
                },

                {
                    type: "list",
                    items: [
                        "Client sends SYN.",
                        "Server responds with SYN-ACK.",
                        "Client sends ACK.",
                        "The TCP connection is established.",
                    ],
                },

                {
                    type: "paragraph",
                    text: "This is one reason networking fundamentals matter in DevOps. An application can be perfectly healthy while a network rule, firewall, security group, or routing problem prevents clients from reaching it.",
                },
            ],
        },

        {
            id: "tls",
            title: "TLS Handshake",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Because the URL uses HTTPS, the connection also needs to be secured with TLS. The client and server negotiate cryptographic parameters and establish the secure connection used for encrypted HTTP traffic.",
                },

                {
                    type: "architecture",
                    image: "/learning/tls-handshake.png",
                    alt: "Simplified TLS handshake between browser and server",
                    caption:
                        "HTTPS adds TLS to the network connection so HTTP traffic can be exchanged securely.",
                },

                {
                    type: "list",
                    items: [
                        "The client connects to the HTTPS endpoint.",
                        "The server presents its certificate.",
                        "The client validates the certificate and negotiates cryptographic parameters.",
                        "Both sides establish keys for the secure session.",
                        "Encrypted HTTP communication can begin.",
                    ],
                },

                {
                    type: "info",
                    variant: "warning",
                    title: "Common Failure Point",
                    text: "An expired, invalid, or incorrectly configured certificate can prevent a secure connection even when the underlying server is running.",
                },
            ],
        },

        {
            id: "http-request",
            title: "The HTTP Request",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "After the secure connection is established, the browser can send an HTTP request. The request contains information such as the HTTP method, requested path, host, and additional headers.",
                },

                {
                    type: "code",
                    language: "http",
                    title: "Simplified HTTP request",
                    code: `GET / HTTP/1.1
Host: example.com
User-Agent: Browser
Accept: text/html`,
                },

                {
                    type: "paragraph",
                    text: "This request now needs to travel through the production architecture until it reaches the component responsible for generating the response.",
                },
            ],
        },

        {
            id: "production-architecture",
            title: "The Production Request Path",
            type: "group",
        },

        {
            id: "load-balancer",
            title: "Load Balancer",
            parent: "production-architecture",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "In a production environment, the request may first reach a load balancer. Instead of sending every request to one server, the load balancer can distribute traffic across multiple backend instances.",
                },

                {
                    type: "architecture",
                    image: "/learning/load-balancer.png",
                    alt: "Load balancer distributing traffic across multiple application servers",
                    caption:
                        "A load balancer distributes incoming requests across available backend instances.",
                },

                {
                    type: "list",
                    items: [
                        "Receives incoming client traffic.",
                        "Routes requests to backend instances.",
                        "Performs or uses health checks depending on the architecture.",
                        "Can help distribute traffic across multiple servers.",
                        "Can provide another layer for TLS termination and routing.",
                    ],
                },

                {
                    type: "info",
                    variant: "concept",
                    title: "Why This Matters",
                    text: "If a load balancer reports that a backend is unhealthy, the investigation can move from the public endpoint toward the specific backend instance instead of treating the entire system as one black box.",
                },
            ],
        },

        {
            id: "reverse-proxy",
            title: "Reverse Proxy with Nginx",
            parent: "production-architecture",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Nginx can act as a reverse proxy between the public endpoint and an internal application. The client can communicate with HTTPS on a public port while Nginx forwards the request to the application on an internal port.",
                },

                {
                    type: "architecture",
                    image: "/learning/nginx-reverse-proxy.png",
                    alt: "Nginx reverse proxy forwarding HTTPS traffic to an application server",
                    caption:
                        "Nginx receives the public request and forwards it to an internal application process.",
                },

                {
                    type: "code",
                    language: "nginx",
                    title: "Simplified reverse proxy",
                    code: `server {
    listen 443 ssl;

    location / {
        proxy_pass http://localhost:3000;
    }
}`,
                },

                {
                    type: "info",
                    variant: "tip",
                    title: "Useful Test",
                    text: "If Nginx is returning a 502 response, test the upstream application directly. A command such as curl http://localhost:3000 can help determine whether the application is responding locally.",
                },
            ],
        },

        {
            id: "application-server",
            title: "Application Server",
            parent: "production-architecture",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The application server receives the request and executes the business logic required to generate a response. Depending on the application, this may involve authentication, validation, calculations, external APIs, caching, or database queries.",
                },

                {
                    type: "code",
                    language: "javascript",
                    title: "Example application route",
                    code: `app.get("/users", async (req, res) => {
    const users = await getUsers();
    res.json(users);
});`,
                },

                {
                    type: "paragraph",
                    text: "The application is often where infrastructure and software engineering meet. A server can be healthy while the application itself is returning errors or waiting on a dependency.",
                },
            ],
        },

        {
            id: "database",
            title: "Database Communication",
            parent: "production-architecture",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Many application requests require data that is stored outside the application process. The application therefore communicates with a database or another backend service.",
                },

                {
                    type: "code",
                    language: "sql",
                    title: "Example database query",
                    code: `SELECT *
FROM users;`,
                },

                {
                    type: "architecture",
                    image: "/learning/application-database.png",
                    alt: "Application server communicating with a database",
                    caption:
                        "The application can depend on the database to retrieve or persist information required for a request.",
                },

                {
                    type: "info",
                    variant: "warning",
                    title: "Dependency Failure",
                    text: "A database can be available while the application is still unhealthy. Connection limits, authentication errors, slow queries, network problems, or exhausted resources can all affect application behavior.",
                },
            ],
        },

        {
            id: "response",
            title: "How the Response Travels Back",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "After the application has generated the response, the data travels back through the infrastructure toward the client. The exact path depends on the architecture, but the same layers may be involved in reverse.",
                },

                {
                    type: "architecture",
                    image: "/learning/web-response-path.png",
                    alt: "HTTP response traveling from application back to browser",
                    caption:
                        "The response travels from the application through the infrastructure and back to the browser.",
                },

                {
                    type: "list",
                    items: [
                        "Database returns required data to the application.",
                        "Application processes the result.",
                        "Application generates HTML, JSON, or another response.",
                        "Reverse proxy forwards the response.",
                        "Load balancer returns the response toward the client.",
                        "Browser receives and processes the response.",
                    ],
                },

                {
                    type: "paragraph",
                    text: "The browser may then make additional requests for JavaScript, CSS, images, fonts, API calls, and other resources required to render the page.",
                },
            ],
        },

        {
            id: "where-things-fail",
            title: "Where Things Can Fail",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "The most useful part of understanding the request journey is being able to use it as a troubleshooting map. A user may only report that the website is not working, but the actual failure could be at several different layers.",
                },

                {
                    type: "architecture",
                    image: "/learning/web-troubleshooting-map.png",
                    alt: "Troubleshooting map for a web request from DNS to database",
                    caption:
                        "A troubleshooting map that follows the request through each major infrastructure layer.",
                },

                {
                    type: "list",
                    items: [
                        "DNS → The domain does not resolve.",
                        "TLS → Certificate or secure connection problems.",
                        "Network → Routing, firewall, or security rules prevent connectivity.",
                        "Load Balancer → Backend health checks fail.",
                        "Nginx → Reverse proxy or upstream configuration problems.",
                        "Application → The service returns HTTP 5xx errors or fails to start.",
                        "Database → Connection, authentication, query, or resource problems.",
                    ],
                },

                {
                    type: "info",
                    variant: "concept",
                    title: "The Key Question",
                    text: "Instead of asking only 'How do I fix the website?', ask 'Where did the request stop working?' That question gives you a direction for the investigation.",
                },
            ],
        },

        {
            id: "debugging-example",
            title: "Example: Investigating a 502 Error",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Imagine the browser receives a 502 Bad Gateway response. A 502 does not automatically mean the entire server is down. It can indicate that a reverse proxy could not obtain a valid response from the upstream application.",
                },

                {
                    type: "architecture",
                    image: "/learning/502-debugging.png",
                    alt: "Troubleshooting a 502 error between Nginx and an upstream application",
                    caption:
                        "A simplified investigation of a 502 response by checking the reverse proxy and upstream application.",
                },

                {
                    type: "code",
                    language: "bash",
                    title: "Check Nginx",
                    code: `systemctl status nginx`,
                },

                {
                    type: "code",
                    language: "bash",
                    title: "Test the upstream application",
                    code: `curl http://localhost:3000`,
                },

                {
                    type: "list",
                    items: [
                        "If Nginx is down, investigate the proxy service.",
                        "If Nginx is running but the upstream is unreachable, investigate the application.",
                        "If the application responds locally, investigate the proxy configuration or networking path.",
                        "Use application and Nginx logs to identify the exact failure.",
                    ],
                },
            ],
        },

        {
            id: "running-is-not-working",
            title: "Running Does Not Mean Working",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "One of the most important lessons in infrastructure troubleshooting is that a process being alive does not necessarily mean the application is healthy.",
                },

                {
                    type: "list",
                    items: [
                        "A server can be running while its disk is full.",
                        "A container can be running while the application returns HTTP 500.",
                        "A Kubernetes Pod can be running while a dependency is unavailable.",
                        "A database can be available while queries are extremely slow.",
                        "A load balancer can be reachable while every backend is unhealthy.",
                    ],
                },

                {
                    type: "info",
                    variant: "warning",
                    title: "Think Beyond Process Status",
                    text: "Do not only ask whether a service is running. Ask whether it is actually doing what users and dependent systems expect.",
                },
            ],
        },

        {
            id: "what-i-learned",
            title: "What I Learned",
            type: "article",

            content: [
                {
                    type: "paragraph",
                    text: "Before learning DevOps, it was easy to think about a website as simply a URL that produces a webpage. Learning networking and infrastructure changed that mental model for me.",
                },

                {
                    type: "paragraph",
                    text: "A website is really a chain of systems communicating with each other. DNS provides the destination, networking establishes connectivity, TLS secures the connection, HTTP carries the request, infrastructure routes it, the application processes it, and backend services provide the data.",
                },

                {
                    type: "learningSummary",
                    title: "Key Takeaways",
                    items: [
                        "DNS translates names into addresses.",
                        "TCP provides reliable connectivity for traditional HTTP/HTTPS connections.",
                        "TLS secures HTTPS communication.",
                        "HTTP carries requests and responses.",
                        "Load balancers distribute and route traffic.",
                        "Nginx can act as a reverse proxy.",
                        "Applications often depend on databases and other services.",
                        "The request path can be used as a troubleshooting map.",
                        "Running does not always mean healthy.",
                        "Good DevOps troubleshooting starts with evidence.",
                    ],
                },

                {
                    type: "info",
                    variant: "next",
                    title: "Next Steps",
                    text: "Next I Will explain HTTP status codes, Linux networking commands, Nginx configuration, AWS networking, load balancer health checks, and how to trace a real request through a production-style environment.",
                },
            ],
        },
    ],
};

export default webRequestJourney;
