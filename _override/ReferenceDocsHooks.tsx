import * as React from 'react'
import styled from 'styled-components'
import * as Tokens from "@okta/odyssey-design-tokens"

const LifecycleBadge = styled.span`
    background: ${
        props => props.beta ? Tokens.ColorPaletteYellow500
          : props.ea ? Tokens.ColorPalettePurple500
          : props.ie ? Tokens.ColorPaletteBlue900
          : props.cors ? Tokens.ColorPaletteNeutral500
          : props.sku ? Tokens.ColorPaletteGreen500
          : Tokens.ColorPaletteNeutral500 };
    border-radius: ${Tokens.BorderRadiusOuter};
    margin-right: ${Tokens.SpaceScale2};
    padding: ${Tokens.SpaceScale0};
    font-size: ${Tokens.FontScale1};
    vertical-align: super;
    color: ${Tokens.ColorTextBodyInverse};
`

const LifecycleAndScopesContainer = styled.div`
    margin-top: ${Tokens.SpaceScale3}
`

const OAuth2ScopesTitle = styled.a`
    font-size: ${Tokens.FontScale2};
    color: ${Tokens.ColorTextBody};
    text-decoration: none;
`

const IamPermissionsTitle = styled.span`
    font-size: ${Tokens.FontScale2};
    color: ${Tokens.ColorTextBody};
    text-decoration: none;
`

const Code = styled.code`
    color: ${Tokens.ColorTextBody};
    font-size: ${Tokens.FontSizeBody};
    background-color: ${Tokens.ColorPaletteNeutral100};
    padding: ${Tokens.SpaceScale0};
`

function getLifecycleBadge(operation) {
    if (operation["x-okta-lifecycle"]) {
        const lifecycle = operation["x-okta-lifecycle"]
        if (lifecycle.lifecycle === "BETA") {
            return <LifecycleBadge beta>Beta</ LifecycleBadge>
        } else if (lifecycle.lifecycle === "EA") {
            return <LifecycleBadge ea>Early Access</ LifecycleBadge>
        } else if (lifecycle.lifecycle === "PRODUCT_DEV") {
            return <LifecycleBadge product-dev>Product Dev</ LifecycleBadge>
        } else if (lifecycle.lifecycle === "TEST") {
            return <LifecycleBadge test>Test</ LifecycleBadge>
        }
    }
    return null
}

// TODO need to confirm which other SKUs we want to advertise
function getSkuBadges(operation) {
    if (operation["x-okta-lifecycle"] && operation["x-okta-lifecycle"].SKUs) {
        const skus = operation["x-okta-lifecycle"].SKUs
        return (
            <span>
                {skus.map((sku) => {
                    if (sku === "Okta Identity Engine") {
                        return <LifecycleBadge ie>Identity Engine</LifecycleBadge>
                    } else {
                        return <LifecycleBadge sku>{sku}</LifecycleBadge>
                    }
                })}
            </span>
        )
    }
    return null
}

function getCorsBadge(operation) {
    if (operation["x-okta-lifecycle"]) {
        const lifecycle = operation["x-okta-lifecycle"]
        if (lifecycle.isCorsEnabled) {
            return <LifecycleBadge cors>CORS</ LifecycleBadge>
        }
    }
    return null
}

function getOAuth2ScopeSection(operation) {
    if (operation.security) {
        const oauth2Scheme = operation.security.find(scheme => "oauth2" in scheme || "OAuth2" in scheme)
        if (oauth2Scheme) {
            const scopes = oauth2Scheme["oauth2"] || oauth2Scheme["OAuth2"]
            return (
                <div>
                    <span>
                        <OAuth2ScopesTitle href="/oauth2">OAuth 2.0: </OAuth2ScopesTitle>
                    </span>
                    {scopes.map((scope) => {
                        return <Code>{scope}</Code>
                    })}
                </div>
            )
        }
    }
    return null
}

export function getIamPermissions(rawOperation) {
    // you get the operation model with raw operation info from the OAS definition
    if (rawOperation['x-iam-permissions']) {
      const permissions = rawOperation['x-iam-permissions']
      return (
        <div>
            <span>
                <IamPermissionsTitle>Admin permissions required: </IamPermissionsTitle>
            </span>
            {permissions.map((scope, index) => {
                return <Code key={index}>{scope}</Code>
            })}
        </div>
      );
    } else {
      return null;
    }
  }

export function AfterOperationSummary({ operation }) {
    // you get the operation model with raw operation info from the OAS definition
    const rawOperation = operation.operationDefinition
    console.log(JSON.stringify(rawOperation))
    return (
        <LifecycleAndScopesContainer>
            <div>
                { getLifecycleBadge(rawOperation) }
                { getCorsBadge(rawOperation) }
                { getSkuBadges(rawOperation) }
            </div>
            { getIamPermissions(rawOperation) }
            { getOAuth2ScopeSection(rawOperation) }
        </LifecycleAndScopesContainer>
    )
}