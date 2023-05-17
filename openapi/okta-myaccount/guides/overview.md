# MyAccount API

<x-lifecycle class="oie"></x-lifecycle>

The Okta MyAccount API allows end users to fetch and update their own Okta user profiles. It implements a subset of the existing [Users API](/openapi/okta-management/management/tag/User/) but with significant differences:

* The API doesn't expose information an end user shouldn't have access to.
* The API doesn't support lifecycle operations.
* All operations in this API implicitly refer to the user making the API call. No user ID is needed or even accepted.

#### API versioning

A valid API version in the `Accept` header is required to access the API. Current version: V1.0.0

```json
Accept: application/json; okta-version=1.0.0
```

#### Access Token assurance
> Note: Access Token assurance doesn't apply to the MyAccount App Authenticators API.

MyAccount operations that create, update, or delete resources require Access Tokens up to 15 minutes old. API calls with Access Tokens older than 15 minutes require re-authentication. If you don't re-authenticate the token, the API returns a 403 error with the following content in the header:

```json
www-authenticate: Bearer realm="IdpMyAccountAPI", error="insufficient_authentication_context", error_description="The access token requires additional assurance to access the resource", max_age=900
```