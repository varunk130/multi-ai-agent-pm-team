// Pre-computed output from Agent 4: Chief of Staff
// All data is 100% synthetic/fictional

export const agent4Output = {
  strategicRecommendation:
    'Launch a "Platform Reliability & Trust" initiative as the top company priority for the next two quarters, reallocating 60% of engineering capacity from new feature development to infrastructure, security, and data integrity improvements.',

  options: [
    {
      name: 'Platform Reliability & Trust',
      description:
        'A focused two-quarter initiative addressing the top three feedback themes — Performance & Scalability, Security & Compliance, and Data Integrity — as a unified platform reliability program. This option treats infrastructure as a product and invests in the foundation before expanding features.',
      pros: [
        'Directly addresses $4.2M ARR at risk from the highest-severity customer issues',
        'De-risks $8.2M enterprise pipeline blocked by security and compliance gaps',
        'Reduces support ticket volume by an estimated 35-45%, freeing team capacity',
        'Improves engineering morale by tackling technical debt that causes fire-fighting',
        'Creates competitive differentiation in regulated verticals (fintech, healthcare)',
      ],
      cons: [
        'Delays feature roadmap items by 4-6 months, impacting some prospect commitments',
        'Requires difficult prioritization conversation with sales team on feature-dependent deals',
        'Short-term NPS may not improve immediately — benefits compound over 60-90 days',
      ],
      timelineWeeks: 24,
      estimatedImpact:
        'Retain $3.4-4.2M at-risk ARR, accelerate $5-6M of enterprise pipeline, improve trial conversion by 8-12 percentage points',
      confidenceLevel: 'High — supported by strong quantitative evidence and clear causal mechanisms',
    },
    {
      name: 'Feature-First Growth Acceleration',
      description:
        'Continue current roadmap velocity with focus on closing feature gaps (custom workflows, mobile offline, advanced analytics) that prospects and customers have requested. Address reliability issues reactively as they arise.',
      pros: [
        'Maintains feature delivery cadence expected by sales team and prospects',
        'Addresses NPS detractors citing missing features (40% of detractor feedback)',
        'Keeps competitive parity on functionality with market leaders',
      ],
      cons: [
        'Does not address the root cause of $4.2M ARR at risk — reliability issues will compound',
        'Enterprise pipeline will remain blocked by security/compliance gaps',
        'Engineering team burnout from ongoing fire-fighting will likely accelerate attrition',
        'Technical debt continues to accumulate, making future reliability work more expensive',
      ],
      timelineWeeks: 16,
      estimatedImpact:
        'Win $1.5-2M in feature-dependent deals, but risk losing $3-4M from unaddressed reliability churn',
      confidenceLevel:
        'Low — addresses symptoms but not root causes; net revenue impact likely negative',
    },
    {
      name: 'Balanced Split (50/50)',
      description:
        'Split engineering capacity equally between reliability improvements and new feature development. Attempt to make incremental progress on both fronts simultaneously.',
      pros: [
        'Politically easier — avoids fully pausing either reliability or feature work',
        'Shows progress on both fronts in quarterly reviews',
        'Reduces risk of total roadmap stoppage perception by customers',
      ],
      cons: [
        'Neither track gets sufficient resources to achieve meaningful milestones',
        'Reliability improvements take 2x longer, leaving at-risk revenue exposed for extended period',
        'Context-switching overhead reduces effective engineering output by 20-30%',
        'Historical precedent at this company shows 50/50 splits deliver 30% of each goal, not 50%',
      ],
      timelineWeeks: 36,
      estimatedImpact:
        'Moderate improvement on both fronts but neither achieves the threshold needed to move key metrics meaningfully',
      confidenceLevel:
        'Medium — theoretically reasonable but empirically underperforms in similar organizations',
    },
  ],

  recommendation: {
    selectedOption: 'Platform Reliability & Trust',
    rationale: `The quantitative evidence overwhelmingly supports prioritizing platform reliability. The $4.2M in at-risk ARR and $8.2M in blocked pipeline represent a combined $12.4M revenue exposure — roughly 4x the estimated cost of the reliability initiative. More importantly, the data shows these are not independent risks: performance, security, and data integrity issues share common infrastructure root causes, and addressing them as a unified program creates compounding benefits. The stable customer cohort proves our product-market fit is strong when the platform performs well.

The timing argument is equally compelling. Three enterprise accounts in active renewal negotiations have cited reliability as the decision factor. Our trial-to-paid conversion rate is declining at 18% per quarter. And our leading indicators (NPS trajectory, support ticket velocity) suggest we have a 60-90 day window before the situation becomes materially harder to reverse. Delaying this investment by even one quarter could convert a recoverable situation into a structural retention problem. The Feature-First option is a trap — it optimizes for visible activity at the cost of foundational health.`,
    quickWins: [
      'Deploy CDN and query optimization to reduce P95 latency by 40% within 3 weeks',
      'Enable encryption-at-rest for attachment storage — 1-week engineering effort, closes top SOC 2 gap',
      'Fix SSO token invalidation bug — 2-day hotfix that addresses an active security escalation',
      'Implement database-level unique constraints to prevent duplicate record creation — 1-week effort',
      'Publish a customer-facing "Platform Reliability Roadmap" to demonstrate commitment and buy time with at-risk accounts',
    ],
  },

  premortem: {
    whatCouldGoWrong: [
      'Sales team pushback causes leadership to reverse the prioritization decision at week 4, wasting the initial investment and demoralizing engineering',
      'Reliability improvements take longer than estimated because technical debt is deeper than assessed, pushing the timeline from 24 to 36+ weeks',
      'A major competitor launches a feature that captures market attention, creating urgency to pivot back to feature development before reliability work is complete',
    ],
    mitigations: [
      'Pre-align sales leadership with executive sponsor. Present the revenue-at-risk data directly and offer co-branded customer communications explaining the investment. Create a "feature commitment" tracker for deals that need specific capabilities.',
      'Build a 4-week assessment phase into the plan where engineering audits the full scope before committing to milestones. Use the quick wins to build momentum and confidence while the deeper work is scoped.',
      'Maintain a small (15%) feature capacity for competitive-response items. Monitor competitive landscape weekly and define specific triggers that would warrant re-evaluation of the split.',
    ],
  },

  resourceRequirements: {
    engineering: {
      headcount: '12 engineers (8 backend, 2 infrastructure, 2 security)',
      allocation: '60% of total engineering capacity for 24 weeks',
      keyRoles: [
        'Senior backend engineer as tech lead',
        'Security engineer for compliance workstream',
        'Database specialist for data integrity and performance',
      ],
    },
    design: {
      headcount: '1 designer (part-time)',
      allocation: '20% for status dashboards and monitoring UI improvements',
      keyRoles: ['Product designer for internal tooling and customer-facing status page'],
    },
    pm: {
      headcount: '1 dedicated PM + 1 supporting PM',
      allocation: 'Full-time program management for 24 weeks',
      keyRoles: [
        'Program PM to coordinate across workstreams and manage stakeholder communication',
        'Technical PM to own the compliance and security certification workstream',
      ],
    },
    timeline: {
      phases: [
        {
          name: 'Quick Wins & Assessment',
          duration: '4 weeks',
          goals: 'Deploy immediate fixes, complete technical debt audit, finalize detailed plan',
        },
        {
          name: 'Core Infrastructure',
          duration: '10 weeks',
          goals:
            'Database optimization, caching layer, API performance improvements, encryption and SSO fixes',
        },
        {
          name: 'Compliance & Hardening',
          duration: '6 weeks',
          goals:
            'SOC 2 Type II remediation, audit log completeness, data integrity safeguards, third-party audit engagement',
        },
        {
          name: 'Validation & Launch',
          duration: '4 weeks',
          goals:
            'Load testing, security penetration testing, customer beta validation, public reliability roadmap update',
        },
      ],
      totalDuration: '24 weeks',
      keyMilestones: [
        'Week 4: Quick wins deployed, detailed plan approved',
        'Week 10: P95 latency reduced by 50%, encryption-at-rest complete',
        'Week 16: SOC 2 gaps remediated, audit engagement started',
        'Week 20: All critical reliability improvements in production',
        'Week 24: External audit complete, customer validation positive, program retrospective',
      ],
    },
  },
};

export default agent4Output;
