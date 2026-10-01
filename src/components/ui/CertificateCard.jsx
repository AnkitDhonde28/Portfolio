import { FaExternalLinkAlt, FaAward } from "react-icons/fa";

export default function CertificateCard({ cert }) {
    return (
        <div
            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                transition-all
                duration-500
                hover:-translate-y-3
            "
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                    "var(--theme-primary)";

                e.currentTarget.style.boxShadow =
                    "0 0 45px rgba(var(--theme-rgb), 0.20)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";

                e.currentTarget.style.boxShadow = "";
            }}
        >
            {/* Certificate Image */}

            <div className="relative overflow-hidden">
                <img
                    src={cert.image}
                    alt={cert.title}
                    className="
                        h-64
                        w-full
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-110
                    "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {cert.featured && (
                    <div
                        className="
                            absolute
                            left-5
                            top-5
                            rounded-full
                            bg-black/70
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            backdrop-blur-md
                        "
                        style={{
                            color: "var(--theme-primary)",
                            border:
                                "1px solid var(--theme-primary)",
                        }}
                    >
                        ⭐ AWS CERTIFIED
                    </div>
                )}
            </div>

            {/* Content */}

            <div className="p-7">
                <div className="flex items-center gap-3">
                    <FaAward
                        className="text-2xl"
                        style={{
                            color: "var(--theme-primary)",
                        }}
                    />

                    <div>
                        <h3 className="text-xl font-bold text-white">
                            {cert.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                            {cert.issuer}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <span
                        className="rounded-full px-4 py-2 text-sm"
                        style={{
                            backgroundColor:
                                "rgba(var(--theme-rgb), 0.10)",
                            color:
                                "var(--theme-primary)",
                        }}
                    >
                        {cert.year}
                    </span>

                    <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
                        Verified
                    </span>
                </div>

                {/* Skills */}

                <div className="mt-6 flex flex-wrap gap-2">
                    {cert.skills?.map((skill) => (
                        <span
                            key={skill}
                            className="
                                rounded-full
                                border
                                px-3
                                py-1
                                text-xs
                                transition-all
                                duration-300
                            "
                            style={{
                                borderColor:
                                    "rgba(var(--theme-rgb), 0.20)",
                                backgroundColor:
                                    "rgba(var(--theme-rgb), 0.10)",
                                color:
                                    "var(--theme-primary)",
                            }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Button */}

                <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                        mt-8
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-5
                        py-3
                        font-semibold
                        text-slate-950
                        transition-all
                        duration-300
                        hover:-translate-y-1
                    "
                    style={{
                        backgroundColor:
                            "var(--theme-primary)",
                        boxShadow:
                            "0 0 20px rgba(var(--theme-rgb), 0.20)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 0 30px rgba(var(--theme-rgb), 0.35)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 0 20px rgba(var(--theme-rgb), 0.20)";
                    }}
                >
                    Verify Credential

                    <FaExternalLinkAlt />
                </a>
            </div>
        </div>
    );
}