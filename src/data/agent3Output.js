// Pre-computed output from Agent 3: Metrics Narrator
// All data is 100% synthetic/fictional

export const agent3Output = {
  executiveSummary: `## Strategic Metrics Narrative — Q4 Platform Health Assessment

Our product metrics tell a clear story this quarter: **we are growing into a reliability crisis**. While top-line growth remains healthy at 18% YoY ARR expansion, the underlying operational metrics reveal compounding stress fractures that threaten our trajectory. Customer-reported performance incidents have increased 34% quarter-over-quarter, and our P95 API response times have drifted from 800ms to 1,400ms — a 75% degradation that directly correlates with the 3.2x churn multiplier identified in our data analysis.

The most concerning signal is the **convergence of leading indicators**. Enterprise NPS has declined for three consecutive months (from 48 to 31), support ticket volume per account is up 22%, and our trial-to-paid conversion rate has dropped from 38% to 31%. These are not independent trends — they share a common root cause in platform reliability and security posture gaps. When we overlay the $4.2M in ARR flagged as at-risk with the cohort analysis showing 34% churn probability for our highest-value accounts, the revenue implications become urgent.

The good news: **this is a solvable problem with a clear ROI**. Our stable cohort (142 accounts, 6% churn rate, NPS of 52) demonstrates that when the platform performs well, customers are deeply engaged and expanding. The gap between our best and worst customer experiences is not a product-market fit issue — it is an infrastructure and trust gap that engineering investment can close within two quarters.`,

  keyFindings: [
    {
      title: 'Performance Degradation Is the Top Revenue Risk',
      evidence:
        'P95 API latency increased 75% (800ms → 1,400ms) over 6 months. 14 of 50 escalated tickets cite performance. Accounts with >5s page loads churn at 3.2x the baseline rate.',
      implication:
        'Without intervention, we project $2.4M in ARR losses from performance-driven churn in the next two quarters, concentrated in our most valuable enterprise segment.',
    },
    {
      title: 'Security Gaps Are Blocking Enterprise Pipeline',
      evidence:
        'Security review stage blocks 33% of enterprise trials. SOC 2 gaps cited in 68% of lost deals >$100K. SSO and encryption deficiencies flagged in 11 active support escalations.',
      implication:
        'Our enterprise pipeline of $8.2M is at risk of elongated cycles or loss. Competitors with stronger compliance postures are winning deals we should be closing.',
    },
    {
      title: 'Data Integrity Issues Create Disproportionate Executive Escalations',
      evidence:
        'Only 7 tickets but 4.1x more likely to reach executive-level escalation. Audit log gaps affect 3% of write operations. Duplicate record issues undermine trust in reporting.',
      implication:
        'Data integrity incidents, while lower volume, cause the highest reputational damage and longest recovery cycles per affected account.',
    },
    {
      title: 'Integration Reliability Erodes Platform Stickiness Advantage',
      evidence:
        'Webhook delivery failures at 15% during peak. Integrated accounts with reliability issues churn at 2x normal integrated rate. API rate limits cited by 8 accounts.',
      implication:
        'Our strongest retention lever (multi-integration stickiness at 78% lower churn) is being undermined by reliability issues, converting our advantage into a liability.',
    },
  ],

  leadingIndicators: [
    {
      indicator: 'Enterprise NPS Trend',
      currentTrend: 'Declining — dropped from 48 to 31 over 3 months (35% decrease)',
      prediction:
        'If unaddressed, NPS will likely fall below 20 within 60 days, crossing the threshold where peer-referral-driven pipeline begins to contract.',
    },
    {
      indicator: 'Support Ticket Velocity per Account',
      currentTrend: 'Accelerating — 22% QoQ increase in tickets per enterprise account',
      prediction:
        'Current trajectory suggests support team capacity will be exceeded within 45 days, leading to increased response times and further customer dissatisfaction.',
    },
    {
      indicator: 'Trial-to-Paid Conversion Rate',
      currentTrend: 'Declining — from 38% to 31% over two quarters (18% relative decrease)',
      prediction:
        'Each percentage point of conversion loss represents approximately $340K in annual new business. At current trajectory, Q1 new ARR targets will be missed by 15-20%.',
    },
  ],

  riskFactors: [
    {
      risk: 'Cascading Enterprise Churn Event',
      probability: 'High (60-70%)',
      impact:
        '$4.2M ARR at risk if 3+ marquee accounts churn in the same quarter, triggering negative market perception',
      mitigation:
        'Immediate executive engagement with top 10 at-risk accounts paired with a 90-day performance improvement commitment backed by SLA credits.',
    },
    {
      risk: 'Competitive Displacement in Regulated Verticals',
      probability: 'Medium (40-50%)',
      impact:
        '$8.2M enterprise pipeline at risk as competitors achieve compliance certifications we lack',
      mitigation:
        'Fast-track SOC 2 Type II remediation and engage third-party auditor within 30 days. Publish compliance roadmap for sales enablement.',
    },
    {
      risk: 'Engineering Talent Attrition from Technical Debt',
      probability: 'Medium (30-40%)',
      impact:
        'Senior engineers expressing frustration with fire-fighting culture. Loss of 2-3 key engineers would delay all reliability initiatives by 3+ months.',
      mitigation:
        'Dedicate 30% of engineering capacity to reliability work as a visible organizational commitment. Create a "Platform Health" team with clear charter.',
    },
  ],

  opportunityScore: {
    score: 8.2,
    rationale:
      'Despite the urgency of current risks, the opportunity score is high because the problems are well-understood, the solutions are technically feasible within two quarters, and the addressable revenue impact ($4.2M retention + $8.2M pipeline de-risk) significantly exceeds the estimated investment ($1.2-1.5M in engineering resources). The stable cohort proves our product-market fit is strong when the platform performs — this is an execution gap, not a strategy gap.',
  },
};

export default agent3Output;
