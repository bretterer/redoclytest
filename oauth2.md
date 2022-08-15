---
title: OAuth 2.0 Scopes
meta:
  - name: description
    content: List of all Okta OAuth 2.0 scopes used for management APIs.
---

# OAuth 2.0 Scopes


## Okta Management APIs

| Scope                            | Description |
| -------------------------------- | --------- |
| okta.agentPools.manage           | Read or modify Agent Pools |
| okta.agentPools.read             | Read Agent Pools |
| okta.apiToken.manage             | Read or modify API Tokens. |
| okta.apiToken.read               | Read API Tokens. |
| okta.apps.manage                 | Read or modify Apps. |
| okta.apps.read                   | Read Apps. |
| okta.authenticators.manage       | Read or modify Authenticators. |
| okta.authenticators.read         | Read Authenticators. |
| okta.authorizationServers.manage | Read or modify Authorization Servers. |
| okta.authorizationServers.read   | Read Authorization Servers. |
| okta.behaviors.manage            | Read or modify Behavior Detection Rules. |
| okta.behaviors.read              | Read Behavior Detection Rules. |
| okta.brands.manage               | Read or modify Brands. |
| okta.brands.read                 | Read Brands. |
| okta.captchas.manage             | Read or modify CAPTCHA instances in your org. |
| okta.captchas.read               | Read CAPTCHA instances in your org. |
| okta.deviceAssurance.manage      | Read or modify device assurance policies. |
| okta.deviceAssurance.read        | Read device assurance policies. |
| okta.domains.manage              | Read or modify Domains. |
| okta.domains.read                | Read Domains. |
| okta.eventHooks.manage           | Read or modify Event Hooks. |
| okta.eventHooks.read             | Read Event Hooks. |
| okta.groups.manage               | Read or modify Groups. |
| okta.groups.read                 | Read Groups. |
| okta.idps.manage                 | Read or modify Identity Providers. |
| okta.idps.read                   | Read Identity Providers. |
| okta.inlineHooks.manage          | Read or modify Inline Hooks. |
| okta.inlineHooks.read            | Read Inline Hooks. |
| okta.linkedObjects.manage        | Read or modify Linked Objects. |
| okta.linkedObjects.read          | Read Linked Objects. |
| okta.logs.read                   | Read Logs. |
| okta.orgs.manage                 | Read or modify Org Settings. |
| okta.orgs.read                   | Read Org Settings. |
| okta.policies.manage             | Read or modify Policies. |
| okta.policies.read               | Read Policies. |
| okta.principalRateLimits.manage  | Read or modify Principal Rate Limits. |
| okta.principalRateLimits.read    | Read Principal Rate Limits. |
| okta.profileMappings.manage      | Read or modify Profile Mappings. |
| okta.profileMappings.read        | Read Profile Mappings. |
| okta.pushProviders.manage        | Read or modify Push Providers such as APNs and FCM. |
| okta.pushProviders.read          | Read Push Providers such as APNs and FCM. |
| okta.roles.manage                | Read or modify Roles. |
| okta.roles.read                  | Read Roles. |
| okta.schemas.manage              | Read or modify Schemas. |
| okta.schemas.read                | Read Schemas. |
| okta.sessions.manage             | Read or modify Sessions. |
| okta.sessions.read               | Read Sessions. |
| okta.templates.manage            | Read or modify Templates. |
| okta.templates.read              | Read Templates. |
| okta.trustedOrigins.manage       | Read or modify Trusted Origins. |
| okta.trustedOrigins.read         | Read Trusted Origins. |
| okta.userTypes.manage            | Read or modify Usertypes. |
| okta.userTypes.read              | Read Usertypes. |
| okta.users.manage                | Read or modify Users. |
| okta.users.read                  | Read Users. |


## Okta OpenID Connect & OAuth 2.0

| Scope               | Description |
| ------------------- | --------- |
| openid              | Identifies the request as an OpenID Connect request |
| profile             | Requests access to the end user's default profile claims |
| email               | Requests access to the `email` and `email_verified` claims |
| phone               | Requests access to the `phone_number` and `phone_number_verified` claims |
| address             | Requests access to the `address` claim |
| groups              | Requests access to the `groups` claim |
| offline_access      | Requests a refresh token used to obtain more access tokens without re-prompting the user for authentication |
| device_sso          | Requests a device secret used to obtain a new set of tokens without re-prompting the user for authentication. See [Native SSO](https://developer.okta.com/docs/guides/configure-native-sso/main/) |
| okta.clients.manage | Allows the app to manage clients in your Okta organization |
| okta.clients.read   | Allows the app to read information about clients in your Okta organization |


## Okta MyAccount APIs

| Scope                         | Description |
| ----------------------------- | --------- |
| okta.myaccount.email.manage   | Write access to user emails |
| okta.myaccount.email.read     | Read access to user emails |
| okta.myaccount.phone.manage   | Write access to user phones |
| okta.myaccount.phone.read     | Read access to user phones |
| okta.myaccount.profile.manage | Write access to user profile & schema |
| okta.myaccount.profile.read   | Read access to user profile & schema |
