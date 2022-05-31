// Automatically sets up tag descriptions and groups, Idempotent. 

const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")

const cwd = process.cwd();
const managementSpec = path.join(cwd, "openapi/okta-management/management.yaml")
const specYaml = yaml.load(fs.readFileSync(managementSpec, "utf8"))

// Associate all tags with matching markdown description
for (let tag of specYaml.tags) {
    if (!tag.description && fs.existsSync(`openapi/okta-management/tags/${tag.name}.md`)) {
        tag.description = { "$ref" : `./tags/${tag.name}.md` }
        console.log(`Added description for tag: ${tag.name}`)
    }
}

const data = yaml.dump(specYaml, {lineWidth: -1, noArrayIndent: false})
fs.writeFileSync(managementSpec, data)