---
title: Okta Management API
meta:
  - name: description
    content: Learn how the Okta API works and learn about the compatibility rules and design principles.
---

# Okta Management

### Authentication

#### OAuth 2.0 access token

You can access Okta APIs with scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by the scopes that the access token contains. See [OAuth 2.0 for Okta APIs](https://developer.okta.com/docs/guides/implement-oauth-for-okta/).

#### API key (deprecated)

> **Note:** API keys aren't scoped, and the administrator that created the key has complete access to the Okta APIs. It's recommended that you use a scoped OAuth 2.0 access token instead.

The Okta API can be acessed with the custom HTTP authentication scheme `SSWS` for authentication. All requests must have a valid API key specified in the HTTP `Authorization` header with the `SSWS` scheme.

    Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua

> **Note:** See [Obtaining a token](https://developer.okta.com/docs/guides/create-an-api-token/) for instructions on how to get an API key for your organization.

The API key (API token) isn't interchangeable with an Okta [session token](https://developer.okta.com/docs/reference/api/authn/#session-token), access tokens, or ID tokens used with [OAuth 2.0 and OpenID Connect](https://developer.okta.com/docs/reference/api/oidc/).

