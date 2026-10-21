import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TechCity collects, uses, and protects personal information on this website and through its programs.",
};

const contact = (
  <>
    Email{" "}
    <a
      href="mailto:techcityskillspvt.ltd@gmail.com"
      className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      techcityskillspvt.ltd@gmail.com
    </a>{" "}
    or call{" "}
    <a
      href="tel:+919650657821"
      className="text-foreground transition-colors hover:text-foreground"
    >
      9650657821
    </a>.
  </>
);

export default function PrivacyPolicy() {
  return (
    <LegalPage
      index="01"
      label="Privacy"
      title="How we handle your information."
      updated="8 October 2026"
      intro={
        <>
          TechCity partners with universities to deliver industry-aligned
          skilling. This policy sets the basic conditions for how we collect
          and use personal information on this website and when you enquire
          about or join a program. Our{" "}
          <a
            href="/terms-and-conditions"
            className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            terms and conditions
          </a>{" "}
          cover use of the site.
        </>
      }
      sections={[
        {
          title: "Who this covers",
          paragraphs: [
            "This policy applies to visitors of the TechCity website, students and faculty who contact us, and college or industry partners who enquire about working with us.",
          ],
        },
        {
          title: "Information we collect",
          paragraphs: [
            "We collect only what we need to reply to you and to run programs.",
          ],
          items: [
            "Contact details you send us, such as your name, email, phone number, college, and message.",
            "Program interest, application details, and academic background you choose to share.",
            "Technical data such as browser type, device, and the pages you visit.",
            "Cookies used to keep the site working and to understand which pages are used.",
          ],
        },
        {
          title: "How we use it",
          items: [
            "Reply to enquiries and partnership requests.",
            "Run programs, mentor support, and communications you asked for.",
            "Improve the website and our programs.",
            "Meet legal, safety, and record-keeping obligations.",
          ],
        },
        {
          title: "When we share it",
          paragraphs: [
            "We do not sell personal information. We share it with a university or industry partner when that is needed to deliver a program you joined, with providers who host or operate the site on our behalf, and when the law requires it.",
          ],
        },
        {
          title: "Cookies",
          paragraphs: [
            "The site may use essential cookies so pages load, and optional analytics cookies to see how the site is used. You can control cookies in your browser. Blocking essential cookies may stop parts of the site from working.",
          ],
        },
        {
          title: "How long we keep it",
          paragraphs: [
            "We keep information only for as long as we need it for the purpose it was collected, or for as long as the law requires. Enquiry records are reviewed from time to time and removed when they are no longer needed.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You can ask us to access, correct, or delete personal information we hold about you, or to stop non-essential emails. We may need to keep some records where the law requires it.",
            contact,
          ],
        },
        {
          title: "Students and minors",
          paragraphs: [
            "Our programs are aimed at college students and adult learners. We do not knowingly collect information from children under 13. If you believe we have, contact us and we will delete it.",
          ],
        },
        {
          title: "Security",
          paragraphs: [
            "We use reasonable technical and organizational measures to protect personal information. No website or email is completely secure, so please avoid sending sensitive documents unless we ask for them.",
          ],
        },
        {
          title: "Changes",
          paragraphs: [
            "We may update this policy from time to time. The date at the top of this page shows when it was last revised. Continuing to use the site after an update means the revised policy applies.",
          ],
        },
      ]}
    />
  );
}
