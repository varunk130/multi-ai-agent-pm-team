export const agentConfig = {
  id: 'customer-feedback-pipeline',
  name: 'Customer Feedback Pipeline',
  number: 1,
  model: 'claude-sonnet-4-5',
  color: 'indigo',
  cognitiveFunction: 'Pattern Recognition',
  description: 'Ingests raw tickets, categorizes by theme, scores by severity and ARR impact',
  inputs: ['feedbackData'],
  outputs: ['themeAnalysis'],
};
