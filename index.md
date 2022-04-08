---
title: Reference overview
---

# Reference overview

Details on parameters, requests, and responses for Okta's API endpoints.

## Core Okta API

The Core Okta API is the primary way that apps and services interact with Okta. You can use it to implement basic auth functions such as signing in your users and programmatically managing your Okta objects.

[Explore core Okta API](/openapi/reference/overview/)

## Okta Hooks

Okta Event and Inline Hooks allow you to integrate custom functionality into specific Okta process flows. Event Hooks send Okta events of interest to your systems as they occur, just like a webhook. Inline Hooks allow developers to modify in-flight Okta processes with custom logic and data from a non-Okta source. For example, you can migrate users from another data store and keep the user’s current password with a [Password Inline Hook](https://developer.okta.com/docs/reference/password-hook/).

## Okta Expression Language

Expressions allow you to reference, transform, and combine attributes before you store or parse them.

[Learn more](/reference/okta-expression-language/)

## System for Cross-domain Identity Management

SCIM is an industry-standard protocol for automating the exchange of user identity information and is part of the Okta Lifecycle Management feature. For example, as your company onboards employees, new user accounts are created in your application so they can connect immediately. Okta supports SCIM versions 1.1 and 2.0.

[Learn more](https://developer.okta.com/docs/reference/scim/)
