// Pre-computed output from Agent 1: Customer Feedback Pipeline
// All data is 100% synthetic/fictional

export const agent1Output = {
  summary:
    'Analysis of 50 enterprise support tickets reveals five dominant themes. Performance and security concerns account for 60% of total ARR at risk ($4.2M), with critical escalations concentrated in the top two themes. Immediate action on infrastructure reliability and compliance gaps is recommended.',

  themes: [
    {
      name: 'Performance & Scalability',
      ticketCount: 14,
      avgSeverity: 'critical',
      totalArrImpact: 2350000,
      sampleTickets: [
        'Dashboard load times exceed 12s for accounts with >10k records, causing daily user complaints',
        'Bulk import of 50k rows triggers 504 gateway timeout — blocks quarterly data migration workflows',
        'Real-time analytics widget freezes under concurrent usage (>200 sessions)',
      ],
      urgencyScore: 9,
    },
    {
      name: 'Security & Compliance',
      ticketCount: 11,
      avgSeverity: 'critical',
      totalArrImpact: 1850000,
      sampleTickets: [
        'SOC 2 Type II audit flagged missing encryption-at-rest for attachment storage',
        'SSO session tokens not invalidated after password reset — potential unauthorized access window',
        'GDPR data export request takes 14 business days vs. contractual SLA of 5 days',
      ],
      urgencyScore: 9,
    },
    {
      name: 'Feature Gaps & UX',
      ticketCount: 10,
      avgSeverity: 'high',
      totalArrImpact: 980000,
      sampleTickets: [
        'No native support for custom approval workflows — customers building fragile workarounds',
        'Mobile app lacks offline mode, unusable for field teams in low-connectivity areas',
      ],
      urgencyScore: 7,
    },
    {
      name: 'API & Integration',
      ticketCount: 8,
      avgSeverity: 'high',
      totalArrImpact: 720000,
      sampleTickets: [
        'Webhook delivery failures spike to 15% during peak hours — integration partners losing trust',
        'REST API rate limits hit by customers with legitimate automation workflows at 100 req/min',
      ],
      urgencyScore: 6,
    },
    {
      name: 'Data Integrity & Reliability',
      ticketCount: 7,
      avgSeverity: 'medium',
      totalArrImpact: 540000,
      sampleTickets: [
        'Duplicate records appearing after concurrent edits on shared entities',
        'Audit log gaps — 3% of write operations missing from compliance trail',
        'Scheduled report exports occasionally deliver stale data from cache',
      ],
      urgencyScore: 7,
    },
  ],

  priorityRanking: [
    'Performance & Scalability',
    'Security & Compliance',
    'Data Integrity & Reliability',
    'Feature Gaps & UX',
    'API & Integration',
  ],

  keyInsight:
    'The top two themes — Performance & Scalability and Security & Compliance — together represent 50% of all tickets and 65% of ARR at risk ($4.2M). Three enterprise accounts in active renewal negotiations have cited both themes as blockers, making this a combined platform reliability crisis rather than two separate issues.',
};

export default agent1Output;
