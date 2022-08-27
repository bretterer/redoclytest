---
title: OpenID Connect & OAuth 2.0
category: authentication
excerpt: Control user access to your applications.
meta:
  - name: description
    content: Find information about the OAuth 2.0 and OpenID Connect endpoints that Okta exposes on its authorization servers.
---

# OpenID Connect & OAuth 2.0 API

Okta is a standards-compliant [OAuth 2.0](http://oauth.net/documentation) authorization server and a certified [OpenID Connect provider](http://openid.net/certification).

OpenID Connect extends OAuth 2.0. The OAuth 2.0 protocol provides API security via scoped access tokens, and OpenID Connect provides user authentication and single sign-on (SSO) functionality.

This page contains detailed information about the OAuth 2.0 and OpenID Connect endpoints that Okta exposes on its authorization servers. For higher-level information about how to use these endpoints, see [OAuth 2.0 and OpenID Connect](https://developer.okta.com/docs/concepts/oauth-openid/).

## Scopes

OpenID Connect uses scope values to specify which access privileges are being requested for access tokens.

The scopes associated with access tokens determine which claims are available when they are used
to access the OIDC [`/userinfo` endpoint](/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/userinfo). See [OAuth 2.0 scopes](/oauth2) for a full list of scopes.

### Scope values

> **Note:** The maximum length for the scope parameter value is 1024 characters.

* `openid` is required for any OpenID request connect flow. If the `openid` scope value isn't present, the request may be a valid OAuth 2.0 request, but it's not an OpenID Connect request.
* `profile` requests access to these default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`,`locale`, and `updated_at`.
* `offline_access` can only be requested in combination with a `response_type` that contains `code`. If the `response_type` doesn't contain `code`, `offline_access` is ignored.
* For more information about `offline_access`, see the [OIDC spec](http://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess).
* For more information about `device_sso`, see [Native SSO](https://developer.okta.com/docs/guides/configure-native-sso/main/).

### Scope properties

| Property                                 | Description                                                                                             | Type      | Default        | Required for create or update              |
| :-------------------------------------   | :------------------------------------------------------------------------------------------------------ | :-------- | :------------- | :----------------------------              |
| consent                                  | Indicates whether a consent dialog is needed for the scope. Valid values: `REQUIRED`, `IMPLICIT`.       | Enum      | `IMPLICIT`     | True                                       |
| default                                  | Whether the scope is a default scope                                                               | Boolean   |                | False                                      |
| description                              | Description of the scope                                                                                | String    |                | False                                      |
| displayName                              | Name of the end user displayed in a consent dialog window                                                      | String    |                | False                                      |
| id                                       | ID of the scope                                                                                         | String    |                | False                                      |
| metadataPublish                          | Whether the scope should be included in the metadata. Valid values: `NO_CLIENTS`, `ALL_CLIENTS`  | Enum      | `NO_CLIENTS`   | True except for create                     |
| name                                     | Name of the scope                                                                                       | String    |                | True                                       |
| system                                   | Whether Okta created the scope                                                                          | Boolean   |                | False                                      |

A consent dialog appears depending on the values of three elements:

* `prompt` - a query parameter that is used in requests to [`/authorize`](#authorize)
* `consent_method` - an [application](/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=0/settings&t=request) property that allows you to determine whether a client is fully trusted (for example, a first-party application) or requires consent (for example, a third-party application).
* `consent` - a Scope property, listed in the previous table, that allows you to enable or disable user consent for an individual scope.

| prompt Value     | consent_method          | consent                              | Result       |
| :--------------- | :---------------------- | :----------------------------------- | :----------- |
| `CONSENT`        | `TRUSTED` or `REQUIRED` | `REQUIRED`                           | Prompted     |
| `CONSENT`        | `TRUSTED` or `REQUIRED` | `FLEXIBLE`                           | Prompted     |
| `CONSENT`        | `TRUSTED`               | `IMPLICIT`                           | Not prompted |
| `NONE`           | `TRUSTED`               | `FLEXIBLE`, `IMPLICIT`, or `REQUIRED`| Not prompted |
| `NONE`           | `REQUIRED`              | `FLEXIBLE` or `REQUIRED`             | Prompted     |
| `NONE`           | `REQUIRED`              | `IMPLICIT`                           | Not prompted |

> **Note:** When a scope is requested during a Client Credentials grant flow and `CONSENT` is set to `FLEXIBLE`, the scope is granted in the access token with no consent prompt. This occurs because there is no user involved in a two-legged OAuth [Client Credentials](https://developer.okta.com/docs/guides/implement-grant-type/clientcreds/main/) grant flow.
<!-- If you change this section, change it in apps.md (/docs/reference/api/apps/#credentials-settings-details) and authorization-servers.md (/docs/reference/api/authorization-servers/#scope-properties) as well. Add 'LOGIN' to the first three rows when supported -->

**Notes:**

* Apps created on `/api/v1/apps` default to `consent_method=TRUSTED`, while those created on `/api/v1/clients` default to `consent_method=REQUIRED`.
* If you request a scope that requires consent while using the `client_credentials` flow, an error is returned. Because there is no user, no consent can be given.
* If the `prompt` value is set to `NONE`, but the `consent_method` and the `consent` values are `REQUIRED`, then an error occurs.
* The scope name must only contain printable ASCII except for spaces, double quotes, and backslashes. It also must not start with `okta.` or `okta:` and must not be only `okta` or `*`.

## Tokens and claims

This section contains some general information about claims, as well as detailed information about access and ID tokens.

* [Access Token](#access-token)
* [ID Token](#id-token)
* [Refresh Token](#refresh-token)

### Token lifetime

When you are using the [Okta Authorization Server](https://developer.okta.com/docs/concepts/auth-servers/#org-authorization-server), the lifetime of the JWT tokens is hard-coded to the following values:

* **ID token:** 60 minutes
* **Access token:** 60 minutes
* **Refresh token:** 90 days

When you are using a [Custom Authorization Server](https://developer.okta.com/docs/concepts/auth-servers/#custom-authorization-server), you can configure the lifetime of the JWT tokens:

* **Access tokens:** The minimum is five minutes, and the maximum is 24 hours (configurable using an [Access Policy](https://help.okta.com/okta_help.htm?id=ext-create-access-policies)).
* **Refresh tokens:** The minimum access token lifetime. The idle time window is at least 10 minutes, with a maximum of five years (configurable using an [Access Policy](https://help.okta.com/okta_help.htm?id=ext-create-access-policies)).
* **ID tokens:** Not configurable. Token lifetime is 60 minutes.

### Claims

Tokens issued by Okta contain claims that are statements about a subject (user). For example, the claim can be about a name, identity, key, group, or privilege. The claims in a security token are dependent upon the type of token, the type of credential used to authenticate the user, and the application configuration.

The claims requested by the `profile`, `email`, `address`, and `phone` scope values are returned from the [`/userinfo` endpoint](/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/userinfo) when a `response_type` value is used that results in an access token being issued. However, when no access token is issued (which is the case for the `response_type` value `id_token`), the resulting claims are returned in the ID token.

### Access token

> **Note:** Use of the access token differs depending on whether you are using the Okta Org Authorization Server or a Custom Authorization Server. While the structure of an access token retrieved from a Custom Authorization Server is guaranteed to not change, the structure of the access token issued by the Okta Org Authorization Server is subject to change.

An access token is a JSON web token (JWT) encoded in Base64 URL-encoded format that contains [a header](#access-token-header), [payload](#access-token-payload), and [signature](#access-token-signature). A resource server can authorize the client to access particular resources based on the [scopes and claims](#access-token-scopes-and-claims) in the access token.

The lifetime of an access token can be configured in access policies. If the client that issued the token is deactivated, the token is immediately and permanently invalidated. Reactivating the client doesn't make the token valid again.

#### Access token header

```json
{
  "alg": "RS256",
  "kid": "45js03w0djwedsw"
}
```

#### Access token payload

```json
{
  "ver": 1,
  "jti": "AT.0mP4JKAZX1iACIT4vbEDF7LpvDVjxypPMf0D7uX39RE",
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
  "aud": "https://api.example.com",
  "sub": "00ujmkLgagxeRrAg20g3",
  "iat": 1467145094,
  "exp": 1467148694,
  "cid": "nmdP1fcyvdVO11AL7ECm",
  "uid": "00ujmkLgagxeRrAg20g3",
  "scp": [
    "openid",
    "email",
    "flights",
    "custom"
  ],
  "auth_time": 1467142021,
  "custom_claim": "CustomValue"
}
```

#### Access token signature

This is a digital signature that Okta generates using the public key identified by the `kid` property in the header section.

#### Access token scopes and claims

Access tokens include reserved scopes and claims and can optionally include custom scopes and claims.

Scopes are requested in the initial [authorization request](/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/authorize), and the Authorization Server uses the [access policies](/openapi/okta-management/management/tag/AuthorizationServer/#tag/AuthorizationServer/operation/createAuthorizationServerPolicy) to decide whether they can be granted. If any of the requested scopes are rejected by the Access Policies, the request is rejected.

Based on the granted scopes, claims are added into the access token returned from the request.

##### Reserved scopes and claims

Okta defines a number of reserved scopes and claims that can't be overridden.

* [Reserved scopes](#reserved-scopes)
* [Reserved claims in the header section](#reserved-claims-in-the-header-section)
* [Reserved claims in the payload section](#reserved-claims-in-the-payload-section)

###### Reserved scopes

`openid`, `profile`, `email`, `address`, `phone`, `offline_access`, and `groups` are available to ID tokens and access tokens, using either the Okta Org Authorization Server or a Custom Authorization Server. For details, see [Scopes](#access-token-scopes-and-claims). All of these scopes except `groups` are defined in the OpenID Connect specification.

Additionally, we reserved the scope `device_sso` as it has a particular meaning in the Native SSO flow.

###### Reserved claims in the header section

The header only includes the following reserved claims:

| Property | Description                                                                                                                                                                               | DataType |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| alg      | Identifies the digital signature algorithm used. This is always `RS256`.                                                                                                                  | String   |
| kid      | Identifies the `public-key` used to sign the `access_token`. The corresponding `public-key` can be found via the JWKS in the [discovery document](#well-knownoauth-authorization-server). | String   |

###### Reserved claims in the payload section

The payload includes the following reserved claims:

| Property | Description                                                                                                            | DataType |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| auth_time| The time the end user was authenticated, represented in Unix time (seconds).                                           | Integer  |
| cid      | Client ID of the client that requested the access token.                                                               | String   |
| exp      | The time the access token expires, represented in Unix time (seconds).                                                 | Integer  |
| iat      | The time the access token was issued, represented in Unix time (seconds).                                              | Integer  |
| iss      | The Issuer Identifier of the response. This value is the unique identifier for the Authorization Server instance.      | String   |
| jti      | A unique identifier for this access token for debugging and revocation purposes.                                       | String   |
| scp      | Array of scopes that are granted to this access token.                                                                 | Array    |
| uid      | A unique identifier for the user. It isn't included in the access token if there is no user bound to it.               | String   |
| ver      | The semantic version of the access token.                                                                              | Integer  |

##### Custom scopes and claims

You can configure custom scopes and claims for your access tokens, depending on the authorization server that you are using (see [Composing your base URL](#composing-your-base-url)):

* For the Okta Org Authorization Server, you can configure a custom `groups` claim.
* For a Custom Authorization Server, you can configure a custom `groups` claim or any other custom scopes and claims you want.

###### Custom scopes

If the request that generates the access token contains any custom scopes, those scopes are a part of the `scp` claim together with the reserved scopes provided from the [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html). The names of your custom scopes must conform to the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749#section-3.3).

> **Note:** Scope names can contain the characters `<` (less than) or `>` (greater than), but not both characters.

###### Custom claims

Custom claims are associated with scopes. In general, granting a custom scope means a custom claim is added to the token. However, the specifics depend on which claims are requested, whether the request is to the Okta Org Authorization Server or a Custom Authorization Server, and some configuration choices.

**Quick Reference: Which token has which claims?**

Custom claims are configured in the Custom Authorization Server, and returned depending on whether it matches a scope in the request, and also depending on the token type, authorization server type, and the token and claim configuration set in the authorization server:

* Base claims are always returned in ID tokens and access tokens for both authorization server types (Okta Org Authorization Server or Custom Authorization Server).
* Scope-dependent claims are returned in tokens depending on the response type for either authorization server type. See [the second table in the Scope-dependent claims topic](#scope-dependent-claims-not-always-returned) for details.
* Custom claims require configuration in the Custom Authorization Server. You can specify that claims be returned in each token (ID or access) always or only when requested. Assuming a claim matches a requested scope, it is returned to the ID token if there is no access token requested.

The ID token or access token may not include all claims associated with the requested scopes. The [`/userinfo` endpoint](/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/userinfo) always contains a full set of claims for the requested scopes.

### ID token

OpenID Connect introduces an ID token that is a JSON Web Token (JWT) that contains information about an authentication event and claims about the authenticated user.

Clients can use any of the following sequences of operations to obtain an ID token:

* [Authorization code flow](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/) or [Authorization code with PKCE flow](https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/) -- the client obtains an authorization code from the authorization server's [/authorize endpoint](#authorize) and uses it to obtain an ID token and an access token from the authorization server's [/token endpoint](#token).
* [Implicit flow](https://developer.okta.com/docs/guides/implement-grant-type/implicit/main/) -- the client obtains an ID token and optionally an access token directly from the authorization server's `/authorize` endpoint.

Clients should always [validate ID tokens](https://developer.okta.com/docs/guides/validate-id-tokens/) to ensure their integrity.

The ID tokens returned by the [`/authorize` endpoint](/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/authorize) (implicit flow) or the [`/token` endpoint](/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) (authorization code flow) are identical, except if:

* You are using the implicit flow. If so, the `nonce` parameter is required in the initial `/authorize` request, and the ID token includes a `nonce` claim that should be validated to make sure it matches the `nonce` value passed to `/authorize.`
* Both an ID and an access token were requested. If so, the ID token includes the `at_hash` [parameter](http://openid.net/specs/openid-connect-core-1_0.html#CodeIDToken) that can be validated against the hash of the access token to guarantee that the access token is genuine.

The ID token consists of three period-separated, Base64 URL-encoded JSON segments: [a header](#id-token-header), [the payload](#id-token-payload), and [the signature](#id-token-signature).

#### ID token header

```json
{
  "alg": "RS256",
  "kid": "45js03w0djwedsw"
}
```

#### ID token payload

```json
{
  "ver": 1,
  "sub": "00uid4BxXw6I6TV4m0g3",
  "iss": "https://{yourOktaDomain}",
  "aud": "uAaunofWkaDJxukCFeBx",
  "iat": 1449624026,
  "exp": 1449627626,
  "amr": [
    "pwd"
  ],
  "jti": "ID.4eAWJOCMB3SX8XewDfVR",
  "auth_time": 1449624026,
  "at_hash": "cpqKfdQA5eH891Ff5oJr_Q",
  "name" :"John Doe",
  "nickname":"Jimmy",
  "preferred_username": "john.doe@example.com",
  "given_name":"John",
  "middle_name":"James",
  "family_name":"Doe",
  "profile":"https://example.com/john.doe",
  "zoneinfo":"America/Los_Angeles",
  "locale":"en-US",
  "updated_at":1311280970,
  "email":"john.doe@example.com",
  "email_verified":true,
  "address" : { "street_address": "123 Hollywood Blvd.",
      "locality": "Los Angeles",
      "region": "CA",
      "postal_code": "90210",
      "country": "US"
    },
  "phone_number":"+1 (425) 555-1212"
}
```

#### ID token signature

This is the digital signature that Okta signs using the public key identified by the `kid` property in the Header section.

#### ID token claims

The Header and Payload sections contain claims.

##### Claims in the Header section

Claims in the Header are always returned.

| Property        | Description                                                                                                                                                                                                    | DataType      |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| alg             | Identifies the digital signature algorithm used. This is always `RS256`.                                                                                                                                      | String        |
| kid             | Identifies the public key used to verify the ID token. The corresponding public key can be found via the JWKS in the [discovery document](#well-knownopenid-configuration).                                    | String        |

##### Claims in the Payload section

Claims in the payload are either base claims, independent of scope (always returned), or dependent on scope (not always returned).

###### Base claims (always present)

| Property        | Description                                                                                                                                                                  | DataType    | Example                                             |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :-------------------------------------------------- |
| amr             | JSON array of strings that are identifiers for [authentication methods](http://self-issued.info/docs/draft-jones-oauth-amr-values-00.html) used in the authentication.       | Array       | [ "pwd", "mfa", "otp", "kba", "sms", "swk", "hwk" ] |
| aud             | Identifies the audience that this ID token is intended for. It is one of your application's OAuth 2.0 client IDs.                                                       | String      | 6joRGIzNCaJfdCPzRjlh                                |
| auth_time       | The time the end user was authenticated, represented in Unix time (seconds).                                                                                                 | Integer     | 1311280970                                          |
| exp             | The time the ID token expires, represented in Unix time (seconds).                                                                                                           | Integer     | 1311280970                                          |
| iat             | The time the ID token was issued, represented in Unix time (seconds).                                                                                                        | Integer     | 1311280970                                          |
| idp             | The Okta org ID or the ID of an [Identity Provider](/openapi/okta-management/management/tag/IdentityProvider/) if this authentication used Social Authentication or Inbound SAML.                           | String      | 00ok1u7AsAkrwdZL3z0g3                               |
| iss             | The URL of the authorization server that issued this ID token.                                                                                                                | String      | https://${yourOktaDomain}                            |
| jti             | A unique identifier for this ID token for debugging and revocation purposes.                                                                                                 | String      | Tlenfse93dgkaksginv                                 |
| sub             | The subject. A unique identifier for the user.                                                                                                                               | String      | 00uk1u7AsAk6dZL3z0g3                                |
| ver             | The semantic version of the ID token.                                                                                                                                        | Integer     | 1                                                   |

###### Scope-dependent claims (not always returned)

| Property            | Required Scope     | Description                                                                                                                                                                                                                         | DataType        | Example                                                                                                                           |
| :------------------ | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------  |
| name                | profile            | User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the user's locale and preferences.                                                                      | String          | John Doe                                                                                                                          |
| preferred_username  | profile            | The Okta login (username) for the end user.                                                                                                                                                                                         | String          | john.doe@example.com                                                                                                              |
| nickname            | profile            | Casual name of the user that may or may not be the same as the `given_name`.                                                                                                                                                          | String          | Jimmy                                                                                                                             |
| preferred_username  | profile            | The chosen login (username) for the end user. By default this is the Okta username.                                                                                                                                                 | String          | john.doe@example.com                                                                                                              |
| given_name          | profile            | Given name(s) or first name(s) of the user. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.                                               | String          | John                                                                                                                              |
| middle_name         | profile            | Middle name(s) of the user. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names aren't used.  | String          | James                                                                                                                             |
| family_name         | profile            | Surname(s) or last name(s) of the user. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.                                | String          | Doe                                                                                                                               |
| profile             | profile            | URL of the user's profile page.                                                                                                                                                                                                     | String          | https://profile.wordpress.com/john.doe                                                                                            |
| zoneinfo            | profile            | String that represents the user's time zone.                                                                                                                                                                                           | String          | America/Los_Angeles                                                                                                               |
| locale              | profile            | Language and [ISO3166‑1](http://www.iso.org/iso/country_codes) country code in uppercase, separated by a dash.                                                                                                                      | String          | en-US                                                                                                                             |
| updated_at          | profile            | Time the user's information was last updated, represented in Unix time (seconds).                                                                                                                                                   | Integer         | 1311280970                                                                                                                        |
| email               | email              | User's preferred email address. The resource provider must not rely on this value being unique.                                                                                                                                   | String          | john.doe@example.com                                                                                                              |
| email_verified      | email              | True if the user's email address (Okta primary email) has been verified; otherwise false.                                                                                                                                           | boolean         | true                                                                                                                              |
| address             | address            | User's preferred postal address. The value of the address member is a JSON structure that contains *street_address*, *locality*, *region*, *postal_code*, and *country*.                                                               | JSON structure  | `{ "street_address": "123 Hollywood Blvd.", "locality": "Los Angeles", "region": "CA", "postal_code": "90210", "country": "US" }` |
| phone_number        | phone              | User's preferred telephone number in E.164 format.                                                                                                                                                                                  | String          | +1 (425) 555-1212                                                                                                                 |
| groups              | groups             | The groups that the user is a member of that also match the ID token group filter of the client app.                                                                                                                                | List            | ["MyGroup1", "MyGroup2", "MyGroup3"]                                                                                              |

Be aware of the following before you work with scope-dependent claims:

* To protect against arbitrarily large numbers of groups matching the group filter, the groups claim has a limit of 100.
If more than 100 groups match the filter, then the request fails. Expect that this limit may change in the future.
For more information about configuring an app for OpenID Connect, including group claims, see [Create a client application](https://developer.okta.com/docs/guides/add-an-external-idp/openidconnect/main/).

> **Important:** Scope-dependent claims are returned differently depending on the values in `response_type` and the scopes requested:

  | Response Type             | Claims Returned in ID Token from Org     AS                                                        | Claims Returned in ID Token from Custom AS | Claims Returned from Userinfo Endpoint     |
  | :-------------------------| :------------------------------------------------------------------------------------------------- | :----------------------------------------- | :----------------------------------------- |
  | `code `                   | N/A                                                                                                | N/A                                        | N/A                                        |
  | `token`                   | N/A                                                                                                | N/A                                        | N/A                                        |
  | `id_token`                | Claims associated with requested scopes.                                                           | Claims associated with requested scopes.   | N/A                                        |
  | `id_token` `code `        | Claims associated with requested scopes.                                                           | Claims associated with requested scopes.   | N/A
  | `id_token` `token`        | `email` if email scope is requested; `name` and `preferred_username` if profile scope is requested | Claims associated with the requested scopes and the [`alwaysIncludeinToken` property](/openapi/okta-management/management/tag/AuthorizationServer/#tag/AuthorizationServer/operation/createOAuth2Claim!path=alwaysIncludeInToken&t=request) set to `true`. | Claims associated with the requested scopes|
  | `code` `id_token` `token` | `email` if email scope is requested; `name` and `preferred_username` if profile scope is requested | Claims associated with the requested scopes and the `alwaysIncludeinToken` property set to `true`. | Claims associated with the requested scopes|

* The full set of claims for the requested scopes is available via the [/oauth2/v1/userinfo](#userinfo) endpoint. Call this endpoint using the access token.

### Refresh token

Refresh tokens are opaque. More information about using them can be found in the [Refresh access tokens](https://developer.okta.com/docs/guides/refresh-tokens/) guide.

## Client authentication methods

Some endpoints require client authentication. To make requests to these endpoints, you must include a header or parameter in the request depending on the authentication method that the application is configured with.

When registering an OAuth 2.0 client application, specify an authentication method by including the [token_endpoint_auth_method](/docs/reference/api/apps/#add-oauth-2-0-client-application) parameter.

> **Note:** If you don't specify a method when registering your client, the default method is `client_secret_basic`.

Okta supports the following authentication methods, detailed in the sections below:

* `client_secret_basic`, `client_secret_post`, `client_secret_jwt`: Use one of these methods when the client has a client secret. Public clients (such as single-page and mobile apps) that can't protect a client secret must use `none` below.

* `private_key_jwt`: Use this when you want maximum security. This method is more complex and requires a server, so it can't be used with public clients.

* `none` - Use this with clients that don't have a client secret (such as applications that use the [authorization code flow with PKCE](https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/) or the [implicit flow](https://developer.okta.com/docs/guides/implement-grant-type/implicit/main/)).

### Client secret

If your client's `token_endpoint_auth_method` is either `client_secret_basic` or `client_secret_post`, include the client secret in outgoing requests.

* `client_secret_basic`: Provide the `client_id` and `client_secret` values in the Authorization header as a Basic auth base64-encoded string with the POST request:

  ```bash
    Authorization: Basic ${Base64(<client_id>:<client_secret>)}
  ```

* `client_secret_post`: Provide the `client_id` and `client_secret` as additional parameters in the POST request body.

### JWT with shared key

If you configured your client to use the `client_secret_jwt` client authentication method:

Provide the `client_id` in a JWT that you sign with the `client_secret` using an HMAC SHA algorithm (HS256, HS384, or HS512). The JWT must also contain other values, such as issuer and subject. See [Token claims for client authentication with client secret or private key JWT](#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt).

> **Note:** JWTs with a shared key require a secret that is at least 32 characters in length to satisfy HS256 cryptographic minimums. Clients that attempt to set `token_endpoint_auth_method` to `client_secret_jwt` with an imported secret less than 32 characters will receive a validation error. Clients that send Okta a JWT for verification signed with HS256, HS384, or HS512 with a secret less than 32 characters will receive an error: `The client secret is too short to verify a JWT HMAC.`.

  After you create the JWT, in the request you need to specify the `client_assertion_type` as `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and specify the JWT as the value for the `client_assertion` parameter.

  For example:

  ```http
  POST /token HTTP/1.1
  Host: server.example.com
  Content-Type: application/x-www-form-urlencoded
  grant_type=authorization_code&
    code=i1WsRn1uB1&
    client_id=0oajncakofQmjxlSw0h3
    client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
    client_assertion=PHNhbWxwOl ... ZT
  ```

### JWT with private key

This method is similar to JWT with shared key, but uses a public/private key pair for more security. The main benefit of this method is you can generate the private key on your own servers and never have it leave there for any reason, since you only need to provide the public key to Okta. This is better than `client_secret_jwt` since Okta must know what the `client_secret` string is beforehand, so there are more places that it could in theory be compromised.

If you configured your client to use the `private_key_jwt` client authentication method:

Provide the `client_id` in a JWT that you sign with your private key using an RSA or ECDSA algorithm (RS256, RS384, RS512, ES256, ES384, ES512). See [Build a JWT for client authentication](https://developer.okta.com/docs/guides/build-self-signed-jwt/). The JWT must also contain other values, such as issuer and subject. See [Token claims for client authentication with client secret or private key JWT](#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt).

> **Note:** The private key that you use to sign the JWT must have the corresponding public key registered in the client's [JWKSet](/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient!path=jwks&t=request).

After you create the JWT, in the request you need to specify the `client_assertion_type` as `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and specify the JWT as the value for the `client_assertion` parameter.

For example:

```http
POST /token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded
grant_type=authorization_code&
  code=i1WsRn1uB1&
  client_id=0oajncakofQmjxlSw0h3
  client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
  client_assertion=PHNhbWxwOl ... ZT
```

### None

Specify `none` when the client is a public client and doesn't have a client secret. Only the `client_id` is sent in the request body.

### Token claims for client authentication with client secret or private key JWT

If you use a JWT for client authentication (`client_secret_jwt` or `private_key_jwt`), use the following token claims:

| Token Claims   | Description                                                                             | Type    |
| :------------- | :-------------------------------------------------------------------------------------- | :-----  |
| aud            | Required. The full URL of the resource you're using the JWT to authenticate to.         | String  |
| exp            | Required. The expiration time of the token in seconds since January 1, 1970 UTC.        | Integer |
| jti            | Optional. The identifier of the token.                                                  | String  |
| iat            | Optional. The issuing time of the token in seconds since January 1, 1970 UTC.           | Integer |
| iss            | Required. The issuer of the token. This value must be the same as the `client_id`.      | String  |
| sub            | Required. The subject of the token. This value must be the same as the `client_id`.     | String  |

**Parameter details**

* If `jti` is specified, the token can only be used once. So, for example, subsequent token requests won't succeed.
* The `exp` claim fails the request if the expiration time is more than one hour in the future or has already expired.
* If `iat` is specified, then it must be a time before the request is received.

## Troubleshooting

If you run into trouble setting up an authorization server or performing other tasks for OAuth 2.0/OIDC, use the following suggestions to resolve your issues.

### Start with the System Log

The system log contains detailed information about why a request was denied and other useful information.

### Limits

* Scopes are unique per authorization server.

* The `audiences` value you specify is an array of String. If the string contains ":" it must be a valid URI.

* Tokens can expire, be explicitly revoked at the endpoint, or implicitly revoked by a change in configuration.

* Token revocation can be implicit in two ways: token expiration or a change to the source.
    * Expiration happens at different times:
        * ID token expires after one hour.
        * Access token expiration is configured in a policy, but is always between five minutes and one day.
        * Refresh token expiration depends on two factors:
            1) Expiration is configured in an access policy, no limits, but must be greater than or equal to the access token lifetime
            2) Revocation if the refresh token isn't exercised within a specified time. Configure the specified time in an access policy, with a minimum of ten minutes.

    * Revocation happens when a configuration is changed or deleted:
        * User deactivation or deletion.
        * Configuration in the authorization server is changed or deleted.
        * The [client app](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) is deactivated, changed, unassigned, or deleted.

### Subtle behavior

Some behaviors aren't obvious:

* A user must be assigned to the client in Okta for the client to get access tokens from that client. You can assign the client directly (direct user assignment) or indirectly (group assignment).

* If you haven't created a rule in a policy on the authorization server to allow the client, user, and scope combination that you want, the request fails. To resolve, create at least one rule in a policy on the authorization server for the relevant resource that specifies client, user, and scope.

* OpenID Connect scopes are granted by default, so if you are requesting only those scopes (`openid`, `profile`, `email`, `address`, `phone`, or `offline_access`), you don't need to define any scopes for them, but you need a policy and rule on a Custom Authorization Server. The rule grants the OpenID Connect scopes by default, so they don't need to be configured in the rule. Token expiration times depend on how they are defined in the rules and which policies and rules match the request.

* OpenID scopes can be requested with custom scopes. For example, a request can include `openid` and a custom scope.

* The evaluation of a policy always takes place during the initial authentication of the user (or of the client in case of the client credentials flow). If the flow isn't immediately finished, such as when a token is requested using the `authorization_code` grant type, the policy isn't evaluated again, and a change in the policy after the user or client is initially authenticated won't affect the continued flow.
