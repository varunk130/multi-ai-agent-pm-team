export const agentConfig = {
  id: 'stakeholder-translator',
  name: 'Stakeholder Translator',
  number: 6,
  model: 'claude-sonnet-4-5',
  color: 'rose',
  cognitiveFunction: 'Audience Adaptation',
  description: 'Transforms PRD into 5 audience-tailored communications for cross-functional teams',
  inputs: ['prd', 'strategicRecommendation', 'narrative', 'correlations', 'themeAnalysis'],
  outputs: ['communications'],
};
