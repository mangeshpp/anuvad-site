/**
 * Product catalogue.
 *
 * Written for buyers, not engineers: what the product does, how you use it,
 * and what changes once you have it. No stack, no architecture — a media
 * planner or a finance head should be able to read every line of this.
 *
 * Where a figure is indicative rather than measured, the wording says so.
 */

export const products = [
  {
    slug: 'akhani',
    name: 'Akhani',
    subtitle: 'TV Spot Scheduler Pro',
    category: 'Media Planning',
    accent: 'teal',
    url: 'https://akhani.anuvadsoftware.com',
    urlLabel: 'akhani.anuvadsoftware.com',
    status: 'Live',
    oneLiner:
      'Turn a media plan into a date-by-date TV spot schedule in minutes instead of days.',
    hero:
      'Akhani automates the part of TV buying that nobody wants to do by hand. Upload the channel plan you already have, set the campaign dates, decide how heavy each week should be, and Akhani produces the full spot schedule — every channel, every programme, every half-hour slot — ready to download and send to the channel.',
    audience: 'Media agencies, buying units and in-house TV planners',
    problem:
      'A four-week plan across thirty channels is thousands of individual spot placements. Done in Excel, it takes a planner days, it is easy to get wrong, and it has to be redone from scratch every time the client moves the burst.',
    solution:
      'Akhani holds the plan as a live document rather than a grid of typed cells. You tell it how the campaign should be weighted across the weeks and how thinly spots may be spread; it does the placement. Changing your mind costs one click instead of another afternoon.',
    atAGlance: [
      ['Built for', 'Media agencies, buying units and in-house TV planners'],
      ['You bring', 'The channel plan you already work with, as an Excel or CSV file'],
      ['You get back', 'A date-by-date spot schedule, formatted and ready to send on'],
      ['Time to first result', 'Minutes — on work that used to take days'],
      ['Getting started', 'Open it in your browser. Nothing to install, nothing for IT to approve'],
    ],
    howItWorks: [
      {
        title: 'Upload the plan',
        body: 'Drop in the plan file you already have. Akhani checks it as it loads and tells you immediately if a column is missing — you find out now, not after generating.',
      },
      {
        title: 'Set the campaign dates',
        body: 'Pick a start date and how many weeks the campaign runs. The week-by-week split is worked out for you, and you can override any of it.',
      },
      {
        title: 'Shape the weeks',
        body: 'Choose which days each line may run on, how heavily to weight each week, and how thinly spots may be spread. Pushing a whole line into launch week is a double-click.',
      },
      {
        title: 'Generate and send',
        body: 'The finished schedule appears on screen as a plan-by-date grid and downloads as an Excel file a channel or a client can read without explanation.',
      },
    ],
    features: [
      {
        title: 'Works with the plan file you already use',
        body: 'Channel, programme, days, time band, creative, rate, duration and spots — the columns your plans already carry. No re-keying into a new format.',
      },
      {
        title: 'Even, sensible placement',
        body: 'Spots spread properly across the days and half-hour bands a line is allowed to run in, rather than clumping — at least one per half hour wherever the volume supports it.',
      },
      {
        title: 'Change your mind for free',
        body: 'Client moves the burst, adds a week, drops a channel? Adjust and regenerate. The cost of a late change stops being a lost evening.',
      },
      {
        title: 'Control at the line level',
        body: 'Each line in the plan has its own eligible days, its own weekly weighting and its own spread setting. Heavy launch weeks and steady sustain lines can sit in the same campaign.',
      },
      {
        title: 'Output nobody has to interpret',
        body: 'A formatted Excel schedule that goes straight into a channel conversation or a client mail. No screenshots of a tool.',
      },
      {
        title: 'Every campaign kept',
        body: 'Past schedules stay against your account. Next quarter, open the last one, adjust it and regenerate rather than starting from the plan file again.',
      },
    ],
    outcomes: [
      'A planner gets their week back — the scheduling day disappears from the campaign timeline',
      'Late client changes stop being expensive, because regenerating costs one click',
      'Junior planners can run schedules that previously needed senior review',
      'Every campaign is reusable next time, so the second one is faster than the first',
    ],
    plans: [
      {
        name: 'Free',
        price: '₹0',
        note: 'For individuals getting started',
        includes: ['5 schedule generations', 'Excel export', 'Basic support'],
      },
      {
        name: 'Media Agency',
        price: '₹1,500',
        cadence: '/month',
        featured: true,
        note: 'For media teams with professional scheduling needs',
        includes: [
          '100 schedule generations per month',
          'All export formats',
          'Priority support',
          'Optional data retention',
        ],
      },
      {
        name: 'Agency Pro',
        price: '₹22,000',
        cadence: '/month',
        note: 'For large agencies and enterprises',
        includes: [
          '1,000 schedule generations per month',
          'Unlimited users and multi-team collaboration',
          'Advanced analytics and custom branding',
          'Dedicated account manager and SLA support',
        ],
      },
    ],
    pricingNote:
      'International pricing available at $99 and $299 per month. Enterprise terms, private deployment and custom workflows are quoted individually.',
  },

  {
    slug: 'fiscora',
    name: 'Fiscora',
    subtitle: 'Accounting platform for growing businesses',
    category: 'Finance Operations',
    accent: 'sand',
    url: 'https://fiscora.tech',
    urlLabel: 'fiscora.tech',
    status: 'Live',
    oneLiner:
      'GST invoicing, recurring billing, bank matching and returns — running quietly in the background so you barely have to log in.',
    hero:
      'Fiscora handles the full billing cycle for a growing business. Contracts raise their own invoices, send themselves, and chase themselves when they go unpaid. Money coming in matches itself against what is owed. At the end of the quarter, the GST numbers are already assembled. You open it when you want to look, not because something needs doing.',
    audience: 'SMEs, service businesses, consultants, and the accountants who bill for them',
    problem:
      'Small businesses lose days every month raising the same invoices, matching bank entries by eye, and assembling GST returns from three different places. The software that solves it properly is usually priced and shaped for much larger companies.',
    solution:
      'Fiscora covers the whole cycle in one place — customers and vendors, GST invoices, recurring contracts, receipts, bills, bank matching, reports and returns — and does the repetitive parts on its own, without waiting to be asked.',
    atAGlance: [
      ['Built for', 'SMEs, service businesses, consultants and accounting practices'],
      ['You bring', 'Your customer list and what you bill each of them'],
      ['It handles', 'Invoices, payments, bills, bank matching and GST returns'],
      ['Runs itself', 'Recurring invoices raise, email and chase without you touching them'],
      ['Getting started', 'In your browser, on any device. Your logo and bank details go on every invoice'],
    ],
    howItWorks: [
      {
        title: 'Set up once',
        body: 'Company details, your logo and signature, invoice numbering, and your customers with their GST details and what they pay monthly. This is the only long sitting.',
      },
      {
        title: 'Let the billing run',
        body: 'Contracts raise their invoices on the right day and email them out. Overdue reminders go at 7, 15 and 30 days without anyone deciding to send them.',
      },
      {
        title: 'Record what comes in',
        body: 'Payments apply themselves to the oldest open invoices. Import your bank statement and Fiscora proposes the matches; you confirm them one at a time or all at once.',
      },
      {
        title: 'Close the period',
        body: 'Ledgers, aging, profit summary and the GST return figures are already assembled. Print, export, or hand them to your accountant.',
      },
    ],
    features: [
      {
        title: 'The tax is worked out for you',
        body: 'Same-state and inter-state invoices are split correctly without you thinking about it. Branded PDF, amount in words, and the right rate for each customer.',
      },
      {
        title: 'Billing that does not need reminding',
        body: 'Set a contract once. The invoice raises itself every month, sends itself if you want it to, and follows up when it is not paid.',
      },
      {
        title: 'Vendor bills read themselves',
        body: 'Upload the supplier PDF and the amount, date, vendor, tax and bill number come out of it into the record. Foreign-currency bills convert on the way in.',
      },
      {
        title: 'Bank matching without the squinting',
        body: 'Import the statement, review the suggested matches, clear them in bulk. Duplicate protection means importing the same statement twice does no harm.',
      },
      {
        title: 'GST returns already assembled',
        body: 'B2B and B2C summaries, the invoice register, and output tax against input credit with the net payable — ready when the deadline is, not after a scramble.',
      },
      {
        title: 'Your team, with the right access',
        body: 'Add colleagues with roles that fit what they actually do. An accountant running several businesses keeps each one separate, with its own branding.',
      },
    ],
    outcomes: [
      'The monthly billing day disappears — invoices go out whether or not anyone remembers',
      'Receivables get chased consistently instead of whenever someone notices',
      'Quarter-end stops being an archaeology exercise across three systems',
      'Your data stays yours: if a subscription lapses, new entries stop but nothing is ever locked away from you',
    ],
    plans: [
      {
        name: 'Starter',
        price: 'On request',
        note: 'One business, core billing',
        includes: [
          'GST invoices with your branding',
          'Customers and vendors',
          'Payments and expenses',
          'Dashboard and basic reports',
        ],
      },
      {
        name: 'Business',
        price: 'On request',
        featured: true,
        note: 'The full cycle, running itself',
        includes: [
          'Everything in Starter',
          'Recurring billing with automatic sending',
          'Bank import and matching',
          'GST return figures',
          'Team members with roles',
        ],
      },
      {
        name: 'Practice / Partner',
        price: 'On request',
        note: 'For accountants running many clients',
        includes: [
          'Multiple client businesses in one place',
          'Separate branding and plan per client',
          'Usage and revenue overview',
          'Priority support',
        ],
      },
    ],
    pricingNote:
      'Sold on subscription, with each plan setting limits on users, invoices per month and stored documents. An expired subscription stops new entries but never locks anyone out of their own records.',
  },

  {
    slug: 'brimline',
    name: 'Brimline',
    subtitle: 'Reach efficiency and budget optimisation',
    category: 'Media Intelligence',
    accent: 'teal',
    url: 'https://brimline.anuvadsoftware.com',
    urlLabel: 'brimline.anuvadsoftware.com',
    status: 'In client preview',
    oneLiner:
      'What is this plan costing per reach point, which channels are already saturated, and how could the same money reach more people?',
    hero:
      'Upload your latest four-week reach and frequency export, attach a rate card, and Brimline tells you what the plan is actually buying. Digital reach files go through the same analysis; outdoor and competitive spends are summarised beside them, brand by brand. Your plan is stored exactly as it arrived and is never altered — Brimline produces a recommendation you accept, adjust or reject.',
    audience: 'Media agencies, planning leads and advertiser marketing teams',
    problem:
      'Reach curves flatten. Past a point, more money on a channel buys extra frequency against people who have already seen the ad — and nothing in the standard toolkit tells a planner where that point sits for this plan, this week.',
    solution:
      'Think of every channel as a glass and its viewers as the water it can hold. Money poured in reaches new people until the glass is full; after that, the same people just see the ad more often. Brimline works out where each channel fills up — from that channel\'s own numbers in your export, not from an industry assumption — and shows where the next rupee would do more good.',
    atAGlance: [
      ['Built for', 'Media agencies, planning leads and advertiser marketing teams'],
      ['You bring', 'Your latest four-week reach and frequency export, plus a rate card'],
      ['You get back', 'Cost per reach point line by line, which channels are saturated, and where money would work harder'],
      ['Your plan', 'Stored exactly as it came and never modified — the recommendation is yours to accept or reject'],
      ['Also handles', 'Digital reach files, outdoor schedules and competitive spend exports'],
    ],
    howItWorks: [
      {
        title: 'Upload the plan and the rate card',
        body: 'The export you already receive, plus what you are paying. Nothing to re-enter by hand.',
      },
      {
        title: 'See where the money is going',
        body: 'Cost per reach point for every line, and which channels have already covered the audience they can reach.',
      },
      {
        title: 'Read the recommendation',
        body: 'Where the same budget would reach more people, and how much more. Brimline calculates the balance point directly rather than testing combinations, so the answer arrives in one pass.',
      },
      {
        title: 'Decide',
        body: 'Accept it, adjust it, or ignore it. Your original plan is untouched either way, so there is nothing to undo.',
      },
    ],
    features: [
      {
        title: 'Saturation worked out from your own numbers',
        body: 'Where a channel fills up comes out of that channel\'s own reach and rating figures in your export — not a borrowed curve or an industry average standing in for the plan in front of you.',
      },
      {
        title: 'Cost per reach point, line by line',
        body: 'Your rate card against delivered reach, so you can see which lines are earning their budget and which are buying frequency you did not ask for.',
      },
      {
        title: 'TV and digital on the same footing',
        body: 'Digital impressions are restated against the same audience base as television, which is what lets both be compared without arguing about the units.',
      },
      {
        title: 'Honest about what it cannot see',
        body: 'An outdoor schedule with no audience figures carries money and nothing else — and Brimline says so rather than inventing an audience it cannot measure.',
      },
      {
        title: 'Every brand in one table',
        body: 'Clients, brands and campaigns in one workspace. The portfolio view is every brand\'s spend by medium at a glance; a campaign page puts one burst\'s TV and digital side by side.',
      },
      {
        title: 'A category of competitive spend in one upload',
        body: 'A competitive spend export naming brands creates those brands for you — a year of a category loads in a single step instead of a week of tidying.',
      },
      {
        title: 'Total campaign reach, with the assumptions visible',
        body: 'The question every planner is asked and can never quite support. Brimline gives a range rather than a false decimal, shows the assumptions behind it on screen, and says plainly how much the answer moves if those assumptions change.',
      },
    ],
    outcomes: [
      'A defensible answer to "why this split" — with the working visible, not asserted',
      'Saturated channels get caught before the money is committed, not in the post-campaign review',
      'One table for every brand a team runs, instead of a folder of separate decks',
      'Nothing modelled is ever presented as measured, which is what makes the output safe to show a client',
    ],
    plans: [
      {
        name: 'Single brand',
        price: 'On request',
        note: 'One brand, one planning team',
        includes: [
          'TV reach efficiency',
          'Rate card and cost per reach point',
          'Reallocation recommendations',
          'Excel exports',
        ],
      },
      {
        name: 'Agency workspace',
        price: 'On request',
        featured: true,
        note: 'Many brands, many campaigns',
        includes: [
          'Clients, brands and campaigns',
          'Portfolio view across brands and media',
          'Digital alongside television',
          'Competitive spend rollups',
        ],
      },
      {
        name: 'Enterprise',
        price: 'On request',
        note: 'Network and advertiser deployments',
        includes: [
          'Total campaign reach across media',
          'Assumptions tuned to your own research',
          'Private deployment',
          'Method walkthrough with your analytics team',
        ],
      },
    ],
    pricingNote:
      'Licensed to agencies and advertisers. The cross-media reach module is switched on only after its assumptions have been agreed with your team — we will not put a modelled number in front of your client before you have signed off on how it was built.',
  },

  {
    slug: 'returnloop',
    name: 'ReturnLoop',
    subtitle: 'Tracking for returnable packaging',
    category: 'Logistics',
    accent: 'teal',
    url: null,
    urlLabel: null,
    status: 'Release 1',
    oneLiner:
      'Know where every crate, lid and base is — and which parts did not come back on the truck.',
    hero:
      'ReturnLoop tracks returnable packaging across any number of clients, warehouses and locations. Every part of a foldable box — top, middle section and base — carries its own tag, so a missing component is caught at the loading bay rather than discovered at the next pack.',
    audience:
      'Third-party logistics providers, e-commerce fulfilment operators, FMCG distribution and anyone running reusable transit packaging',
    problem:
      'Returnable packaging only saves money if it actually returns. Counted by eye at a loading bay, parts go missing quietly — and by the time the shortfall shows up in a stock count, nobody can say which trip lost them.',
    solution:
      'Every part is tagged and every movement is recorded. Middle sections come in 12, 6 and 4-compartment variants, each counted separately, so a load can be checked against what it should contain before the truck leaves the yard.',
    atAGlance: [
      ['Built for', 'Third-party logistics, fulfilment operators and FMCG distribution'],
      ['You bring', 'Your existing fleet of returnable crates and boxes'],
      ['You get back', 'Where every part is right now, and exactly what did not come back'],
      ['On the floor', 'A handheld scanner that reads a full pallet at a time — no counting by hand'],
      ['Who hears about it', 'Recipients get WhatsApp and email updates; no app for them to install'],
    ],
    howItWorks: [
      {
        title: 'Tag the fleet',
        body: 'Each part — top, middle and base — gets its own tag. Compartment variants are tagged separately so counts are real counts, not a box estimate.',
      },
      {
        title: 'Scan at every handover',
        body: 'Out to a customer, back to the depot, on to another warehouse. A handheld reads a whole stack at once rather than item by item.',
      },
      {
        title: 'Check the load before it leaves',
        body: 'What is on the truck against what should be. The gap is flagged at the dock, while someone can still do something about it.',
      },
      {
        title: 'See the fleet at any moment',
        body: 'A dashboard showing where every part sits, what is overdue back, and which routes lose the most.',
      },
    ],
    features: [
      {
        title: 'Every part counted, not every box estimated',
        body: 'Tops, middles and bases tracked separately, with compartment variants distinguished — so the number on the screen is the number in the yard.',
      },
      {
        title: 'A full history, not just a balance',
        body: 'Every movement is on record. "Where did we lose these" has an answer, and it takes a moment rather than an afternoon.',
      },
      {
        title: 'Losses caught at the dock',
        body: 'Load and unload verification flags a shortfall while the truck is still there — which is the only moment it is cheap to fix.',
      },
      {
        title: 'Many clients, properly separated',
        body: 'Each client organisation sees only its own fleet. That separation is enforced by the system itself, not by remembering to filter — and we can demonstrate it to your security reviewer.',
      },
      {
        title: 'Roles that match how sites actually run',
        body: 'Each client has an administrator who adds their own people and approves access requests, and can give management read-only visibility of the dashboard.',
      },
      {
        title: 'Updates where people already are',
        body: 'WhatsApp and email notifications to the recipients each client chooses. Nobody downloads anything to get told a consignment shipped.',
      },
      {
        title: 'Hardware that stands up to a warehouse',
        body: 'Handhelds that read, write and print tags, and fixed readers at the doors. Quoted transparently: a site with fixed readers is one line, handhelds are another.',
      },
    ],
    outcomes: [
      'Packaging loss becomes a number you manage rather than a cost you absorb',
      'Disputes over what was returned are settled by the record, not by argument',
      'Stock counts stop being an event — the count is always current',
      'The case for reusable packaging finally has evidence behind it',
    ],
    plans: [
      {
        name: 'Single warehouse',
        price: 'On request',
        note: 'One site',
        includes: [
          'Per-part tagging and full movement history',
          'Inward and outward verification',
          'Status dashboard',
          'Email notifications',
        ],
      },
      {
        name: 'Multi-site',
        price: 'On request',
        featured: true,
        note: 'A network of warehouses and routes',
        includes: [
          'Multiple warehouses and locations',
          'Transfers between sites',
          'Handheld scanning and tag printing',
          'WhatsApp and email notifications',
          'Client administrators and access approval',
        ],
      },
      {
        name: 'Enterprise',
        price: 'On request',
        note: 'Large fleets and integrations',
        includes: [
          'Fixed readers at dock doors',
          'Reconciliation and overdue reporting',
          'Connects to your existing warehouse or ERP system',
          'Dedicated support',
        ],
      },
    ],
    pricingNote:
      'Hardware is quoted separately and openly: a warehouse with fixed readers is one line, handheld readers are another. Ask for the device price list and a dock-door layout with your quote.',
  },

  {
    slug: 'warehouse-inventory',
    name: 'Warehouse Inventory Tracking',
    subtitle: 'QR-based inward, outward and live stock',
    category: 'Logistics',
    accent: 'sand',
    url: null,
    urlLabel: null,
    status: 'Production-testable',
    oneLiner:
      'Scan in, scan out, and get a stock figure you can defend — with the full history behind every number.',
    hero:
      'A QR-code inward and outward system for warehouses still running on registers and spreadsheets. Goods are received against a unique code and a printed label; issues are deducted by scanning that label with an ordinary phone camera. Stock is not a number somebody typed — it is what came in minus what went out, with every step on record.',
    audience: 'Warehouses, distribution centres, manufacturing stores and third-party logistics operators',
    problem:
      'Manual registers lose the trail. Spreadsheet stock drifts away from physical stock, nobody can reconstruct what happened on a given day, and the person who would know is on leave.',
    solution:
      'Nothing is ever overwritten or quietly deleted. Every receipt and every issue is added to the record, so the pending quantity under any code is always traceable back through the movements that produced it.',
    atAGlance: [
      ['Built for', 'Warehouses, distribution centres, manufacturing stores and 3PL operators'],
      ['You bring', 'Goods arriving at your dock — no master data project first'],
      ['On the floor', 'An ordinary phone camera reads the label. No scanner hardware to buy'],
      ['You get back', 'Live stock by item and by location, with the full history behind every figure'],
      ['Getting started', 'Runs in a browser. A single small server is enough for most sites'],
    ],
    howItWorks: [
      {
        title: 'Receive against a label',
        body: 'Enter the item, the quantity or the weight, and where it is being put. You get a unique code and a printable QR label that goes on the goods.',
      },
      {
        title: 'Attach the paperwork',
        body: 'Photograph or upload the supplier invoice or delivery note. It stays with the receipt instead of in somebody\'s inbox.',
      },
      {
        title: 'Issue by scanning',
        body: 'On the floor, open it on a phone, point the camera at the label, see what is still pending under that code, and deduct what is going out. Typing the code works too.',
      },
      {
        title: 'Check stock any time',
        body: 'Live pending quantities per code, with totals by item and by location. Click any code to see everything that ever happened to it.',
      },
    ],
    features: [
      {
        title: 'No scanner hardware to buy',
        body: 'Any phone with a camera is the scanning device. Staff use the browser they already have, and typing the code is always there as a fallback.',
      },
      {
        title: 'Received by quantity or by weight',
        body: 'Enter a weight and the quantity is worked out for you. Materials that arrive weighed rather than counted are handled without a workaround.',
      },
      {
        title: 'Labels and numbering handled',
        body: 'Every receipt gets its own sequential code and a printable QR label, so two similar pallets are never confused.',
      },
      {
        title: 'A number you can defend',
        body: 'Behind every stock figure is the full list of what came in and what went out. When a month-end total is disputed, the answer is one click away.',
      },
      {
        title: 'Stock as it stood on any past date',
        body: 'Not just today\'s position — what the stock was on the day in question. Useful the first time someone challenges a closing figure.',
      },
      {
        title: 'The right access for each person',
        body: 'Administrators, receiving staff, issuing staff and managers who can look but not change. New people request access and an administrator approves them.',
      },
      {
        title: 'Customers, pickups and month-end reporting',
        body: 'A customer list, scheduled pickups with a view you can share, and the reporting your client asks for at the end of the month.',
      },
    ],
    outcomes: [
      'Stock counts match the system, because the system is what the floor actually uses',
      'A disputed figure is settled in a click instead of a day of reconstruction',
      'New staff are productive immediately — scanning a label needs no training',
      'The register and the parallel spreadsheet both go away',
    ],
    plans: [
      {
        name: 'Single site',
        price: 'On request',
        note: 'One warehouse',
        includes: [
          'Receiving, issuing and live stock',
          'QR label printing',
          'Phone scanning',
          'Access by role',
        ],
      },
      {
        name: 'Site + reporting',
        price: 'On request',
        featured: true,
        note: 'Operations plus month-end',
        includes: [
          'Everything in Single site',
          'Customer list and pickups',
          'Document capture',
          'Month-end reporting and exports',
          'Nightly backups',
        ],
      },
      {
        name: 'Group',
        price: 'On request',
        note: 'For groups with their own analytics teams',
        includes: [
          'Stock as at any past date',
          'Your analysts can query the data directly',
          'Feeds your existing reporting',
          'Dedicated support',
        ],
      },
    ],
    pricingNote:
      'Hosted by us or on your own server. It is designed to run comfortably on a small machine — we will size it honestly rather than sell you headroom you do not need.',
  },
]

export const productBySlug = (slug) => products.find((p) => p.slug === slug)
