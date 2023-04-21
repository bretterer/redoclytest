---
title: OAuth 2.0 Scopes
meta:
  - name: description
    content: List of all Okta OAuth 2.0 scopes used for management APIs.
---

# OAuth 2.0 Scopes


## Okta OpenID Connect & OAuth 2.0

| Scope                 | Description |
| --------------------- | --------- |
| address               | Requests access to the `address` claim |
| device_sso            | Requests a device secret used to obtain a new set of tokens without re-prompting the user for authentication. See [Native SSO](https://developer.okta.com/docs/guides/configure-native-sso/main/) |
| email                 | Requests access to the `email` and `email_verified` claims |
| groups                | Requests access to the `groups` claim |
| offline_access        | Requests a refresh token used to obtain more access tokens without re-prompting the user for authentication |
| okta.clients.manage   | Allows the app to manage clients in your Okta organization |
| okta.clients.read     | Allows the app to read information about clients in your Okta organization |
| okta.clients.register | Allows the app to register new clients in your Okta organization |
| openid                | Identifies the request as an OpenID Connect request |
| phone                 | Requests access to the `phone_number` and `phone_number_verified` claims |
| profile               | Requests access to the end user's default profile claims |


## Okta Admin Management

| Scope                            | Description |
| -------------------------------- | --------- |
| okta.agentPools.manage           | Allows the app to create and manage agent pools in your Okta organization. |
| okta.agentPools.read             | Allows the app to read agent pools in your Okta organization. |
| okta.apiTokens.manage            | Allows the app to manage API Tokens in your Okta organization. |
| okta.apiTokens.read              | Allows the app to read API Tokens in your Okta organization. |
| okta.appGrants.manage            | Allows the app to create and manage grants in your Okta organization. |
| okta.appGrants.read              | Allows the app to read grants in your Okta organization. |
| okta.apps.manage                 | Allows the app to create and manage Apps in your Okta organization. |
| okta.apps.read                   | Allows the app to read information about Apps in your Okta organization. |
| okta.authenticators.manage       | Allows the app to manage all authenticators (e.g. enrollments, reset). |
| okta.authenticators.read         | Allows the app to read org authenticators information. |
| okta.authorizationServers.manage | Allows the app to create and manage Authorization Servers in your Okta organization. |
| okta.authorizationServers.read   | Allows the app to read information about Authorization Servers in your Okta organization. |
| okta.behaviors.manage            | Allows the app to create and manage behavior detection rules in your Okta organization. |
| okta.behaviors.read              | Allows the app to read behavior detection rules in your Okta organization. |
| okta.brands.manage               | Allows the app to create and manage Brands and Themes in your Okta organization. |
| okta.brands.read                 | Allows the app to read information about Brands and Themes in your Okta organization. |
| okta.captchas.manage             | Allows the app to create and manage CAPTCHAs in your Okta organization. |
| okta.captchas.read               | Allows the app to read information about CAPTCHAs in your Okta organization. |
| okta.deviceAssurance.manage      | Allows the app to manage device assurances. |
| okta.deviceAssurance.read        | Allows the app to read device assurances. |
| okta.devices.manage              | Allows the app to manage device status transitions and delete a device. |
| okta.devices.read                | Allows the app to read the existing device's profile and search devices. |
| okta.domains.manage              | Allows the app to manage custom Domains for your Okta organization. |
| okta.domains.read                | Allows the app to read information about custom Domains for your Okta organization. |
| okta.emailDomains.manage         | Allows the app to manage Email Domains for your Okta organization. |
| okta.emailDomains.read           | Allows the app to read information about Email Domains for your Okta organization. |
| okta.emailServers.manage         | Allows the app to manage Email Servers for your Okta organization. |
| okta.emailServers.read           | Allows the app to read information about Email Servers for your Okta organization. |
| okta.eventHooks.manage           | Allows the app to create and manage Event Hooks in your Okta organization. |
| okta.eventHooks.read             | Allows the app to read information about Event Hooks in your Okta organization. |
| okta.features.manage             | Allows the app to create and manage Features in your Okta organization. |
| okta.features.read               | Allows the app to read information about Features in your Okta organization. |
| okta.groups.manage               | Allows the app to manage existing groups in your Okta organization. |
| okta.groups.read                 | Allows the app to read information about groups and their members in your Okta organization. |
| okta.identitySources.manage      | Allows the custom identity sources to manage user entities in your Okta organization |
| okta.identitySources.read        | Allows to read session information for custom identity sources in your Okta organization |
| okta.idps.manage                 | Allows the app to create and manage Identity Providers in your Okta organization. |
| okta.idps.read                   | Allows the app to read information about Identity Providers in your Okta organization. |
| okta.inlineHooks.manage          | Allows the app to create and manage Inline Hooks in your Okta organization. |
| okta.inlineHooks.read            | Allows the app to read information about Inline Hooks in your Okta organization. |
| okta.linkedObjects.manage        | Allows the app to manage linked object definitions in your Okta organization. |
| okta.linkedObjects.read          | Allows the app to read linked object definitions in your Okta organization. |
| okta.logStreams.manage           | Allows the app to create and manage log streams in your Okta organization. |
| okta.logStreams.read             | Allows the app to read information about log streams in your Okta organization. |
| okta.logs.read                   | Allows the app to read information about System Log entries in your Okta organization. |
| okta.networkZones.manage         | Allows the app to create and manage Network Zones in your Okta organization. |
| okta.networkZones.read           | Allows the app to read Network Zones in your Okta organization. |
| okta.oauthIntegrations.manage    | Allows the app to create and manage API service Integration instances in your Okta organization. |
| okta.oauthIntegrations.read      | Allows the app to read API service Integration instances in your Okta organization. |
| okta.orgs.manage                 | Allows the app to manage organization-specific details for your Okta organization. |
| okta.orgs.read                   | Allows the app to read organization-specific details about your Okta organization. |
| okta.policies.manage             | Allows the app to manage policies in your Okta organization. |
| okta.policies.read               | Allows the app to read information about policies in your Okta organization. |
| okta.principalRateLimits.manage  | Allows the app to create and manage Principal Rate Limits in your Okta organization. |
| okta.principalRateLimits.read    | Allows the app to read information about Principal Rate Limits in your Okta organization. |
| okta.profileMappings.manage      | Allows the app to manage user profile mappings in your Okta organization. |
| okta.profileMappings.read        | Allows the app to read user profile mappings in your Okta organization. |
| okta.rateLimits.manage           | Allows the app to create and manage rate limits in your Okta organization. |
| okta.rateLimits.read             | Allows the app to read information about rate limits in your Okta organization. |
| okta.realms.manage               | Allows the app to create new realms and to manage their details. |
| okta.realms.read                 | Allows the app to read the existing realms and their details. |
| okta.riskEvents.manage           | Allows the app to publish risk events to your Okta organization. |
| okta.riskProviders.manage        | Allows the app to create and manage risk provider integrations in your Okta organization. |
| okta.riskProviders.read          | Allows the app to read all risk provider integrations in your Okta organization. |
| okta.roles.manage                | Allows the app to manage administrative role assignments for users in your Okta organization. |
| okta.roles.read                  | Allows the app to read administrative role assignments for users in your Okta organization. |
| okta.schemas.manage              | Allows the app to create and manage Schemas in your Okta organization. |
| okta.schemas.read                | Allows the app to read information about Schemas in your Okta organization. |
| okta.sessions.manage             | Allows the app to manage all sessions in your Okta organization. |
| okta.sessions.read               | Allows the app to read all sessions in your Okta organization. |
| okta.templates.manage            | Allows the app to manage all custom templates in your Okta organization. |
| okta.templates.read              | Allows the app to read all custom templates in your Okta organization. |
| okta.threatInsights.manage       | Allows the app to manage all ThreatInsight configurations in your Okta organization. |
| okta.threatInsights.read         | Allows the app to read all ThreatInsight configurations in your Okta organization. |
| okta.trustedOrigins.manage       | Allows the app to manage all Trusted Origins in your Okta organization. |
| okta.trustedOrigins.read         | Allows the app to read all Trusted Origins in your Okta organization. |
| okta.userTypes.manage            | Allows the app to manage user types in your Okta organization. |
| okta.userTypes.read              | Allows the app to read user types in your Okta organization. |
| okta.users.manage                | Allows the app to create new users and to manage all users' profile and credentials information. |
| okta.users.read                  | Allows the app to read the existing users' profiles and credentials. |


## MyAccount Management

| Scope                          | Description |
| ------------------------------ | --------- |
| okta.myAccount.email.manage    | Write access to user emails |
| okta.myAccount.email.read      | Read access to user emails |
| okta.myAccount.password.manage | Write access to user password |
| okta.myAccount.password.read   | Read access to user password metadata |
| okta.myAccount.phone.manage    | Write access to user phones |
| okta.myAccount.phone.read      | Read access to user phones |
| okta.myAccount.profile.manage  | Write access to user profile and schema |
| okta.myAccount.profile.read    | Read access to user profile and schema |
