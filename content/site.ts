/**
 * ALL SITE CONTENT LIVES IN THIS FILE.
 *
 * To update text, links, testimonials or images, edit the values below.
 * Images: put files in /public/images/work/<project-slug>/ and set `src`
 * to "/images/work/<project-slug>/<file>". While `src` is empty, the site
 * shows a labelled placeholder so you can see which screen goes where.
 */

export type Img = {
  label: string; // what the image shows (also used as alt text)
  src?: string; // e.g. "/images/work/ras/overview.png"
  caption?: string;
  ratio?: string; // CSS aspect-ratio, default "16 / 10"
};

export type Block = {
  label: string; // small section name, e.g. "Problem"
  heading?: string; // the statement
  body?: string[]; // paragraphs
  list?: { title: string; text?: string }[];
  images?: Img[];
};

export type Card = { title: string; text: string };

export type Project = {
  slug: string;
  title: string;
  summary: string; // one line used on the home page
  headline: string; // case study page headline
  company: string;
  year: string;
  highlight: string; // headline result shown on the home page
  tint: string; // hero gradient colour
  coverText?: "light"; // white title on the home card's hover panel, for dark covers
  cover: Img;
  details: { label: string; value: string }[];
  link?: { label: string; href: string };
  // Case study overview, shown under the hero
  tags: string[]; // the row under the hero title
  overview: string; // the "Product" card
  summaryCards: { problem: Card; solution: Card; result: Card };
  impact: { value: string; label: string; caption: string }[]; // up to three stats
  blocks: Block[];
};

