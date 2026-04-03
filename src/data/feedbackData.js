/**
 * Synthetic Customer Feedback Data
 * 50 mock customer support tickets for pipeline demonstration.
 *
 * DISCLAIMER: All data is entirely synthetic and fictional.
 * No real customer data was used.
 *
 * Built by Varun Kulkarni
 */

export const feedbackTickets = [
  { id: 'T-001', title: 'Dashboard loading takes 30+ seconds', customer: 'Acme Corp', severity: 'high', category: 'performance', arr: 85000, description: 'Our team reports the main dashboard consistently takes over 30 seconds to load during peak hours, significantly impacting productivity.' },
  { id: 'T-002', title: 'Cannot export reports to PDF', customer: 'TechFlow Inc', severity: 'medium', category: 'feature-gap', arr: 120000, description: 'We need PDF export capability for our monthly board reports. Currently we screenshot and paste into docs manually.' },
  { id: 'T-003', title: 'SSO integration broken after update', customer: 'GlobalBank', severity: 'critical', category: 'auth', arr: 250000, description: 'After your latest release, our SAML SSO integration stopped working. 500 users cannot access the platform.' },
  { id: 'T-004', title: 'Mobile app crashes on Android 14', customer: 'RetailMax', severity: 'high', category: 'mobile', arr: 95000, description: 'The mobile app crashes immediately on launch for all our Android 14 devices. About 40% of our field team is affected.' },
  { id: 'T-005', title: 'Need bulk user import via CSV', customer: 'EduPlatform', severity: 'medium', category: 'feature-gap', arr: 45000, description: 'Onboarding 200+ users manually is extremely time-consuming. We need CSV bulk import functionality.' },
  { id: 'T-006', title: 'API rate limits too restrictive', customer: 'DataSync Pro', severity: 'high', category: 'api', arr: 180000, description: 'Our integration hits rate limits within minutes. We need higher thresholds for enterprise accounts.' },
  { id: 'T-007', title: 'Search returns irrelevant results', customer: 'LegalEase', severity: 'medium', category: 'search', arr: 110000, description: 'Full-text search returns too many irrelevant results. Need better ranking and filtering options.' },
  { id: 'T-008', title: 'Notification emails going to spam', customer: 'HealthFirst', severity: 'high', category: 'email', arr: 200000, description: 'Critical alert notifications are consistently landing in spam folders for Gmail and Outlook users.' },
  { id: 'T-009', title: 'Custom fields not saving properly', customer: 'BuildRight', severity: 'critical', category: 'data-integrity', arr: 75000, description: 'Custom field values disappear after page refresh. Data loss is unacceptable for our compliance requirements.' },
  { id: 'T-010', title: 'Need dark mode support', customer: 'NightOwl Studios', severity: 'low', category: 'ux', arr: 30000, description: 'Our design team works late hours and dark mode would significantly reduce eye strain.' },
  { id: 'T-011', title: 'Webhook delivery failures', customer: 'AutoFlow Systems', severity: 'high', category: 'api', arr: 160000, description: 'Approximately 15% of webhook deliveries are failing silently. No retry mechanism visible.' },
  { id: 'T-012', title: 'Dashboard widgets not customizable', customer: 'MetricsMaven', severity: 'medium', category: 'ux', arr: 90000, description: 'We need to customize which widgets appear on the dashboard and their layout positions.' },
  { id: 'T-013', title: 'Slow query performance on large datasets', customer: 'BigData Corp', severity: 'critical', category: 'performance', arr: 300000, description: 'Queries on datasets over 1M rows timeout consistently. This is a blocker for our enterprise deployment.' },
  { id: 'T-014', title: 'Missing audit log for user actions', customer: 'ComplianceFirst', severity: 'high', category: 'security', arr: 220000, description: 'SOC 2 audit requires comprehensive user action logs. Current logging is insufficient for compliance.' },
  { id: 'T-015', title: 'Calendar integration with Outlook', customer: 'Enterprise Solutions', severity: 'medium', category: 'integration', arr: 140000, description: 'Our entire organization uses Outlook. Calendar sync would eliminate manual scheduling overhead.' },
  { id: 'T-016', title: 'File upload size limit too small', customer: 'MediaHouse', severity: 'medium', category: 'feature-gap', arr: 65000, description: 'The 10MB upload limit is too restrictive for our design files. Need at least 100MB.' },
  { id: 'T-017', title: 'Two-factor authentication needed', customer: 'SecureVault', severity: 'critical', category: 'security', arr: 190000, description: 'TOTP/authenticator app 2FA is a hard requirement for our security policy. SMS-only is not acceptable.' },
  { id: 'T-018', title: 'Broken pagination on reports page', customer: 'AnalyticsPro', severity: 'medium', category: 'bug', arr: 80000, description: 'Page 2 of reports shows the same data as page 1. Pagination is completely broken.' },
  { id: 'T-019', title: 'Need role-based access controls', customer: 'MegaCorp Industries', severity: 'high', category: 'security', arr: 350000, description: 'We have 15 departments that need different access levels. Current all-or-nothing permissions are inadequate.' },
  { id: 'T-020', title: 'Localization support for Spanish', customer: 'LatAm Partners', severity: 'medium', category: 'i18n', arr: 55000, description: 'Our Latin American offices need Spanish language support. 30% of our users are Spanish-speaking.' },
  { id: 'T-021', title: 'Dashboard performance degraded', customer: 'SpeedTest Inc', severity: 'high', category: 'performance', arr: 105000, description: 'Dashboard load times have increased 3x in the past month. Our team is losing patience.' },
  { id: 'T-022', title: 'Cannot schedule recurring reports', customer: 'WeeklyDigest Co', severity: 'medium', category: 'feature-gap', arr: 70000, description: 'We manually generate and send the same report every Monday. Need scheduled/recurring report capability.' },
  { id: 'T-023', title: 'API documentation outdated', customer: 'DevConnect', severity: 'low', category: 'docs', arr: 40000, description: 'Several API endpoints in docs return 404. Documentation hasn\'t been updated since v2.' },
  { id: 'T-024', title: 'Real-time collaboration not working', customer: 'TeamSync', severity: 'high', category: 'feature-gap', arr: 130000, description: 'When two users edit the same document, changes are lost. Need proper real-time collaboration.' },
  { id: 'T-025', title: 'GDPR data deletion request', customer: 'EuroTech GmbH', severity: 'critical', category: 'compliance', arr: 175000, description: 'We need the ability to fully delete user data per GDPR right-to-erasure requirements. Currently impossible.' },
  { id: 'T-026', title: 'Slow image loading in gallery', customer: 'PhotoPro Studio', severity: 'medium', category: 'performance', arr: 50000, description: 'Image gallery takes 10+ seconds to load thumbnails. Lazy loading or CDN would help.' },
  { id: 'T-027', title: 'Need Slack integration', customer: 'ChatFirst Corp', severity: 'medium', category: 'integration', arr: 115000, description: 'Our team lives in Slack. Notifications and actions via Slack would dramatically improve adoption.' },
  { id: 'T-028', title: 'Data import failing silently', customer: 'MigrateNow', severity: 'high', category: 'data-integrity', arr: 85000, description: 'CSV imports show success but only 60% of rows are actually imported. No error report generated.' },
  { id: 'T-029', title: 'Session timeout too aggressive', customer: 'AlwaysOn Services', severity: 'medium', category: 'auth', arr: 60000, description: 'Users are logged out after 15 minutes of inactivity. Need configurable session timeout.' },
  { id: 'T-030', title: 'Chart rendering issues in Safari', customer: 'AppleFirst Design', severity: 'medium', category: 'bug', arr: 45000, description: 'Bar charts and pie charts don\'t render correctly in Safari. Half our design team uses Macs.' },
  { id: 'T-031', title: 'Need data residency options', customer: 'SovCloud EU', severity: 'critical', category: 'compliance', arr: 280000, description: 'EU data residency is a legal requirement for us. Need option to host data in EU regions.' },
  { id: 'T-032', title: 'Keyboard shortcuts missing', customer: 'PowerUser Inc', severity: 'low', category: 'ux', arr: 35000, description: 'No keyboard shortcuts for common actions. Our power users want keyboard-driven workflows.' },
  { id: 'T-033', title: 'Duplicate records not detected', customer: 'CleanData Systems', severity: 'high', category: 'data-integrity', arr: 125000, description: 'System allows creation of exact duplicate records with no warning or merge suggestion.' },
  { id: 'T-034', title: 'Email templates not customizable', customer: 'BrandFirst Agency', severity: 'medium', category: 'feature-gap', arr: 55000, description: 'System-sent emails use generic templates. Need ability to customize with our branding.' },
  { id: 'T-035', title: 'Performance issues with 50+ concurrent users', customer: 'ScaleUp Corp', severity: 'critical', category: 'performance', arr: 240000, description: 'System becomes unusable when more than 50 users are active simultaneously. Major scalability concern.' },
  { id: 'T-036', title: 'Missing data backup options', customer: 'BackupFirst LLC', severity: 'high', category: 'security', arr: 100000, description: 'No self-service backup or export-all functionality. We need disaster recovery assurance.' },
  { id: 'T-037', title: 'Form builder needs conditional logic', customer: 'FormFlow Pro', severity: 'medium', category: 'feature-gap', arr: 75000, description: 'Forms need show/hide logic based on previous answers. Current static forms are too rigid.' },
  { id: 'T-038', title: 'Billing page shows wrong currency', customer: 'MultiCurrency Ltd', severity: 'medium', category: 'bug', arr: 90000, description: 'Billing page shows USD instead of our contracted GBP pricing. Causes confusion during renewals.' },
  { id: 'T-039', title: 'Need IP allowlisting', customer: 'FortressBank', severity: 'critical', category: 'security', arr: 310000, description: 'IP allowlisting is a mandatory security control for our organization. Currently not available.' },
  { id: 'T-040', title: 'Workflow automation limitations', customer: 'AutomatePro', severity: 'medium', category: 'feature-gap', arr: 135000, description: 'Workflow automation only supports 3 trigger types. Need custom triggers and multi-step workflows.' },
  { id: 'T-041', title: 'Accessibility issues for screen readers', customer: 'InclusiveTech', severity: 'high', category: 'accessibility', arr: 70000, description: 'Screen reader users cannot navigate the main interface. WCAG 2.1 AA compliance needed for our federal contract.' },
  { id: 'T-042', title: 'Version history not available', customer: 'TrackChanges Inc', severity: 'medium', category: 'feature-gap', arr: 80000, description: 'No way to see or revert to previous versions of records. Accidental changes are permanent.' },
  { id: 'T-043', title: 'Batch operations timing out', customer: 'BulkOps Corp', severity: 'high', category: 'performance', arr: 155000, description: 'Batch update operations on 500+ records consistently timeout. Need background processing.' },
  { id: 'T-044', title: 'Onboarding wizard confusing', customer: 'NewUser Academy', severity: 'low', category: 'ux', arr: 25000, description: 'New users find the onboarding wizard confusing. 3 of our 5 recent hires needed manual help.' },
  { id: 'T-045', title: 'Cannot integrate with Salesforce', customer: 'SalesForce Corp', severity: 'high', category: 'integration', arr: 200000, description: 'Salesforce is our CRM of record. Bidirectional sync is critical for our sales team.' },
  { id: 'T-046', title: 'Timezone handling incorrect', customer: 'GlobalTime Inc', severity: 'medium', category: 'bug', arr: 95000, description: 'Scheduled events show wrong times for users in non-US timezones. Causes missed meetings.' },
  { id: 'T-047', title: 'Need advanced analytics dashboard', customer: 'InsightEngine', severity: 'medium', category: 'feature-gap', arr: 110000, description: 'Current analytics are basic. Need pivot tables, custom date ranges, and comparative analysis.' },
  { id: 'T-048', title: 'Password policy too weak', customer: 'SecureFirst Gov', severity: 'high', category: 'security', arr: 185000, description: 'Current password policy allows 6-char passwords with no complexity. Government contracts require stronger.' },
  { id: 'T-049', title: 'Print layout completely broken', customer: 'PaperTrail Legal', severity: 'medium', category: 'bug', arr: 60000, description: 'Printing any page produces unformatted content with overlapping elements. Legal docs must be printable.' },
  { id: 'T-050', title: 'API webhook lacks signature verification', customer: 'SecureAPI Corp', severity: 'critical', category: 'security', arr: 170000, description: 'Webhook payloads have no HMAC signature for verification. Major security gap for our integration.' },
];

export const feedbackSummary = {
  totalTickets: feedbackTickets.length,
  severityDistribution: {
    critical: feedbackTickets.filter((t) => t.severity === 'critical').length,
    high: feedbackTickets.filter((t) => t.severity === 'high').length,
    medium: feedbackTickets.filter((t) => t.severity === 'medium').length,
    low: feedbackTickets.filter((t) => t.severity === 'low').length,
  },
  totalArrAtRisk: feedbackTickets.reduce((sum, t) => sum + t.arr, 0),
  categories: [...new Set(feedbackTickets.map((t) => t.category))],
};
