// Pre-computed output from Agent 2: Data Scientist
// All data is 100% synthetic/fictional

export const agent2Output = {
  summary:
    'Quantitative analysis across product telemetry, support data, and revenue metrics confirms strong statistical relationships between the identified feedback themes and key business outcomes. Performance degradation shows the highest correlation with churn risk (r=0.84), followed by security concerns correlating with deal-cycle delays (r=0.78).',

  correlations: [
    {
      theme: 'Performance & Scalability',
      metric: 'Monthly Active User Retention',
      correlationStrength: 0.84,
      confidenceInterval: '95% CI: 0.78-0.90',
      insight:
        'Accounts experiencing >5s average page load times show 3.2x higher churn probability. Each additional second of latency correlates with a 7% drop in weekly active usage.',
    },
    {
      theme: 'Security & Compliance',
      metric: 'Enterprise Deal Close Rate',
      correlationStrength: 0.78,
      confidenceInterval: '95% CI: 0.72-0.84',
      insight:
        'Prospects requiring SOC 2 attestation have a 45-day longer sales cycle. Security-related objections appear in 68% of lost enterprise deals over $100K ARR.',
    },
    {
      theme: 'Feature Gaps & UX',
      metric: 'Net Promoter Score (NPS)',
      correlationStrength: 0.71,
      confidenceInterval: '95% CI: 0.63-0.79',
      insight:
        'Users who submit feature requests that remain unaddressed for >90 days show a 22-point NPS decline. The mobile experience gap drives 40% of detractor responses.',
    },
    {
      theme: 'API & Integration',
      metric: 'Platform Stickiness Index',
      correlationStrength: 0.65,
      confidenceInterval: '95% CI: 0.56-0.74',
      insight:
        'Accounts with 3+ active integrations have 78% lower churn than single-product users. However, webhook reliability issues erode this advantage — integrated accounts with delivery failures churn at 2x the normal integrated rate.',
    },
    {
      theme: 'Data Integrity & Reliability',
      metric: 'Support Ticket Escalation Rate',
      correlationStrength: 0.59,
      confidenceInterval: '95% CI: 0.49-0.69',
      insight:
        'Data integrity issues generate 4.1x more executive-level escalations than other ticket categories. While lower in volume, each incident has outsized reputational impact and requires senior engineering involvement.',
    },
  ],

  cohortAnalysis: {
    highChurnCohort: {
      description:
        'Accounts with ARR > $50K that have filed 2+ performance or security tickets in the last 90 days',
      size: 23,
      avgArr: 187000,
      churnProbability: 0.34,
      avgNps: -12,
      commonCharacteristics: [
        'Heavy API usage (>10K calls/day)',
        'Multi-region deployment requirements',
        'Regulated industry (fintech, healthcare)',
      ],
    },
    stableCohort: {
      description:
        'Accounts with fewer than 2 support tickets in the last 90 days and consistent usage patterns',
      size: 142,
      avgArr: 95000,
      churnProbability: 0.06,
      avgNps: 52,
      commonCharacteristics: [
        'Moderate usage patterns (<5K API calls/day)',
        'Single-region deployment',
        'Adopted in last 18 months with guided onboarding',
      ],
    },
  },

  funnelAnalysis: {
    description:
      'Enterprise trial-to-paid conversion funnel analysis reveals three critical drop-off points tied to feedback themes.',
    stages: [
      { stage: 'Trial Signup', conversionRate: 1.0, dropOffReason: null },
      {
        stage: 'First Value Moment',
        conversionRate: 0.72,
        dropOffReason:
          'Performance issues during initial data import cause 28% of trials to stall at onboarding',
      },
      {
        stage: 'Security Review',
        conversionRate: 0.48,
        dropOffReason:
          'InfoSec teams block 33% of trials due to missing compliance certifications or encryption gaps',
      },
      {
        stage: 'Integration Setup',
        conversionRate: 0.39,
        dropOffReason:
          'API rate limits and webhook reliability concerns deter 19% of accounts from connecting production systems',
      },
      {
        stage: 'Paid Conversion',
        conversionRate: 0.31,
        dropOffReason:
          'Final objections center on long-term scalability and data integrity guarantees',
      },
    ],
  },

  statisticalSummary:
    'Across all five themes, a multivariate regression model (R²=0.73, p<0.001) confirms that Performance & Scalability and Security & Compliance are the two strongest predictors of both churn risk and expansion revenue stalls. The model estimates that resolving the top-priority issues could reduce 90-day churn probability by 40-55% for the high-risk cohort (23 accounts, $4.3M combined ARR) and improve trial-to-paid conversion by 8-12 percentage points. The data strongly supports a platform reliability investment over new feature development in the next quarter.',
};

export default agent2Output;
