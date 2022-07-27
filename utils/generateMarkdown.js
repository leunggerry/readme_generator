/** Function Definitions
 **************************************************************************************************/
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return ``;
  } else {
    return ``;
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  console.log(license);
}

function generateMarkdown(data) {
  let {
    projectTitle,
    name,
    githubUsername,
    email,
    description,
    installInstructions,
    usage,
    license,
    contributors,
    tests,
  } = data;
  let mdDescription = description.include ? `## Description \n${description.description}\n` : ``;
  let mdInstallInstructions = installInstructions.include
    ? `## Installation\n${installInstructions.installInstructions}`
    : ``;
  let mdUsage = usage.include ? `## Usage\n${usage.usage}\n` : ``;
  let mdLicense = license.include ? renderLicenseSection(license.license) : ``;
  let mdContributors = contributors.include ? `## Contributors\n${contributors.contributors}\n` : ``;
  let mdTests = tests.include ? `## Tests\n${tests.tests}\n` : ``;
  return `# ${projectTitle.projectTitle}

  ${mdDescription}

  ## Table of Contents

  ${mdInstallInstructions}
  ${mdUsage}
  ${mdContributors}
  ${mdLicense}
  ${mdTests}
  `;
}

module.exports = generateMarkdown;
