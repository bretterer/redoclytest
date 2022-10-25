---
title: Client authentication methods
category: authentication
excerpt: Control user access to your applications.
meta:
  - name: description
    content: Find information about the OAuth 2.0 and OpenID Connect endpoints that Okta exposes on its authorization servers.
---

# Client authentication methods

Some endpoints require client authentication. To make requests to these endpoints, you must include a header or parameter in the request depending on the authentication method that the application is configured with.

When registering an OAuth 2.0 client application, specify an authentication method by including the [`token_endpoint_auth_method`](/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient!path=token_endpoint_auth_method&t=request) parameter.

> **Note:** If you don't specify a method when registering your client, the default method is `client_secret_basic`.<p>
To create a client application and specify the authentication method, see [Create a Client application](/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient). To change the client authentication method of an existing app, see [Replace an Application](https://oktadev.redoc.ly/openapi/okta-management/management/tag/Application/#tag/Application/operation/updateApplication).

Okta supports the following authentication methods, detailed in the sections below:

* `client_secret_basic`, `client_secret_post`, `client_secret_jwt`: Use one of these methods when the client has a client secret. Public clients (such as single-page and mobile apps) that can't protect a client secret must use `none` below.

* `private_key_jwt`: Use this when you want maximum security. This method is more complex and requires a server, so it can't be used with public clients.

* `none` - Use this with clients that don't have a client secret (such as applications that use the [authorization code flow with PKCE](https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/) or the [implicit flow](https://developer.okta.com/docs/guides/implement-grant-type/implicit/main/)).

## Client secret

If your client's `token_endpoint_auth_method` is either `client_secret_basic` or `client_secret_post`, include the client secret in outgoing requests.

* `client_secret_basic`: Provide the `client_id` and `client_secret` values in the Authorization header as a Basic auth base64-encoded string with the POST request:

  ```bash
    Authorization: Basic {Base64(<client_id>:<client_secret>)}
  ```

* `client_secret_post`: Provide the `client_id` and `client_secret` as additional parameters in the POST request body.

## JWT with shared key

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

## JWT with private key

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

## None

Specify `none` when the client is a public client and doesn't have a client secret. Only the `client_id` is sent in the request body.

## Token claims for client authentication with client secret or private key JWT

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