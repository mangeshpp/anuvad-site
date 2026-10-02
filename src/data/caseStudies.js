export const caseStudies = [
  {
    slug: 'media-intelligence-platform',
    title: 'Enterprise media intelligence platform',
    client: 'A multinational media agency, for its FMCG client',
    note: 'Client names withheld under NDA.',
    industry: 'Media & FMCG',
    duration: 'Multi-year, three scope expansions',
    summary:
      'One platform that brings television, print and radio data together for a large FMCG advertiser and publishes monthly overview reporting across twelve product categories — replacing a cycle that used to run on analysts, spreadsheets and hope.',
    challenge: [
      'Data arriving in different shapes from three separate sources, none of them agreeing on how a brand was named',
      'Twelve categories, each with its own data history — a single shared calculation was labelling year-to-date and rolling periods wrongly',
      'Month-end taking days of analyst time, with no way to show your working when a number was questioned',
      'Reporting that simply failed to produce national and regional roll-ups at the volumes involved',
    ],
    approach: [
      'Built a single place where all three data sources land, are cleaned and are reconciled against one brand list',
      'Rebuilt that brand list and resolved 156 brands that were missing their franchise, classification or category',
      'Reworked the period logic so every category reports against its own data history rather than a shared assumption',
      'Pre-computed the national and regional roll-ups that had been failing, so they simply appear',
      'Made report generation run in the background with progress on screen, and built a checker that validates every report before it is released',
    ],
    outcomes: [
      ['<60s', 'report generation, from a cycle previously measured in days'],
      ['12', 'product categories reported monthly from one place'],
      ['5×', 'faster reporting turnaround end to end'],
      ['0', 'silent failures — every report is checked for consistency before release'],
    ],
    quote: {
      text:
        'The reporting cycle went from something the team braced for each month to something that simply happened — and when a number is questioned, the trail is right there.',
      attribution: 'Engagement summary, anonymised',
    },
  },
  {
    slug: 'report-consistency-checker',
    title: 'Automated report checking',
    client: 'Internal capability, applied across client reporting',
    note: null,
    industry: 'Media Analytics',
    duration: 'Ongoing',
    summary:
      'A layer that reads a finished monthly report and tries to break it — before a client does. It checks that the sheets agree with each other, that quarterly and annual totals add up, that regional figures roll into national ones, that periods are labelled correctly, that derived ratios make sense, and that no brand has been counted twice.',
    challenge: [
      'A monthly report is hundreds of derived figures across many sheets; one upstream change can quietly break one of them',
      'Errors found by the client cost credibility that is expensive to rebuild',
      'Reviewing by hand does not scale across twelve categories every month',
    ],
    approach: [
      'Wrote down every rule the report is supposed to satisfy, and made each one checkable',
      'Made category boundaries a hard rule — categories are never mixed into one another under any circumstance',
      'Produced a findings workbook so a reviewer sees exactly which figure broke which rule',
      'Ran it as a gate before publication, rather than as a post-mortem afterwards',
    ],
    outcomes: [
      ['6', 'independent families of checks run on every report'],
      ['Pre-release', 'errors surface before the client sees them, not after'],
      ['Repeatable', 'the same standard every month, whoever prepared the report'],
    ],
    quote: null,
  },
]
