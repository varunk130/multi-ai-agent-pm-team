/**
 * Synthetic Product Metrics Data
 * 6-month SaaS metric trends for pipeline demonstration.
 *
 * DISCLAIMER: All data is entirely synthetic and fictional.
 * No real business metrics were used.
 *
 * Built by Varun Kulkarni
 */

export const monthlyMetrics = [
  {
    month: 'Oct 2025',
    mrr: 2850000,
    churnRate: 3.2,
    nps: 42,
    dau: 12400,
    featureAdoption: 67,
    supportTickets: 340,
    avgResolutionHours: 18,
    csat: 78,
    trialConversion: 22,
    expansionRevenue: 145000,
  },
  {
    month: 'Nov 2025',
    mrr: 2920000,
    churnRate: 3.5,
    nps: 39,
    dau: 12100,
    featureAdoption: 65,
    supportTickets: 380,
    avgResolutionHours: 22,
    csat: 75,
    trialConversion: 20,
    expansionRevenue: 130000,
  },
  {
    month: 'Dec 2025',
    mrr: 2880000,
    churnRate: 4.1,
    nps: 36,
    dau: 11800,
    featureAdoption: 63,
    supportTickets: 420,
    avgResolutionHours: 25,
    csat: 72,
    trialConversion: 18,
    expansionRevenue: 110000,
  },
  {
    month: 'Jan 2026',
    mrr: 2840000,
    churnRate: 4.5,
    nps: 33,
    dau: 11500,
    featureAdoption: 61,
    supportTickets: 460,
    avgResolutionHours: 28,
    csat: 69,
    trialConversion: 16,
    expansionRevenue: 95000,
  },
  {
    month: 'Feb 2026',
    mrr: 2790000,
    churnRate: 4.8,
    nps: 31,
    dau: 11200,
    featureAdoption: 58,
    supportTickets: 490,
    avgResolutionHours: 30,
    csat: 67,
    trialConversion: 15,
    expansionRevenue: 82000,
  },
  {
    month: 'Mar 2026',
    mrr: 2750000,
    churnRate: 5.1,
    nps: 28,
    dau: 10900,
    featureAdoption: 55,
    supportTickets: 520,
    avgResolutionHours: 32,
    csat: 64,
    trialConversion: 14,
    expansionRevenue: 70000,
  },
];

export const metricDefinitions = {
  mrr: { label: 'Monthly Recurring Revenue', unit: 'USD', format: 'currency' },
  churnRate: { label: 'Monthly Churn Rate', unit: '%', format: 'percentage' },
  nps: { label: 'Net Promoter Score', unit: 'points', format: 'number' },
  dau: { label: 'Daily Active Users', unit: 'users', format: 'number' },
  featureAdoption: { label: 'Feature Adoption Rate', unit: '%', format: 'percentage' },
  supportTickets: { label: 'Support Tickets', unit: 'count', format: 'number' },
  avgResolutionHours: { label: 'Avg Resolution Time', unit: 'hours', format: 'number' },
  csat: { label: 'Customer Satisfaction', unit: '%', format: 'percentage' },
  trialConversion: { label: 'Trial Conversion Rate', unit: '%', format: 'percentage' },
  expansionRevenue: { label: 'Expansion Revenue', unit: 'USD', format: 'currency' },
};

export const metricsTrend = {
  direction: 'declining',
  keyInsights: [
    'MRR declined 3.5% over 6 months ($2.85M → $2.75M)',
    'Churn rate increased 59% (3.2% → 5.1%)',
    'NPS dropped 33% (42 → 28)',
    'Support tickets increased 53% (340 → 520)',
    'Trial conversion dropped 36% (22% → 14%)',
  ],
};
