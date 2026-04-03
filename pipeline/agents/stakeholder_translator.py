"""
Agent 6 — Stakeholder Translator.

Generates five audience-tailored communications from the PRD and pipeline
context. Each communication uses the appropriate tone, framing, and detail
level for its target audience.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

from typing import Any

from pipeline.agents.base import BaseAgent
from pipeline.models import (
    Agent1Output,
    Agent3Output,
    Agent4Output,
    Agent5Output,
    Agent6Output,
    StakeholderCommunication,
)


class StakeholderTranslatorAgent(BaseAgent):
    """Agent 6 — audience-adaptive communication generation."""

    @property
    def name(self) -> str:
        return "Stakeholder Translator"

    @property
    def agent_number(self) -> int:
        return 6

    @property
    def cognitive_function(self) -> str:
        return "Audience-Adaptive Communication"

    @property
    def color(self) -> str:
        return "#ef4444"

    def _engineering_communication(
        self, agent1: Agent1Output, agent4: Agent4Output, agent5: Agent5Output
    ) -> StakeholderCommunication:
        """Generate the engineering team communication."""
        top_themes = agent1.priority_ranking[:3]
        return StakeholderCommunication(
            audience="engineering",
            subject=f"[Action Required] Platform Hardening Sprint — {', '.join(top_themes)}",
            tone="technical",
            content=(
                f"## Engineering Brief: Platform Hardening Initiative\n\n"
                f"### Context\n"
                f"We've analyzed {agent1.total_tickets_analyzed} customer feedback tickets and "
                f"identified {len(agent1.themes)} recurring themes. The data shows strong "
                f"correlations between these issues and declining product health metrics.\n\n"
                f"### Scope\n"
                f"This is a 12-week initiative targeting three workstreams:\n\n"
                f"**1. API Performance & Reliability**\n"
                f"- Connection pool memory leak fix (P0)\n"
                f"- Batch endpoint horizontal scaling\n"
                f"- GraphQL N+1 resolution with DataLoader\n"
                f"- Rate limit tier system implementation\n"
                f"- Webhook exponential backoff\n\n"
                f"**2. Security & Compliance**\n"
                f"- Audit logging service (immutable event store)\n"
                f"- RBAC engine with role inheritance\n"
                f"- Multi-tenant isolation verification\n"
                f"- GDPR deletion automation (<48h)\n"
                f"- IP allowlisting for API access\n\n"
                f"**3. Authentication Hardening**\n"
                f"- SAML SSO flow reliability (target 99.5%)\n"
                f"- SCIM sync latency reduction (<15 min)\n"
                f"- 2FA for service accounts\n"
                f"- Single sign-out propagation\n\n"
                f"### Technical Requirements\n"
                f"See the full PRD for {len(agent5.technical_requirements)} detailed requirements "
                f"with priority classifications (P0/P1/P2).\n\n"
                f"### Timeline\n"
                f"- Weeks 1-2: Architecture review and design\n"
                f"- Weeks 3-8: Core implementation\n"
                f"- Weeks 9-10: Integration testing and beta\n"
                f"- Weeks 11-12: Staged rollout and monitoring\n\n"
                f"### Team\n"
                f"6 engineers, 1 PM, 1 designer. Separate on-call rotation maintained."
            ),
            key_points=[
                f"12-week sprint targeting {', '.join(top_themes)}",
                f"P0 items: connection pool fix, audit logging, RBAC, SSO hardening",
                f"6 engineers needed — separate from on-call rotation",
                f"Architecture review in weeks 1-2, staged rollout weeks 11-12",
                f"Full PRD with {len(agent5.technical_requirements)} technical requirements available",
            ],
            call_to_action=(
                "Review the PRD and flag any technical concerns by Friday. "
                "Architecture review kickoff is scheduled for next Monday."
            ),
        )

    def _executive_communication(
        self, agent1: Agent1Output, agent3: Agent3Output, agent4: Agent4Output
    ) -> StakeholderCommunication:
        """Generate the executive leadership communication."""
        return StakeholderCommunication(
            audience="executive",
            subject="Strategic Recommendation: Platform Hardening Initiative",
            tone="strategic",
            content=(
                f"## Executive Summary\n\n"
                f"Product health metrics have declined consistently over the past six months. "
                f"Analysis of {agent1.total_tickets_analyzed} customer feedback tickets and "
                f"six months of product metrics reveals an urgent need for intervention.\n\n"
                f"### Key Metrics\n"
                f"- **NPS:** Declined from 42 to 28 (−33%)\n"
                f"- **Monthly Churn:** Increased from 2.1% to 3.8% (+81%)\n"
                f"- **Support Tickets:** Up 62% (340 → 550/month)\n"
                f"- **ARR at Risk:** ${agent1.total_arr_at_risk:,}\n\n"
                f"### Opportunity Score: {agent3.opportunity_score}/100\n\n"
                f"### Recommendation\n"
                f"We recommend a 12-week **Full-Stack Platform Hardening** initiative "
                f"targeting the top three customer pain points. This requires 6 engineers "
                f"and an estimated budget of $550K.\n\n"
                f"### Expected Outcomes\n"
                f"- Churn reduction: 3.8% → ≤2.5%\n"
                f"- NPS recovery: +8-12 points within two quarters\n"
                f"- Revenue protection: $5-8M annually\n"
                f"- Support volume reduction: 25%\n\n"
                f"### Risk if No Action\n"
                f"At the current trajectory, we project annualized revenue loss exceeding "
                f"$2.5M and potential loss of 3-5 enterprise accounts within two quarters.\n\n"
                f"### Decision Needed By\n"
                f"{agent4.decision_deadline}"
            ),
            key_points=[
                "All key health metrics declining — NPS, churn, CSAT, MRR",
                f"${agent1.total_arr_at_risk:,} ARR at direct risk",
                "12-week platform hardening initiative recommended",
                "$550K investment with $5-8M annual revenue protection ROI",
                f"Decision needed within {agent4.decision_deadline}",
            ],
            call_to_action=(
                f"Approve the Platform Hardening initiative and resource allocation "
                f"within {agent4.decision_deadline} to align with Q2 sprint planning."
            ),
        )

    def _board_communication(
        self, agent1: Agent1Output, agent3: Agent3Output
    ) -> StakeholderCommunication:
        """Generate the board-level communication."""
        return StakeholderCommunication(
            audience="board",
            subject="Board Update: Product Health & Strategic Response",
            tone="formal",
            content=(
                f"## Board Update — Product Health Assessment\n\n"
                f"### Situation\n"
                f"Our product health metrics have shown a declining trend over the past "
                f"two quarters. We have conducted a thorough analysis of customer feedback "
                f"({agent1.total_tickets_analyzed} tickets) and product telemetry to "
                f"identify root causes and develop a response plan.\n\n"
                f"### Impact Assessment\n"
                f"- **Revenue at Risk:** ${agent1.total_arr_at_risk:,} across "
                f"{agent1.total_tickets_analyzed} customer-reported issues\n"
                f"- **Net Promoter Score:** Declined from 42 to 28\n"
                f"- **Monthly Churn Rate:** Increased from 2.1% to 3.8%\n"
                f"- **Customer Satisfaction (CSAT):** Declined from 78 to 65\n\n"
                f"### Response Plan\n"
                f"Management has developed a 12-week platform improvement initiative "
                f"that addresses the three highest-impact areas: API reliability, "
                f"security compliance, and authentication. The initiative requires a "
                f"$550K investment and is projected to protect $5-8M in annual revenue.\n\n"
                f"### Governance\n"
                f"- Bi-weekly progress reports to the executive team\n"
                f"- Monthly board updates with metric dashboards\n"
                f"- Defined success criteria and abort conditions\n"
                f"- Independent security audit upon completion\n\n"
                f"### Outlook\n"
                f"With timely execution, we expect to stabilize and begin reversing the "
                f"trend within one quarter, with full recovery projected by Q4. The "
                f"opportunity score of {agent3.opportunity_score}/100 indicates significant "
                f"upside potential from addressing these issues."
            ),
            key_points=[
                f"Revenue at risk: ${agent1.total_arr_at_risk:,}",
                "NPS declined 33%, churn nearly doubled in 6 months",
                "12-week response plan developed — $550K investment",
                "Projected ROI: $5-8M annual revenue protection",
                "Monthly board updates with defined success criteria",
            ],
            call_to_action=(
                "Acknowledge the product health assessment and proposed response plan. "
                "Management to proceed with execution and report monthly."
            ),
        )

    def _customer_communication(
        self, agent1: Agent1Output
    ) -> StakeholderCommunication:
        """Generate the customer-facing communication."""
        return StakeholderCommunication(
            audience="customer",
            subject="Our Commitment to Platform Reliability & Your Success",
            tone="empathetic",
            content=(
                f"## A Message to Our Valued Customers\n\n"
                f"We want to be transparent about the challenges some of you have experienced "
                f"recently and share what we're doing about it.\n\n"
                f"### We Hear You\n"
                f"Over the past several months, we've received and carefully reviewed your "
                f"feedback about API performance, security features, and authentication "
                f"reliability. We take every piece of feedback seriously, and we want you "
                f"to know that your concerns are driving our top priorities.\n\n"
                f"### What We're Doing\n"
                f"We are launching a dedicated platform improvement initiative focused on:\n\n"
                f"1. **API Performance & Reliability** — Faster response times, higher "
                f"rate limits for enterprise customers, and improved webhook delivery\n"
                f"2. **Security & Compliance** — Enhanced audit trails, role-based access "
                f"control, and faster GDPR compliance workflows\n"
                f"3. **Authentication** — More reliable SSO, faster user provisioning, "
                f"and expanded multi-factor authentication options\n\n"
                f"### Timeline\n"
                f"You'll start seeing improvements rolling out within the next 6-8 weeks, "
                f"with the full initiative completing within the quarter.\n\n"
                f"### Dedicated Support\n"
                f"During this period, your Customer Success Manager will be reaching out "
                f"to discuss your specific needs and provide personalized updates on the "
                f"improvements most relevant to your use case.\n\n"
                f"### Your Feedback Matters\n"
                f"We're committed to building the platform you need. Please continue "
                f"sharing your feedback — it directly shapes our roadmap."
            ),
            key_points=[
                "Acknowledgment of recent performance and reliability issues",
                "Dedicated improvement initiative targeting top customer concerns",
                "Improvements rolling out within 6-8 weeks",
                "Personalized outreach from Customer Success team",
                "Continued commitment to incorporating customer feedback",
            ],
            call_to_action=(
                "Reach out to your Customer Success Manager with any specific concerns. "
                "We'll provide detailed progress updates in our monthly product newsletter."
            ),
        )

    def _sales_communication(
        self, agent1: Agent1Output, agent4: Agent4Output
    ) -> StakeholderCommunication:
        """Generate the sales enablement communication."""
        return StakeholderCommunication(
            audience="sales",
            subject="Sales Enablement: Platform Hardening Initiative — Key Talking Points",
            tone="persuasive",
            content=(
                f"## Sales Enablement Brief\n\n"
                f"### Situation Overview\n"
                f"We're launching a major platform improvement initiative. Here's what you "
                f"need to know for customer conversations and competitive positioning.\n\n"
                f"### Key Talking Points\n\n"
                f"**For prospects asking about reliability:**\n"
                f"> \"We're investing heavily in platform reliability with a dedicated team "
                f"of 6 engineers focused on API performance, security, and authentication. "
                f"This $550K initiative demonstrates our commitment to enterprise-grade "
                f"reliability.\"\n\n"
                f"**For existing customers raising concerns:**\n"
                f"> \"Thank you for your feedback — it's directly driving our roadmap. "
                f"We're rolling out significant improvements in the next 6-8 weeks, "
                f"including [mention their specific pain point]. Your CSM will share "
                f"a detailed timeline.\"\n\n"
                f"**For competitive displacement attempts:**\n"
                f"> \"We're the only vendor in this space proactively investing in platform "
                f"hardening based on customer feedback. Our data-driven approach means "
                f"we're fixing the issues that matter most to enterprise customers.\"\n\n"
                f"### What NOT to Say\n"
                f"- Do not share specific NPS or churn numbers externally\n"
                f"- Do not promise specific feature delivery dates (use 'within the quarter')\n"
                f"- Do not characterize existing issues as systemic failures\n\n"
                f"### Objection Handling\n\n"
                f"**\"We've been experiencing API issues.\"**\n"
                f"→ Acknowledge, share that a dedicated team is on it, offer to connect "
                f"them with their CSM for a technical deep-dive.\n\n"
                f"**\"Your competitor doesn't have these issues.\"**\n"
                f"→ Every platform at scale faces these challenges. Our transparent "
                f"approach and rapid response demonstrates our maturity and commitment.\n\n"
                f"**\"Should we wait to renew?\"**\n"
                f"→ The improvements are already in progress. Renewing now ensures "
                f"you're positioned to benefit immediately as they roll out.\n\n"
                f"### Available Resources\n"
                f"- Customer-facing announcement (approved messaging)\n"
                f"- Product roadmap highlights (sanitized for external sharing)\n"
                f"- CSM contact list for warm introductions\n"
                f"- Competitive battle card (updated)"
            ),
            key_points=[
                "Platform hardening initiative with 6 dedicated engineers",
                "Improvements visible within 6-8 weeks",
                "Do NOT share internal metrics (NPS, churn) externally",
                "Use approved talking points for customer and prospect conversations",
                "CSMs available for warm handoffs on technical concerns",
            ],
            call_to_action=(
                "Review the talking points and objection handling guide. Flag any "
                "at-risk accounts to your sales director by end of week for prioritized "
                "customer success outreach."
            ),
        )

    def process(self, context: dict[str, Any]) -> Agent6Output:
        agent1: Agent1Output = context["agent_1"]
        agent3: Agent3Output = context["agent_3"]
        agent4: Agent4Output = context["agent_4"]
        agent5: Agent5Output = context["agent_5"]

        comms: dict[str, StakeholderCommunication] = {
            "engineering": self._engineering_communication(agent1, agent4, agent5),
            "executive": self._executive_communication(agent1, agent3, agent4),
            "board": self._board_communication(agent1, agent3),
            "customer": self._customer_communication(agent1),
            "sales": self._sales_communication(agent1, agent4),
        }

        return Agent6Output(communications=comms)
