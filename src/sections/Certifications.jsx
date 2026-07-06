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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.05),transparent_70%)]" />

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
                            <CertificateCard cert={portfolio.certifications[0]} />
                        </div>
                    </div>
                ) : (
                    /* Automatically switches to grid when you add more certificates */
                    <div className="mt-20 grid gap-8 md:grid-cols-2 grid md:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
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