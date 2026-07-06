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
      hover:border-cyan-400
      hover:shadow-[0_0_45px_rgba(34,211,238,.2)]
      "
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
                    <div className="
absolute
left-5
top-5
rounded-full
bg-black/70
backdrop-blur-md
px-4
py-2
text-xs
font-semibold
text-cyan-300
border
border-cyan-400
">
                        ⭐ AWS CERTIFIED
                    </div>
                )}

            </div>

            {/* Content */}

            <div className="p-7">

                <div className="flex items-center gap-3">

                    <FaAward className="text-2xl text-cyan-400" />

                    <div>

                        <h3 className="text-xl font-bold">
                            {cert.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                            {cert.issuer}
                        </p>

                    </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                    <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
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
              border-cyan-500/20
              bg-cyan-500/10
              px-3
              py-1
              text-xs
              text-cyan-300
              "
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
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          px-5
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_0_30px_rgba(34,211,238,.35)]
          "
                >
                    Verify Credential

                    <FaExternalLinkAlt />
                </a>

            </div>
        </div>
    );
}