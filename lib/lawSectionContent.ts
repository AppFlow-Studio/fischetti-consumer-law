export interface LawSectionContent {
  keyStatutes: string[];
  whoIsProtected: string;
  commonViolations: string;
  yourRights: string;
  whatToDoNext: string;
  damagesAndRemedies: string;
}

// FCRA — Fair Credit Reporting Act
export const FCRA_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Fair Credit Reporting Act (FCRA)** — 15 U.S.C. § 1681 et seq."
  ],
  whoIsProtected:
    "The **Fair Credit Reporting Act** protects consumers affected by **inaccurate credit reports** or **faulty background checks**, including individuals denied **credit, housing, or employment** due to reporting errors, mixed files, or identity theft.",
  commonViolations:
    "Common **FCRA violations** include reporting inaccurate or outdated information, failing to properly investigate disputes, reinserting deleted items without notice, mixed consumer files, and denying employment or housing without required adverse action disclosures.",
  yourRights:
    "Under the **FCRA**, consumers have the right to dispute inaccurate information, access free annual credit reports, receive adverse action notices, and **seek compensation when violations occur**, often without upfront costs.",
  whatToDoNext:
    "Request your credit reports from Equifax, Experian, and TransUnion, dispute any errors in writing, and keep documentation. If inaccuracies remain, a **free case review** can help determine whether recovery may be available.",
  damagesAndRemedies:
    "**FCRA claims** may allow recovery for statutory damages, actual harm, and legal fees, making it **easier for consumers to pursue valid claims without out-of-pocket costs**."
};

// FDCPA — Fair Debt Collection Practices Act
export const FDCPA_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Fair Debt Collection Practices Act (FDCPA)** — 15 U.S.C. § 1692 et seq."
  ],
  whoIsProtected:
    "The **FDCPA** protects consumers contacted by **third-party debt collectors**, including individuals facing harassment, deception, or abusive collection tactics.",
  commonViolations:
    "**FDCPA violations** often involve repeated calls, threats, false statements, contacting family or employers, misrepresenting debts, or ignoring written stop requests.",
  yourRights:
    "Consumers have the right to limit collector contact, request debt validation, and **hold collectors accountable for unlawful conduct**, often without upfront legal fees.",
  whatToDoNext:
    "Save call logs, voicemails, letters, and texts from collectors. A **free case review** can help determine whether the conduct violates federal law.",
  damagesAndRemedies:
    "**FDCPA cases** may allow statutory recovery and compensation for distress, with legal fees often shifted to the violating collector."
};

// TCPA — Telephone Consumer Protection Act
export const TCPA_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Telephone Consumer Protection Act (TCPA)** — 47 U.S.C. § 227"
  ],
  whoIsProtected:
    "The **TCPA** protects consumers from **robocalls, spam texts, and automated marketing calls**, especially on mobile phones or Do Not Call numbers.",
  commonViolations:
    "**TCPA violations** include automated calls without consent, prerecorded messages, ignoring STOP requests, and repeated telemarketing calls.",
  yourRights:
    "Consumers have the right to control how businesses contact them and may seek enforcement when these rules are ignored, often **without paying upfront**.",
  whatToDoNext:
    "Save screenshots, call logs, and note opt-out attempts. Even a small number of unwanted calls may qualify for review.",
  damagesAndRemedies:
    "**TCPA claims** may allow recovery on a per-call or per-text basis, making it worthwhile to evaluate potential violations."
};

// Law slug → Content mapping
export const LAW_CONTENT_MAP: Record<string, LawSectionContent> = {
  fcra: FCRA_CONTENT,
  fdcpa: FDCPA_CONTENT,
  tcpa: TCPA_CONTENT
};
