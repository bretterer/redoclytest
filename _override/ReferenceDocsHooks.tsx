import * as React from 'react'
import styled from 'styled-components'
import * as Tokens from "@okta/odyssey-design-tokens"

const LifecycleBadge = styled.span`
    background: ${props => props.beta ? Tokens.ColorPaletteYellow500 : props.ea ? Tokens.ColorPalettePurple500 : props.ie ? Tokens.ColorPaletteBlue900 : Tokens.ColorPaletteNeutral500 };
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

const OAuth2Scope = styled.code`
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
        }
    }
    return null
}

function getIdentityEngineBadge(operation) {
    if (operation["x-okta-lifecycle"]) {
        const lifecycle = operation["x-okta-lifecycle"]
        if (lifecycle.isIdentityEngine) {
            return <LifecycleBadge ie>Identity Engine</ LifecycleBadge>
        }
    }
    return null
}

function getOAuth2ScopeSection(operation) {
    if (operation.security) {
        const oauth2Scheme = operation.security.find(scheme => "OAuth 2.0" in scheme)
        if (oauth2Scheme) {
            const scopes = oauth2Scheme["OAuth 2.0"]
            return (
                <div>
                    <span>
                        <OAuth2ScopesTitle href="/oauth2">OAuth 2.0: </OAuth2ScopesTitle>
                    </span>
                    {scopes.map((scope) => {
                        return <OAuth2Scope>{scope}</OAuth2Scope>
                    })}
                </div>
            )
        }
    }
    return null
}

export function AfterOperationSummary({ operation }) {
    // you get the operation model with raw operation info from the OAS definition
    const rawOperation = operation.operationDefinition
    console.log(JSON.stringify(rawOperation))
    return (
        <LifecycleAndScopesContainer>
            <div>
                { getIdentityEngineBadge(rawOperation) }
                { getLifecycleBadge(rawOperation) }
            </div>
            { getOAuth2ScopeSection(rawOperation) }
        </LifecycleAndScopesContainer>
    )
}