export const site = {
  name: "Victor Chukwu",
  title: "Product designer, strategist, and revenue advocate.",
  email: "chukwuvidera@gmail.com",
  cv: "", // e.g. "/victor-chukwu-cv.pdf" — the download button appears once this is set
  url: "https://victorchukwu.design", // used once the domain is live; until then the Vercel address is used
  // Image slots without a `src` show a labelled placeholder. Set to false to hide them
  // until the Figma frames are in (covers always show their designed placeholder).
  showImagePlaceholders: true,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chidera-victor-chukwu/" },
    { label: "Behance", href: "https://www.behance.net/victor-chukwu" },
  ],
  // Shown above the case studies; its words light up as you scroll
  workIntro:
    "Four products across crypto infrastructure, Web3, trading and email marketing, each designed to make complex systems feel simple.",
  hero: {
    headline: "Product designer and Strategist",
    accent: "Strategist", // the part of the headline shown in burnt orange
    intro:
      "I've designed fintech, crypto infrastructure and SaaS products that make complex systems simple for the businesses and people who rely on them.",
  },
  about: {
    heading: "Product strategy, systems thinking and user experience, in one practice.",
    intro:
      "For nearly five years I've designed fintech, crypto infrastructure and SaaS products that make complex systems simple for the businesses and people who rely on them. Today I lead design for infrastructure products at Roqqu.",
    body: [
      "I started as a product design intern and grew into leading design teams. Along the way I've learnt that the best interfaces come from understanding the system underneath them, the business it has to serve, and the people who rely on it every day.",
      "At Roqqu I've worked across almost every product division: the retail app, internal products and the design system. I now lead design for the infrastructure products that other businesses build on.",
      "At Charisol I led the design team for about three years, training and mentoring new and existing designers across the company's products.",
      "Away from the screen, I sing gospel music.",
    ],
  },
  experience: [
    {
      company: "Roqqu",
      role: "Product Designer, now leading design for infrastructure products",
      period: "Feb 2022 – present",
      note: "Retail, internal products, design systems and infrastructure.",
    },
    {
      company: "Charisol",
      role: "Product Designer, then Lead Designer",
      period: "Dec 2021 – 2025",
      note: "Led the design team for about three years. Designed MailDrip and the Charisol website.",
      link: { label: "charisol.io", href: "https://charisol.io" },
    },
    {
      company: "Independent",
      role: "Freelance Product Designer",
      period: "Ongoing",
      note: "Product and interface design for individual clients.",
    },
  ],
  testimonials: [
    {
      quote:
        "I've had the pleasure of working with Chidera for a while now. His calmness and keen eye for details are his standout points for me. He's an amazing product design professional.",
      name: "Praise Oshilim",
      role: "Developer, Roqqu",
    },
    {
      quote:
        "Thank you so much for the session you facilitated at our Mentee Onboarding Event yesterday. It was truly impactful, and I say this personally, having learnt from it myself. The mentees were in great hands, and your contribution set a remarkable tone for what this edition will deliver.",
      name: "Amidat Olatunji",
      role: "Project Manager, TrybebyFUSE Mentorship",
    },
  ],
};

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "roqqu-api-services",
    title: "Roqqu API Services",
    summary: "A developer-first crypto infrastructure platform, designed from zero to shipped.",
    headline: "Designing a developer-first infrastructure platform from the ground up",
    company: "Roqqu",
    year: "2023 – present",
    highlight: "15+ businesses integrated",
    tint: "#27354d",
    coverText: "light",
    cover: { label: "RAS console overview in front of the new Stocks page", src: "/images/work/ras/cover.webp" },
    tags: ["0 to 1 product design", "Developer platform", "2023 – present", "Live"],
    overview:
      "Roqqu API Services lets businesses and developers build Roqqu's crypto infrastructure, such as wallets, transactions and financial services, directly into their own products through APIs.",
    summaryCards: {
      problem: {
        title: "Built for consumers",
        text: "Roqqu's services were built for end users. To support crypto businesses and become an infrastructure player, it needed a product that made complex backend systems usable by developers.",
      },
      solution: {
        title: "A calm developer console",
        text: "I led the research, UX strategy and dashboard design for a console where merchants manage wallets, transactions, API keys and webhooks, plus the internal tool Roqqu uses to oversee them.",
      },
      result: {
        title: "Infrastructure-ready",
        text: "Roqqu's first external-facing infrastructure platform: stable, still improving, and integrated by 15+ businesses.",
      },
    },
    impact: [
      { value: "15+", label: "Businesses integrated", caption: "And growing as the platform improves" },
      { value: "1st", label: "Infrastructure platform", caption: "Roqqu's first product for other businesses to build on" },
      { value: "2", label: "Products designed", caption: "The merchant console and the internal management tool" },
    ],
    details: [
      { label: "Role", value: "Lead product designer, from zero to shipped" },
      { label: "Team", value: "A second designer for the first year, two engineers, product and engineering stakeholders" },
      { label: "Timeline", value: "2023 – present" },
      { label: "Scope", value: "Research, UX strategy, information architecture, dashboard and UI system" },
      { label: "Status", value: "Live and stable, continuously improved" },
    ],
    blocks: [
      {
        label: "Context",
        heading: "Roqqu's step from crypto app to crypto infrastructure.",
        body: [
          "Roqqu API Services (RAS) lets businesses and developers build Roqqu's crypto infrastructure, such as wallets, transactions and financial services, directly into their own products through APIs.",
        ],
        images: [{ label: "RAS console overview: crypto and fiat balances, assets and asset movement", src: "/images/work/ras/dashboard.webp" }],
      },
      {
        label: "Problem",
        heading: "Roqqu was built for end users, not developers.",
        body: [
          "Before RAS, Roqqu's services were built primarily for consumers. To support crypto businesses, and to position Roqqu as a major infrastructure player in Nigeria and beyond, we needed a product that made complex backend systems usable by the developers building on top of them.",
        ],
      },
      {
        label: "My role",
        heading: "More than interface design.",
        body: [
          "As lead designer from the very beginning, I led the product's research, defined the user experience strategy, and translated complex backend systems into something developers could use with confidence. The role meant balancing technical accuracy, business goals and human-centred design.",
        ],
        list: [
          { title: "Early product discovery and stakeholder alignment" },
          { title: "Developer experience research" },
          { title: "Information architecture and system mapping" },
          { title: "End-to-end UX flows" },
          { title: "UI system and dashboard design" },
          { title: "Design reviews with engineering and product teams" },
        ],
      },
      {
        label: "Key insights",
        heading: "What research told us, and what shaped every decision after.",
        list: [
          { title: "Developers want predictability.", text: "A dashboard doesn't need to be beautiful to be trusted. It needs to behave the same way every time." },
          { title: "Poor error handling breaks trust faster than poor UI.", text: "Clear states and recoverable errors mattered more than polish." },
          { title: "Docs and dashboard are one system.", text: "Documentation and the console had to feel like a single product, not two." },
        ],
      },
      {
        label: "Solution",
        heading: "A calm console built for long sessions and dense data.",
        body: [
          "Merchants manage wallets and addresses, follow every transaction, handle API keys, IP access and webhooks, and choose plans that grow with them. Every screen also works on mobile, so merchants can track activity on the go.",
        ],
        list: [
          { title: "Neutral, low-fatigue colour palette" },
          { title: "Clear type hierarchy for logs and tables" },
          { title: "Minimal decoration, functional emphasis" },
          { title: "Reusable components that scale with the API" },
        ],
        images: [
          { label: "Wallet overview and address management", src: "/images/work/ras/wallets.webp" },
          { label: "Transactions with filters and export", src: "/images/work/ras/transactions.webp" },
          { label: "API keys, with test and live modes", src: "/images/work/ras/api-keys.webp" },
          { label: "IP access list", src: "/images/work/ras/ip-access.webp" },
          { label: "Plans that grow with the merchant", src: "/images/work/ras/plans.webp" },
          { label: "Team management and roles", src: "/images/work/ras/team.webp" },
        ],
      },
      {
        label: "What's new",
        heading: "Beyond crypto: stocks and fiat.",
        body: [
          "RAS keeps growing, and the console has grown with it. Merchants can now hold and trade stocks, and move between fiat and crypto, without leaving the same calm interface they already use for wallets and transactions.",
        ],
        list: [
          { title: "Stocks.", text: "A stocks portfolio, all stocks and top movers at a glance, detailed price charts, and flows to buy and sell." },
          { title: "Fiat.", text: "Top up a fiat balance, withdraw to a bank account, and buy or sell USDT with fiat." },
          { title: "One record.", text: "Fiat deposits, withdrawals and USDT trades sit in their own transactions view, alongside crypto and stocks." },
        ],
        images: [
          { label: "Stocks: portfolio, all stocks and top movers", src: "/images/work/ras/stocks.webp" },
          { label: "Stock details with a candlestick chart", src: "/images/work/ras/stock-details.webp" },
          { label: "Buying USDT with fiat", src: "/images/work/ras/buy-usdt-with-fiat.webp" },
          { label: "Fiat transactions: deposits, withdrawals and USDT trades", src: "/images/work/ras/fiat-transactions.webp" },
        ],
      },
      {
        label: "Internal tool",
        heading: "Behind the console: managing merchants.",
        body: [
          "Alongside the merchant console, I designed the internal management tool Roqqu's team uses to oversee merchant activity and manage roles and permissions.",
        ],
        images: [
          { label: "Internal tool: merchant activity" },
          { label: "Internal tool: roles and permissions" },
        ],
      },
      {
        label: "Outcome",
        heading: "Roqqu's first external-facing infrastructure platform.",
        list: [
          { title: "15+ businesses integrated", text: "and growing as the platform keeps improving." },
          { title: "An infrastructure-ready Roqqu", text: "positioned as a fintech that other businesses can build on." },
          { title: "Strong alignment", text: "between product, design and engineering." },
          { title: "A scalable system", text: "ready for future API expansion." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "roqqu-web3",
    title: "Roqqu Web3",
    summary: "Self-custody and on-chain activity inside the Roqqu app people already know.",
    headline: "Bringing Web3 into an app people already trust",
    company: "Roqqu",
    year: "2025",
    highlight: "19,000+ users",
    tint: "#3a2d5a",
    coverText: "light",
    cover: { label: "Roqqu Web3 cover: wallet home on phone mockups" },
    tags: ["0 to 1 product design", "Sole designer", "2025", "Live"],
    overview:
      "Roqqu's Web3 wallet lets new and existing users take part in on-chain activity directly through their Roqqu account, and hold their own assets in self-custody alongside it.",
    summaryCards: {
      problem: {
        title: "Leaving to go on-chain",
        text: "To swap on-chain, bridge between networks or use a dApp, Roqqu users had to switch to separate wallets like MetaMask or Trust Wallet.",
      },
      solution: {
        title: "Web3 in a familiar app",
        text: "I researched how Web3 really works and turned it into patterns Roqqu users already knew: create or connect a wallet, send, receive, swap, bridge and use dApps.",
      },
      result: {
        title: "Adopted at scale",
        text: "Launched in 2025 and now used by 19,000+ people, on a foundation the team keeps building on.",
      },
    },
    impact: [
      { value: "19,000+", label: "Users", caption: "On Roqqu's Web3 wallet" },
      { value: "1", label: "Account", caption: "For custodial and on-chain activity" },
      { value: "0 → 1", label: "Built from scratch", caption: "As the sole product designer" },
    ],
    details: [
      { label: "Role", value: "Sole product designer, from scratch" },
      { label: "Team", value: "Roqqu product and engineering" },
      { label: "Timeline", value: "Designed early 2025, launched later in 2025" },
      { label: "Scope", value: "Web3 research, UX flows, interface design" },
      { label: "Status", value: "Live, and still being improved by the team" },
    ],
    blocks: [
      {
        label: "Context",
        heading: "On-chain, without leaving Roqqu.",
        body: [
          "Roqqu built its Web3 wallet so new and existing users could take part in on-chain activity directly through their Roqqu account, and hold their own assets in self-custody alongside it.",
        ],
        images: [{ label: "Web3 wallet home", ratio: "16 / 9" }],
      },
      {
        label: "Problem",
        heading: "Users had to leave to go on-chain.",
        body: [
          "To swap on-chain, bridge between networks or use a dApp, Roqqu users had to switch to separate wallets like MetaMask or Trust Wallet. Every switch meant another app to learn and another place to manage their assets.",
        ],
      },
      {
        label: "Challenge",
        heading: "Make Web3 feel familiar.",
        body: [
          "The hardest part was the research. I had to understand how the Web3 space really works, then turn it into an interface users already knew, without introducing new patterns they'd have to learn.",
          "Having every Web3 action happen inside the Roqqu app was new, so the experience had to feel like a natural part of Roqqu rather than a separate product.",
        ],
      },
      {
        label: "Solution",
        heading: "One wallet, every on-chain action.",
        list: [
          { title: "Create or connect a wallet", text: "and hold assets in self-custody." },
          { title: "Send and receive", text: "using flows that mirror the ones Roqqu users already use." },
          { title: "Swap and bridge", text: "across tokens and networks." },
          { title: "Use dApps", text: "directly from the Roqqu app." },
        ],
        images: [
          { label: "Create or connect a wallet", ratio: "16 / 9" },
          { label: "Send and receive", ratio: "16 / 9" },
          { label: "Swap and bridge", ratio: "16 / 9" },
          { label: "dApp browser", ratio: "16 / 9" },
        ],
      },
      {
        label: "Outcome",
        heading: "A Web3 wallet adopted at scale.",
        list: [
          { title: "19,000+ users", text: "now use Roqqu Web3." },
          { title: "One account", text: "for Roqqu's custodial and on-chain experiences." },
          { title: "A strong foundation", text: "that the team keeps building on." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "flitaa",
    title: "Flitaa",
    summary: "A calm, trust-focused crypto trading app for African markets.",
    headline: "Designing a simple, trust-focused crypto trading experience",
    company: "Flitaa, a Roqqu company",
    year: "Since 2023",
    highlight: "50k+ downloads on Google Play",
    tint: "#1f4637",
    cover: { label: "Flitaa onboarding, home and wallet screens", src: "/images/work/flitaa/cover.webp" },
    tags: ["Redesign", "Design system", "Since 2023", "Live"],
    overview:
      "Flitaa is a mobile-first crypto trading app that helps users buy, sell and manage cryptocurrencies with confidence, approachable for new users and reliable for experienced traders.",
    summaryCards: {
      problem: {
        title: "Crypto overwhelms",
        text: "A high learning curve, sensitive financial actions and market volatility made trading feel intimidating for people new to crypto.",
      },
      solution: {
        title: "Calm, trust-first trading",
        text: "A redesign built on three principles: reduce cognitive load, design for trust, and guide without overwhelming, localised for each market Flitaa serves.",
      },
      result: {
        title: "A clear relaunch",
        text: "Relaunched in 2024 with smoother onboarding, predictable trading flows and a scalable design system.",
      },
    },
    impact: [
      { value: "50k+", label: "Downloads", caption: "On Google Play" },
      { value: "2024", label: "Relaunch", caption: "The redesign shipped and went live" },
      { value: "2025", label: "Acquired by Roqqu", caption: "To accelerate its entry into East Africa" },
    ],
    details: [
      { label: "Role", value: "Associate designer on the redesign, then design lead for the product" },
      { label: "Timeline", value: "Started 2023. Redesign launched in 2024" },
      { label: "Scope", value: "Redesign, UX/UI, design system, localisation" },
      { label: "Status", value: "Live" },
    ],
    blocks: [
      {
        label: "Context",
        heading: "A mobile-first trading app, rebuilt for clarity.",
        body: [
          "Flitaa is a mobile-first crypto trading app that helps users buy, sell and manage cryptocurrencies with confidence. The goal of the redesign was to make trading feel approachable for new users while staying powerful and reliable for experienced traders.",
          "Roqqu acquired Flitaa, announced publicly in 2025, to accelerate its entry into Kenya and the wider East African market.",
        ],
        images: [{ label: "Flitaa home, wallet and asset screens", src: "/images/work/flitaa/home-and-portfolio.webp", ratio: "16 / 9" }],
      },
      {
        label: "Challenge",
        heading: "Crypto products often overwhelm users.",
        list: [
          { title: "A high learning curve for new users" },
          { title: "Sensitive financial actions that demand clarity" },
          { title: "Market volatility that needs clear feedback and states" },
          { title: "Balancing simplicity with depth" },
        ],
      },
      {
        label: "Principles",
        heading: "Three principles guided the experience.",
        list: [
          { title: "Reduce cognitive load.", text: "Buying, selling and tracking assets had to feel obvious." },
          { title: "Design for trust.", text: "Prices, balances and transaction states had to be clear and transparent at all times." },
          { title: "Guide, don't overwhelm.", text: "Users should feel supported as they navigate crypto, not tested." },
        ],
      },
      {
        label: "Solution",
        heading: "A fresh look that keeps people calm while they trade.",
        body: [
          "The redesign was localised for each market Flitaa serves, with custom branded assets, local language, prices in local currencies, and familiar local payment methods.",
        ],
        list: [
          { title: "A clear visual hierarchy around prices and balances" },
          { title: "A calm interface that reduces anxiety during trading" },
          { title: "Consistent feedback for every action" },
          { title: "Mobile-first layouts made for quick decisions" },
        ],
        images: [
          { label: "Onboarding: welcome, sign up and account created", src: "/images/work/flitaa/onboarding.webp", ratio: "16 / 9" },
          { label: "Buying Bitcoin: amount, confirm and success", src: "/images/work/flitaa/buy-sell-hold.webp", ratio: "16 / 9" },
          { label: "Referrals: invite friends, withdraw earnings and success", src: "/images/work/flitaa/referrals.webp", ratio: "16 / 9" },
          { label: "Notifications: inbox, announcement and empty state", src: "/images/work/flitaa/notifications.webp", ratio: "16 / 9" },
        ],
      },
      {
        label: "Outcome",
        heading: "Relaunched in 2024 as a clear and approachable trading app.",
        list: [
          { title: "50k+ downloads", text: "on Google Play." },
          { title: "Smooth onboarding", text: "for people new to crypto." },
          { title: "Predictable, transparent trading flows", text: "that build confidence." },
          { title: "A scalable design system", text: "for future features, and a product ready for Roqqu's East African expansion." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "maildrip",
    title: "MailDrip",
    summary: "Email marketing that's powerful enough to grow with, and simple enough to start with.",
    headline: "Designing an efficient, easy-to-use email marketing experience",
    company: "Charisol",
    year: "2021 – 2025",
    highlight: "Helped win and keep clients",
    tint: "#1f2a8c", // MailDrip blue, deepened
    cover: { label: "MailDrip dashboard in front of the email builder", src: "/images/work/maildrip/cover.webp" },
    tags: ["Product design", "Design leadership", "2021 – 2025", "Live"],
    overview:
      "MailDrip is an email marketing platform that helps small and growing businesses, creators and personal brands create, send and manage campaigns without complexity.",
    summaryCards: {
      problem: {
        title: "Too simple or too complex",
        text: "Email tools are either too simple to scale or too complex for everyday users. MailDrip needed to sit in the middle.",
      },
      solution: {
        title: "Scalable simplicity",
        text: "I redesigned the dashboard and designed the email builder, campaign, contact and instant email flows, keeping them guided and clean as features grew.",
      },
      result: {
        title: "Clients won and kept",
        text: "Easier sending and campaign creation helped Charisol close and retain several clients.",
      },
    },
    impact: [
      { value: "Intern → Lead", label: "Grew with the product", caption: "From design intern to lead designer" },
      { value: "~3 years", label: "Leading the design team", caption: "Training and mentoring Charisol's designers" },
      { value: "Several", label: "Clients won and kept", caption: "Through easier sending and campaign creation" },
    ],
    link: { label: "Visit MailDrip", href: "https://app.maildrip.io/" },
    details: [
      { label: "Role", value: "Product design intern, then lead designer" },
      { label: "Team", value: "Led and mentored Charisol's design team, working with product and engineering" },
      { label: "Timeline", value: "Dec 2021 – 2025" },
      { label: "Scope", value: "Dashboard redesign, email builder, campaign, contact and instant email flows" },
      { label: "Status", value: "Live" },
    ],
    blocks: [
      {
        label: "Context",
        heading: "Powerful tools without enterprise friction.",
        body: [
          "MailDrip is an email marketing platform that helps businesses create, send and manage email campaigns without complexity. It was designed for small and growing businesses, creators and personal brands that need powerful tools but not enterprise-level friction.",
          "I joined the project as a product design intern. About a year and a half later I became lead designer at Charisol and led MailDrip's continued improvement, designing entirely new flows and experiences across most of the product.",
        ],
        images: [{ label: "MailDrip dashboard: credits, contacts, campaign performance and recent campaigns", src: "/images/work/maildrip/dashboard.webp" }],
      },
      {
        label: "Challenge",
        heading: "Email tools are either too simple to scale or too complex for everyday users.",
        body: ["MailDrip needed to sit in the middle."],
        list: [
          { title: "Supporting both beginners and growing teams" },
          { title: "Designing for repeated, long-term use" },
          { title: "Making powerful features feel approachable" },
          { title: "Avoiding clutter as features expanded" },
        ],
      },
      {
        label: "Priorities",
        heading: "I anchored the experience around three priorities.",
        list: [
          { title: "Ease of creation.", text: "Setting up a campaign had to feel fast and guided, not technical." },
          { title: "Clear mental models.", text: "Users should always know where they are: campaigns, audiences, automations or analytics." },
          { title: "Scalable simplicity.", text: "The design had to stay clean as features and data grew." },
        ],
      },
      {
        label: "Solution",
        heading: "What I designed.",
        list: [
          { title: "Dashboard redesign" },
          { title: "Email builder" },
          { title: "Campaign flows" },
          { title: "Contact flows" },
          { title: "Instant email flows" },
          { title: "Pricing, plans and pay-as-you-go credits" },
        ],
        images: [
          { label: "Drip campaigns, with status and performance at a glance", src: "/images/work/maildrip/campaigns.webp" },
          { label: "Drag-and-drop email builder", src: "/images/work/maildrip/email-builder.webp" },
          { label: "Contacts and contact groups", src: "/images/work/maildrip/contacts.webp" },
          { label: "Plans, pay-as-you-go email credits and payment", src: "/images/work/maildrip/plans-and-credits.webp" },
        ],
      },
      {
        label: "Outcome",
        heading: "A reliable platform for beginners and growing teams alike.",
        list: [
          { title: "Faster campaign setup", text: "through guided, simplified creation flows." },
          { title: "Clearer performance visibility", text: "for every campaign." },
          { title: "Clients won and kept.", text: "The ease of sending emails and creating campaigns helped Charisol close and retain several clients." },
          { title: "A scalable foundation", text: "for future features." },
        ],
      },
    ],
  },
];
