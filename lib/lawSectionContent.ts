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

// Privacy & Data Breach
export const PRIVACY_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Federal & State Consumer Privacy Laws**"
  ],
  whoIsProtected:
    "Privacy laws protect consumers whose **personal or sensitive information** is improperly accessed, exposed, or shared.",
  commonViolations:
    "Common violations include failing to safeguard data, improper sharing, delayed breach notifications, and weak security practices.",
  yourRights:
    "Consumers have the right to transparency and accountability when data is compromised, often with **consumer-friendly enforcement mechanisms**.",
  whatToDoNext:
    "Review breach notices and monitor accounts. A **free case review** can determine whether legal remedies may apply.",
  damagesAndRemedies:
    "Depending on circumstances, privacy violations may allow recovery designed to hold companies accountable."
};

// VPPA — Video Privacy Protection Act
export const VPPA_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Video Privacy Protection Act (VPPA)** — 18 U.S.C. § 2710"
  ],
  whoIsProtected:
    "The **VPPA** protects consumers whose **video viewing activity** is tracked or shared without consent.",
  commonViolations:
    "**VPPA violations** include sharing viewing history with third parties, tracking pixels, and linking video data to personal identifiers.",
  yourRights:
    "Consumers have strong privacy rights over viewing habits, even when tracking is not obvious.",
  whatToDoNext:
    "Identify websites where video content was viewed and review disclosures. A **free case review** can clarify whether tracking crossed legal lines.",
  damagesAndRemedies:
    "**VPPA claims** may allow statutory recovery, making review worthwhile even when harm is not obvious."
};

// FHA — Fair Housing Act
export const FHA_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Fair Housing Act (FHA)** — 42 U.S.C. § 3601 et seq."
  ],
  whoIsProtected:
    "The **Fair Housing Act** protects renters and buyers from housing discrimination based on disability, family status, and other protected characteristics.",
  commonViolations:
    "Common **FHA violations** include refusing reasonable accommodations, unequal rental terms, discriminatory statements, and retaliation.",
  yourRights:
    "Consumers have the right to equal housing access and enforcement mechanisms designed to correct discriminatory practices.",
  whatToDoNext:
    "Save communications, accommodation requests, and listings. A **free case review** can help evaluate next steps.",
  damagesAndRemedies:
    "**FHA remedies** may include corrective action and recovery depending on the circumstances."
};

// Mass Arbitration
export const MASS_ARBITRATION_CONTENT: LawSectionContent = {
  keyStatutes: [
    "**Federal Arbitration Act & Consumer Protection Laws**"
  ],
  whoIsProtected:
    "Mass arbitration applies to consumers bound by **forced arbitration clauses** who experienced similar harm from the same company.",
  commonViolations:
    "Issues often involve unfair contract terms, systemic misconduct, or widespread consumer harm.",
  yourRights:
    "Consumers may assert rights collectively through coordinated arbitration, often with minimal individual burden.",
  whatToDoNext:
    "Review agreements and identify shared issues. A **free case review** can determine whether mass arbitration applies.",
  damagesAndRemedies:
    "Outcomes depend on scale and process, but many cases proceed without upfront legal costs."
};

// Law slug → Content mapping
export const LAW_CONTENT_MAP: Record<string, LawSectionContent> = {
  fcra: FCRA_CONTENT,
  fdcpa: FDCPA_CONTENT,
  tcpa: TCPA_CONTENT,
  privacy: PRIVACY_CONTENT,
  vppa: VPPA_CONTENT,
  fha: FHA_CONTENT,
  "mass-arbitration": MASS_ARBITRATION_CONTENT
};
