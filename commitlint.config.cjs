/******************************** COMMIT MESSAGES STRUCTURE ********************************
* Pattern
type(scope?): subject
body?
footer?

*** Type
• build: Build related changes (eg: npm related / adding external dependencies)
• chore: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
• feat: A new feature
• fix: A bug fix
• docs: Documentation related changes
• refactor: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
• perf: A code that improves performance
• style: A code that is related to styling
• test: Adding new test or making changes to existing test
• ci: A code that is related to continuous integration
• revert: A commit revert

*** Scope
• Scope must be noun and it represents the section of the section of the codebase

*** Subject
• Use imperative, present tense (eg: use "add" instead of "added" or "adds")
• Don't use dot(.) at end
• Don't capitalize first letter
*/

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'feat',
        'fix',
        'docs',
        'refactor',
        'perf',
        'style',
        'test',
        'ci',
        'revert',
      ],
    ],
  },
}
