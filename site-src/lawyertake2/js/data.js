/* ============================================================================
   LW_DATA — single source of truth for all site content.
   Section variants (js/sections/*.js) reference this; never hardcode copy.
   ========================================================================== */
window.DATA = {
  firm: {
    name: 'Hale & Whitmore',
    legal: 'Hale & Whitmore LLP',
    est: 1998,
    tagline: 'Counsel for consequential decisions.',
    phone: '(212) 555-0148',
    phoneHref: 'tel:+12125550148',
    email: 'counsel@halewhitmore.com',
    address: '1200 Meridian Avenue, Suite 3400',
    city: 'New York, NY 10018',
    hours: 'Mon–Fri · 8:30–18:00',
    offices: 'New York · London · Singapore',
  },

  services: [
    {
      icon: 'briefcase',
      title: 'Corporate & M&A',
      desc: 'Mergers, acquisitions, and governance for companies at inflection points — from first term sheet to closing.',
    },
    {
      icon: 'gavel',
      title: 'Commercial Litigation',
      desc: 'Trial-ready advocacy in complex disputes. We prepare every matter as if it goes to trial, because some do.',
    },
    {
      icon: 'building',
      title: 'Real Estate',
      desc: 'Acquisitions, financing, and development across commercial and residential portfolios.',
    },
    {
      icon: 'bulb',
      title: 'Intellectual Property',
      desc: 'Patents, trademarks, and trade secrets — protected before they are ever threatened.',
    },
    {
      icon: 'percent',
      title: 'Tax & Structuring',
      desc: 'Structures that hold up under scrutiny, in every jurisdiction you operate.',
    },
    {
      icon: 'shield',
      title: 'Trusts & Estates',
      desc: 'Wealth that outlives its founder, planned with the precision of a closing.',
    },
  ],

  team: [
    {
      name: 'Eleanor Hale',
      role: 'Managing Partner',
      bio: 'Twenty-five years leading high-stakes M&A. Former federal clerk; the calmest voice in the room.',
      initials: 'EH',
    },
    {
      name: 'Marcus Whitmore',
      role: 'Senior Partner',
      bio: 'Forty-plus trials across commercial and white-collar matters. Closes arguments people quote.',
      initials: 'MW',
    },
    {
      name: 'Priya Raman',
      role: 'Partner, Real Estate',
      bio: 'Structured more than a billion dollars in acquisitions. Spots a bad title before you finish reading it.',
      initials: 'PR',
    },
    {
      name: 'Daniel Okafor',
      role: 'Partner, Tax & IP',
      bio: 'Cross-border structuring for private companies and families. Big Four alum, skeptic by training.',
      initials: 'DO',
    },
  ],

  testimonials: [
    {
      quote:
        'They didn’t just win the case — they made the other side settle on our terms. I have never felt more represented.',
      name: 'Sarah Lindqvist',
      role: 'CEO, Meridian Health',
      initials: 'SL',
    },
    {
      quote:
        'The calmest people in the room when everything was on fire. That composure is worth more than any ranking.',
      name: 'James Osei',
      role: 'Founder, Osei Logistics',
      initials: 'JO',
    },
    {
      quote:
        'Their tax structure saved us eight figures. We no longer make a single financial decision without them.',
      name: 'Rachel Kim',
      role: 'CFO, Halcyon Group',
      initials: 'RK',
    },
    {
      quote:
        'Discreet, precise, relentless. Exactly what you want across the table from your opponent.',
      name: 'A. Fontaine',
      role: 'General Counsel, Fontaine & Co.',
      initials: 'AF',
    },
  ],

  stats: [
    { value: '$2.4B', label: 'Recovered for clients' },
    { value: '98%', label: 'Favorable outcomes' },
    { value: '27', label: 'Years at the bar' },
    { value: '400+', label: 'Clients advised' },
  ],

  metrics: [
    { label: 'Favorable outcomes', value: 98 },
    { label: 'Clients who return', value: 91 },
    { label: 'Matters resolved before trial', value: 76 },
  ],

  values: [
    {
      icon: 'shield',
      title: 'Integrity',
      desc: 'We say what we will do, then we do it. Clients stay for decades, not for billable hours.',
    },
    {
      icon: 'lock',
      title: 'Discretion',
      desc: 'Your business is our business — and our secret. Confidentiality is the first deliverable.',
    },
    {
      icon: 'target',
      title: 'Results',
      desc: 'Strategy in service of the outcome you need. We measure by settlements, not press releases.',
    },
  ],

  milestones: [
    {
      year: '1998',
      title: 'Founded',
      desc: 'Hale & Whitmore opens in a two-room office on Park Avenue with one client and a thesis: precision over volume.',
    },
    {
      year: '2004',
      title: 'First nine-figure mandate',
      desc: 'The firm closes its first nine-figure acquisition and stands up a dedicated litigation group.',
    },
    {
      year: '2011',
      title: 'Top-tier recognition',
      desc: 'Chambers ranks the firm in its top tier for corporate work — the first of many.',
    },
    {
      year: '2018',
      title: 'London office',
      desc: 'A second office opens, and the cross-border practice takes shape.',
    },
    {
      year: '2024',
      title: '$2.4B recovered',
      desc: 'Cumulative recoveries pass $2.4B as the firm advises its four-hundredth client.',
    },
  ],
};
