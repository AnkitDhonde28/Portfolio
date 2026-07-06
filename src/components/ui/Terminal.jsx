import { useEffect, useState } from "react";

const lines = [
    "$ aws sts get-caller-identity",
    "✔ Authenticated Successfully",
    "",
    "$ terraform plan",
    "✔ 5 resources to create",
    "",
    "$ terraform apply",
    "✔ Infrastructure deployed",
    "",
    "$ kubectl get pods",
    "frontend      Running",
    "backend       Running",
    "mysql         Running",
    "",
    "$ docker ps",
    "portfolio-app Running",
    "",
    "$ git push origin main",
    "✔ GitHub Actions triggered",
];

export default function Terminal() {
    const [visibleLines, setVisibleLines] = useState([]);

    useEffect(() => {
        const start = () => {
            let index = 0;

            setVisibleLines([]);

            const interval = setInterval(() => {
                setVisibleLines(lines.slice(0, index + 1));

                index++;

                if (index >= lines.length) {
                    clearInterval(interval);

                    setTimeout(start, 2500);
                }
            }, 350);
        };

        start();
    }, []);

    return (
        <div className="
group
w-full
max-w-md
overflow-hidden
rounded-2xl
border
border-cyan-500/20
bg-slate-900
shadow-2xl
transition-all
duration-500
hover:-translate-y-2
hover:border-cyan-400
hover:shadow-[0_0_50px_rgba(34,211,238,.25)]
">

            {/* Header */}

            <div className="flex items-center gap-2 px-5 py-3 bg-slate-800">

                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                <span className="ml-3 text-xs text-slate-400">
                    terminal
                </span>

            </div>

            {/* Body */}

            <div className="p-5 font-mono text-sm min-h-[260px]">

                {visibleLines.map((line, i) => (
                    <div
                        key={i}
                        className={
                            line.startsWith("$")
                                ? "text-cyan-400"
                                : "text-green-400"
                        }
                    >
                        {line}
                    </div>
                ))}

                <span className="animate-pulse text-cyan-400">
                    █
                </span>

            </div>

        </div>
    );
}