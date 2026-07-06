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
      className="py-28 bg-[#020617]"
    >
      <div className="max-w-4xl mx-auto px-6">

        <SectionTitle
          badge="Contact"
          title="Let's"
          highlight="Connect"
          subtitle="Interested in working together? Let's build something amazing."
        />

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-10">

          <h2 className="text-3xl font-bold">
            {contact.title}
          </h2>

          <p className="text-slate-400 mt-5 leading-8">
            {contact.description}
          </p>

          <div className="space-y-5 mt-10">

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-cyan-400" />
              {contact.email}
            </div>

            <div className="flex items-center gap-4">
              <FaPhone className="text-cyan-400" />
              {contact.phone}
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-cyan-400" />
              {contact.location}
            </div>

            <div className="flex items-center gap-4">
              <FaGithub className="text-cyan-400" />
              <a href={contact.github}>
                GitHub
              </a>
            </div>

            <div className="flex items-center gap-4">
              <FaLinkedin className="text-cyan-400" />
              <a href={contact.linkedin}>
                LinkedIn
              </a>
            </div>

          </div>

          <div className="flex flex-wrap gap-5 mt-12">

            <a
              href={portfolio.resume}
              className="bg-cyan-500 px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-cyan-400 transition"
            >
              <FaDownload />

              Download Resume

            </a>

            <a
              href={`mailto:${contact.email}`}
              className="border border-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-500 transition"
            >
              Send Email
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}