import portfolio from "../data/portfolio";
import SectionTitle from "../components/common/SectionTitle";
import CertificateCard from "../components/ui/CertificateCard";

export default function Certifications() {
    return (
        <section
            id="certifications"
            className="relative overflow-hidden bg-[#020617] pt-16 pb-24"
        >
            {/* Background Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.05), transparent 70%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <SectionTitle
                    badge="Professional Certifications"
                    title="Verified"
                    highlight="Credentials"
                    subtitle="Industry-recognized certifications that validate my expertise in Cloud Computing, DevOps, Infrastructure as Code, and modern deployment practices."
                />

                {/* Show one card centered */}
                {portfolio.certifications.length === 1 ? (
                    <div className="mt-20 flex justify-center">
                        <div className="w-full max-w-md">
                            <CertificateCard
                                cert={portfolio.certifications[0]}
                            />
                        </div>
                    </div>
                ) : (
                    /* Automatically switches to grid when you add more certificates */
                    <div className="mt-20 grid items-stretch gap-10 md:grid-cols-2 xl:grid-cols-3">
                        {portfolio.certifications.map((cert) => (
                            <CertificateCard
                                key={cert.title}
                                cert={cert}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}