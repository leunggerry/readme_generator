/** Required Modules
 **************************************************************************************************/
const {
  APACHE_LICENSE,
  MIT_LICENSE,
  GNU_LICENSE,
  ISC_LICENSE,
} = require("./licenseTermsConditions.js");
/** Function Definitions
 **************************************************************************************************/
function renderLicenseBadge(license) {
  return `[<img src="https://img.shields.io/badge/license-${license}-green">](#license)`;
}

// If there is no license, return an empty string
function renderLicenseLink(license) {}

// If there is no license, return an empty string
function renderLicenseSection(license) {
  let mdLicenseSection = `## License\n    `;
  switch (license) {
    case "Apache":
      return mdLicenseSection + APACHE_LICENSE;
    case "GNU":
      return mdLicenseSection + GNU_LICENSE;
    case "ISC":
      return mdLicenseSection + ISC_LICENSE;
    case "MIT":
      return mdLicenseSection + MIT_LICENSE;
    default:
      return ``;
  }
}

function generateTableOfContents(installation, usage, contributors, tests, license) {
  let mdTableOfContents = ``;
  //append installation
  mdTableOfContents += installation ? `- [Installation Instructions](#installation)\n` : ``;
  // append usage
  mdTableOfContents += usage ? `  - [Usage](#usage)\n` : ``;
  // append tests
  mdTableOfContents += tests ? `  - [Tests](#tests)\n` : ``;
  // append contributors
  mdTableOfContents += contributors ? `  - [Contributors](#contributors)\n` : ``;
  // append questions
  mdTableOfContents += `  - [Questions](#questions)\n`;
  // append license
  mdTableOfContents += license ? `  - [License](#license)\n` : ``;

  //return mdTable of contents
  return mdTableOfContents;
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
    usageVideoLink,
    license,
    contributors,
    tests,
  } = data;
  let mdDescription = description.include ? `## Description \n${description.description}\n` : ``;
  let mdInstallInstructions = installInstructions.include
    ? `## Installation\n${installInstructions.installInstructions}`
    : ``;
  let mdUsage = usage.include ? `## Usage\n${usage.usage}\n` : ``;
  let mdUsageVideoLink = usageVideoLink.include ? `${usageVideoLink.usageVideoLink}` : ``;
  let mdLicenseBadge = license.include ? renderLicenseBadge(license.license) : ``;
  let mdLicense = license.include ? renderLicenseSection(license.license) : ``;
  let mdContributors = contributors.include ? `## Contributors\n${contributors.contributors}\n` : ``;
  let mdTests = tests.include ? `## Tests\n${tests.tests}\n` : ``;

  //generate the table of contents
  let mdTableOfContents = generateTableOfContents(
    mdInstallInstructions,
    mdUsage,
    mdContributors,
    mdTests,
    mdLicense
  );

  return `# ${projectTitle.projectTitle}
  ${mdLicenseBadge}
  ${mdDescription}

  ## Table of Contents
  ${mdTableOfContents}

  ${mdInstallInstructions}
  ${mdUsage}
  ${mdUsageVideoLink}
  ${mdTests}
  ${mdContributors}
  ## Questions
  If you have any questions regarding the status of this project or any concerns please refer to my GitHub repo:
  [${githubUsername.githubUsername}](https://github.com/${githubUsername.githubUsername})
  For more information you can contact:
  [${email.email}](mailto:${email.email})
  ${mdLicense}
  `;
}

/** Module Exports
 **************************************************************************************************/
module.exports = generateMarkdown;
