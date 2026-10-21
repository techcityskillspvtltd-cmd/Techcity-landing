import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Basic conditions for using the TechCity website and enquiring about or joining a program.",
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

export default function TermsAndConditions() {
  return (
    <LegalPage
      index="02"
      label="Terms"
      title="The basic conditions of use."
      updated="8 October 2026"
      intro={
        <>
          These terms are the basic conditions for using the TechCity website
          and for enquiring about or joining a program. By using the site, you
          agree to them. How we handle personal information is set out in our{" "}
          <a
            href="/privacy-policy"
            className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            privacy policy
          </a>
          .
        </>
      }
      sections={[
        {
          title: "Using this site",
          paragraphs: [
            "You may browse the site, read about our programs, and send us an enquiry. If you do not agree to these conditions, please do not use the site.",
          ],
        },
        {
          title: "Programs",
          paragraphs: [
            "TechCity works with universities and industry partners to deliver industry-aligned skilling. Dates, fees, and descriptions on the site are invitations to enquire. A place on a program is confirmed only when we or the partner institution accept an application in writing.",
            "We describe outcomes in good faith. We do not guarantee a job, internship, grade, or admission. Campus rules and partner terms may also apply once you enroll.",
          ],
        },
        {
          title: "Information you give us",
          paragraphs: [
            "Forms and applications should contain accurate information, and you should keep it up to date. You are responsible for messages sent from the contact details you submit.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: ["You agree not to misuse the site. That includes:"],
          items: [
            "Attempting to break, probe, or overload the site.",
            "Copying or scraping content in bulk without permission.",
            "Posting unlawful, misleading, or harmful material.",
            "Using the site to harm another person or organization.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "Text, branding, program materials, and design on this site belong to TechCity or its licensors. You may view pages and share links for personal, non-commercial use. You may not copy program materials or the TechCity name for your own course or product without written permission.",
          ],
        },
        {
          title: "Testimonials",
          paragraphs: [
            "Student stories on the site reflect individual experiences. They are not a promise that every participant will see the same result.",
          ],
        },
        {
          title: "Other sites",
          paragraphs: [
            "The site may link to colleges, employers, or other services. Those sites have their own terms and privacy practices, and we are not responsible for them.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "The site and its content are provided as available. We work to keep information accurate and may correct or remove it without notice. To the extent the law allows, we disclaim warranties that are not expressly stated in these terms.",
          ],
        },
        {
          title: "Liability",
          paragraphs: [
            "To the extent the law allows, TechCity is not liable for indirect or consequential loss from use of the site or from a program, including lost opportunity. Nothing in these terms limits liability that cannot legally be limited.",
          ],
        },
        {
          title: "Privacy",
          paragraphs: [
            <>
              Our{" "}
              <a
                href="/privacy-policy"
                className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                privacy policy
              </a>{" "}
              explains what we collect and how we use it. It forms part of
              these conditions.
            </>,
          ],
        },
        {
          title: "Changes",
          paragraphs: [
            "We may update these terms. The date at the top of this page shows the latest version. If you keep using the site after an update, the new terms apply.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of India. Courts in Mumbai have jurisdiction, subject to any rights you have that cannot be waived.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [contact],
        },
      ]}
    />
  );
}
