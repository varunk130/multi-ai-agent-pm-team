// Pre-computed output from Agent 6: Stakeholder Translator
// All data is 100% synthetic/fictional

export const agent6Output = {
  communications: {
    engineering: {
      audience: 'Engineering Team',
      subject: 'Platform Reliability & Trust Initiative — Technical Kickoff',
      tone: 'technical',
      content: `### What We're Doing and Why

We're launching a 24-week initiative to address the infrastructure and reliability issues that have been driving escalations and on-call pain. This isn't a management-imposed directive — the data from our own systems confirms what many of you have been saying: our P95 API latency has drifted to 1,400ms, our bulk import pipeline can't handle 50K-row jobs without timing out, and we have known security gaps (encryption-at-rest, SSO token invalidation) that are blocking enterprise deals.

### Technical Scope

The work breaks into four phases. **Phase 1 (weeks 1-4)** focuses on quick wins we can ship immediately: CDN deployment, the SSO token revocation hotfix, enabling encryption-at-rest on attachment storage, and a thorough technical debt audit to scope the remaining work accurately. **Phase 2 (weeks 5-14)** is the core infrastructure push — database query optimization (top 20 slow queries), connection pooling, read-replica routing, and API tier auto-scaling. **Phase 3 (weeks 15-20)** covers compliance hardening: audit log completeness, data integrity constraints, and SOC 2 remediation. **Phase 4 (weeks 21-24)** is validation through load testing, penetration testing, and customer beta.

### What This Means for You

We're allocating 60% of engineering capacity to this initiative — 12 engineers across backend, infrastructure, and security. We'll be forming a dedicated "Platform Health" team with a clear charter. The goal is to eliminate the fire-fighting cycle and build infrastructure we're proud of. If you've been frustrated by the technical debt, this is the investment you've been asking for.

### How We'll Work

Each phase has clear milestones and we'll run two-week sprints with demo days. Architecture decisions will be documented in ADRs, and we'll use pair programming on critical paths to distribute knowledge. The assessment phase (weeks 1-4) is your opportunity to surface issues you know about that might not be in the ticket data.`,
      keyPoints: [
        'P95 latency target: <500ms (down from 1,400ms) — real, measured improvements',
        'Dedicated Platform Health team with 60% of engineering capacity for 24 weeks',
        'Quick wins shipping in first 4 weeks — CDN, SSO fix, encryption-at-rest',
        'Assessment phase designed to capture ground-truth knowledge from the team before committing to hard milestones',
      ],
      callToAction:
        'Review the technical scope document and flag any additional infrastructure concerns during next week\'s architecture review. We want your input before we finalize the Phase 2 work breakdown.',
    },

    executive: {
      audience: 'Executive Leadership Team',
      subject: 'Strategic Recommendation: Platform Reliability Investment to Protect $12.4M Revenue Exposure',
      tone: 'strategic',
      content: `### Situation Assessment

Our analysis of 50 escalated enterprise support tickets, correlated with product telemetry and revenue data, reveals a converging reliability crisis. Performance degradation, security compliance gaps, and data integrity issues collectively put **$4.2M in existing ARR at immediate risk** and are **blocking $8.2M in enterprise pipeline** — a combined $12.4M revenue exposure. Three accounts in active renewal negotiations have cited these issues as decision factors.

### Recommended Action

We recommend launching a **"Platform Reliability & Trust" initiative** as the company's top priority for the next two quarters. This requires reallocating 60% of engineering capacity (12 engineers) from new feature development to infrastructure, security, and data integrity improvements. The estimated investment is $1.2-1.5M in engineering resources against a $12.4M revenue exposure — a highly favorable risk-adjusted return.

### Expected Outcomes

The initiative targets measurable business outcomes: reducing the high-risk cohort's 90-day churn rate from 34% to <12%, improving trial-to-paid conversion from 31% to 39%+, and restoring enterprise NPS from 31 to 45+. Quick wins deploying within the first 4 weeks will demonstrate immediate progress to at-risk customers while the deeper infrastructure work progresses.

### Trade-offs

This prioritization delays the feature roadmap by 4-6 months. We'll maintain 15% engineering capacity for competitive-response items and have identified specific triggers for re-evaluation. The data strongly indicates that continued feature development without addressing reliability will result in net negative revenue impact — we'd be adding features to a platform that customers are leaving.`,
      keyPoints: [
        '$12.4M combined revenue exposure ($4.2M at-risk ARR + $8.2M blocked pipeline)',
        '24-week initiative with $1.2-1.5M investment against 8-10x revenue protection',
        'Quick wins in first 4 weeks provide immediate customer-facing progress',
        'Feature roadmap delayed 4-6 months — net positive revenue decision based on quantitative analysis',
      ],
      callToAction:
        'Approve the resource reallocation and sponsor the executive communication to sales leadership this week. The renewal timeline for three key accounts makes immediate action critical.',
    },

    board: {
      audience: 'Board of Directors',
      subject: 'Q4 Strategic Update: Platform Investment to Secure Enterprise Revenue Base',
      tone: 'financial',
      content: `### Revenue Risk and Strategic Response

Management has identified a platform reliability gap that represents material revenue risk. Quantitative analysis of customer support data, product metrics, and pipeline status indicates **$4.2M in ARR at elevated churn risk** (34% probability within 90 days) and **$8.2M in enterprise pipeline delayed** by security compliance gaps. The combined $12.4M exposure represents approximately 18% of our current ARR base.

### Investment Thesis

We are reallocating 60% of engineering capacity for two quarters to a "Platform Reliability & Trust" initiative. The estimated cost is $1.2-1.5M in engineering resources (opportunity cost of deferred feature development). The expected return is protection of $3.4-4.2M in at-risk ARR, acceleration of $5-6M in enterprise pipeline, and a structural improvement in our competitive position in regulated verticals (fintech, healthcare) — our fastest-growing segments.

### Key Performance Indicators

The board should expect to see the following metrics improve over the 24-week initiative period: 90-day enterprise churn rate (34% → <12%), trial-to-paid conversion (31% → 39%), enterprise NPS (31 → 45+), and P95 API latency (1,400ms → <500ms). We will provide monthly updates against these benchmarks.

### Risk Factors

The primary risks are: timeline extension if technical debt is deeper than assessed (mitigated by a 4-week assessment phase), competitive feature launches during the reliability focus (mitigated by 15% reserved capacity), and execution risk on the security certification timeline. Management has developed specific mitigation plans for each scenario and will escalate to the board if any materialize.`,
      keyPoints: [
        '$12.4M revenue exposure represents ~18% of ARR base — material risk requiring board awareness',
        '$1.2-1.5M investment with clear ROI thesis: 8-10x revenue protection ratio',
        'Monthly KPI reporting against defined benchmarks (churn, conversion, NPS, latency)',
        'Risk mitigations in place with defined escalation triggers',
      ],
      callToAction:
        'Acknowledge the strategic reallocation and approve the updated quarterly plan. Management will provide the first progress report at the next monthly board update.',
    },

    customer: {
      audience: 'Enterprise Customers',
      subject: 'Investing in Platform Reliability — Our Commitment to Your Success',
      tone: 'reassuring',
      content: `### Our Commitment to You

We've been listening carefully to your feedback, and we want to be transparent: the performance and reliability of our platform has not met the standards you deserve. We've heard your concerns about response times, data processing speed, and security capabilities — and we're taking decisive action.

### What We're Doing

Starting this quarter, we are making **platform reliability our #1 company priority**. We've dedicated a significant portion of our engineering team to a focused initiative that will deliver measurable improvements in three areas you've told us matter most: **performance** (faster load times, more reliable data operations), **security** (enhanced encryption, stronger access controls, compliance certifications), and **data integrity** (more reliable integrations, complete audit trails).

### What You'll See

You'll begin seeing improvements within the first few weeks. We're deploying infrastructure upgrades that will noticeably reduce page load times and eliminate timeout errors during large data operations. Over the following months, we'll be rolling out enhanced security capabilities, improved integration reliability, and strengthened data integrity safeguards. We'll share specific timelines and progress updates through your account team.

### Your Feedback Matters

This initiative was directly shaped by the feedback you and other customers have shared with us. We're committed to maintaining this open dialogue as we execute on these improvements. Your account manager will be reaching out to discuss how these changes address your specific needs and to gather any additional input.`,
      keyPoints: [
        'Platform reliability is now the company\'s #1 priority — dedicated engineering investment',
        'Improvements begin within weeks, with major milestones over the next two quarters',
        'Three focus areas: performance, security, and data integrity — based on your feedback',
        'Account team will provide personalized updates on improvements relevant to you',
      ],
      callToAction:
        'Reach out to your account manager with any specific reliability concerns you\'d like us to prioritize. We want to make sure this initiative addresses your most critical needs.',
    },

    sales: {
      audience: 'Sales & Customer Success Team',
      subject: 'Platform Reliability Initiative — Sales Enablement Brief',
      tone: 'enabling',
      content: `### Why This Is Good News for Your Pipeline

We know that reliability and security concerns have been making your jobs harder — longer sales cycles, deal objections you can't overcome, and renewal conversations that start on the back foot. The leadership team has made the decision to address this head-on with a major engineering investment. Here's what it means for you and your deals.

### What to Tell Customers and Prospects

You now have a concrete story to tell: the company is investing its top engineering talent in a 24-week reliability initiative. **Quick wins are shipping within 4 weeks** — including performance improvements, a critical security fix, and enhanced encryption. For prospects stuck in security review, we'll have a published compliance roadmap you can share within 2 weeks, and SOC 2 remediation will be complete within 20 weeks.

### Handling the Feature Roadmap Question

Yes, this means some planned features are being deferred by 4-6 months. Here's how to frame it: "We're investing in making the platform faster, more secure, and more reliable before adding new capabilities. The features on our roadmap are coming — but they'll be built on a stronger foundation." For specific deals that depend on committed features, flag them to your manager so we can assess case-by-case.

### Account-Level Talking Points

For **at-risk renewals**: Lead with the reliability investment as evidence of our commitment. Offer early access to improvements and direct engineering engagement for their top issues. For **new enterprise prospects**: Position the reliability initiative as a differentiator — "We're a company that prioritizes platform trust over feature velocity." For **competitive situations**: Emphasize our concrete investment and timeline versus competitor promises.`,
      keyPoints: [
        'Quick wins (performance, security) shipping in 4 weeks — immediate proof points for customer conversations',
        'Published compliance roadmap available within 2 weeks for prospects in security review',
        'Feature deferrals of 4-6 months — positioning guidance provided above',
        'Flag feature-dependent deals to your manager for case-by-case assessment',
      ],
      callToAction:
        'Review your top 10 accounts against the reliability themes (performance, security, data integrity) and identify which ones should receive proactive outreach this week. Bring your list to Thursday\'s pipeline review.',
    },
  },
};

export default agent6Output;
