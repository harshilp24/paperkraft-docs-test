// One sidebar per tab in the header (src/components/SecondaryNav).
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  start: ['intro', 'quickstart', 'faq', 'changelog'],
  'get-started': [{type: 'category', label: 'Get started', collapsible: false, items: ['get-started/what-xenon-studio-does', 'get-started/set-up-your-workspace', 'get-started/your-first-change', 'get-started/plans-and-credits']}],
  'agents': [{type: 'category', label: 'Agents', collapsible: false, items: ['agents/docs-sync', 'agents/docs-writer', 'agents/link-fixer', 'agents/slack-agent']}],
  'review-and-publishing': [{type: 'category', label: 'Review and publishing', collapsible: false, items: ['review-and-publishing/review-agent', 'review-and-publishing/review-policy', 'review-and-publishing/approving-a-change', 'review-and-publishing/docs-score']}],
  'automations': [{type: 'category', label: 'Automations', collapsible: false, items: ['automations/triggers-and-schedules', 'automations/weekly-digest', 'automations/stale-page-alerts']}],
  'connections': [{type: 'category', label: 'Connections', collapsible: false, items: ['connections/connect-your-docs-repository', 'connections/connect-slack-and-your-help-centre', 'connections/custom-skills-and-company-context']}],
  'teams': [{type: 'category', label: 'Teams', collapsible: false, items: ['teams/for-engineering', 'teams/for-support', 'teams/for-product', 'teams/for-developer-relations', 'teams/for-technical-writers']}],
  'help': [{type: 'category', label: 'Help', collapsible: false, items: ['help/common-questions', 'help/troubleshooting', 'help/roles-and-permissions', 'help/security-and-data']}],
};

export default sidebars;
