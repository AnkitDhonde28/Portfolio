import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaDownload,
} from "react-icons/fa";

import SectionTitle from "../components/common/SectionTitle";
import portfolio from "../data/portfolio";

export default function Contact() {
  const contact = portfolio.contact;

  return (
    <section
      id="contact"
      className="bg-[#020617] py-28"
    >
      <div className="mx-auto max-w-4xl px-6">

        <SectionTitle
          badge="Contact"
          title="Let's"
          highlight="Connect"
          subtitle="Interested in working together? Let's build something amazing."
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

          <h2 className="text-3xl font-bold text-white">
            {contact.title}
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            {contact.description}
          </p>

          <div className="mt-10 space-y-5">

            {/* Email */}
            <div className="flex items-center gap-4">
              <FaEnvelope
                style={{
                  color: "var(--theme-primary)",
                }}
              />

              <span className="text-slate-300">
                {contact.email}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <FaPhone
                style={{
                  color: "var(--theme-primary)",
                }}
              />

              <span className="text-slate-300">
                {contact.phone}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt
                style={{
                  color: "var(--theme-primary)",
                }}
              />

              <span className="text-slate-300">
                {contact.location}
              </span>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-4">
              <FaGithub
                style={{
                  color: "var(--theme-primary)",
                }}
              />

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--theme-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                }}
              >
                GitHub
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-4">
              <FaLinkedin
                style={{
                  color: "var(--theme-primary)",
                }}
              />

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--theme-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                }}
              >
                LinkedIn
              </a>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-wrap gap-5">

            {/* Download Resume */}
            <a
              href={portfolio.resume}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-6
                py-3
                font-semibold
                text-slate-950
                transition-all
                duration-300
                hover:scale-105
              "
              style={{
                backgroundColor:
                  "var(--theme-primary)",
                boxShadow:
                  "0 0 25px rgba(var(--theme-rgb), 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 35px rgba(var(--theme-rgb), 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(var(--theme-rgb), 0.15)";
              }}
            >
              <FaDownload />
              Download Resume
            </a>

            {/* Send Email */}
            <a
              href={`mailto:${contact.email}`}
              className="
                rounded-xl
                border
                px-6
                py-3
                font-semibold
                transition-all
                duration-300
              "
              style={{
                borderColor:
                  "var(--theme-primary)",
                color:
                  "var(--theme-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--theme-primary)";
                e.currentTarget.style.color =
                  "#020617";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  "var(--theme-primary)";
              }}
            >
              Send Email
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}