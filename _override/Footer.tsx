import * as React from 'react';
import styled from 'styled-components';
import * as Tokens from "@okta/odyssey-design-tokens";

import { Flex, Link } from '@redocly/ui';

/*
This extends the footer with the Need Support? Column, the Social Column and the final column with 3 extra links to match the dev site.
*/

export default function Footer(props) {
    const { columns, copyrightText } = props.footer;

    return (
        <FooterWrapper>
            <Flex py="60px" px="60px">
                <FooterGroups>
                    <li>
                        <Support>
                            <div>
                                Need Support?
                            </div>
                            You can contact your Okta account team or ask us on our <a href="https://devforum.okta.com/">forum</a>.
                        </Support>
                        <Copyright>
                        <div>&nbsp;</div>
                        Copyright © 2022 Okta.
                        </Copyright>
                    </li>
                    <li>
                        <FooterTitle>
                            Social
                        </FooterTitle>
                        <SocialLinks>
                            <li>
                                <a href="https://github.com/oktadev">
                                    <svg width="19" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M17.214 4.595a9.185 9.185 0 00-3.358-3.358C12.443.412 10.9 0 9.226 0 7.552 0 6.008.412 4.595 1.237a9.184 9.184 0 00-3.358 3.358C.412 6.008 0 7.552 0 9.225c0 2.01.587 3.818 1.76 5.424 1.173 1.606 2.689 2.717 4.546 3.333.217.04.377.012.48-.084a.47.47 0 00.157-.36l-.006-.649c-.004-.408-.006-.764-.006-1.069l-.276.048a3.52 3.52 0 01-.667.042 5.092 5.092 0 01-.835-.084 1.866 1.866 0 01-.805-.36 1.524 1.524 0 01-.528-.739l-.12-.276a3.003 3.003 0 00-.379-.613c-.172-.224-.346-.376-.522-.456l-.084-.06a.882.882 0 01-.156-.144.66.66 0 01-.108-.169c-.025-.056-.005-.102.06-.138.064-.036.18-.054.348-.054l.24.036c.16.032.358.128.595.289.236.16.43.368.582.624.185.328.407.579.667.75.26.173.522.26.787.26.264 0 .492-.021.684-.06.192-.04.373-.101.541-.181.072-.537.268-.95.588-1.238a8.224 8.224 0 01-1.23-.216 4.896 4.896 0 01-1.13-.468 3.233 3.233 0 01-.967-.805c-.256-.32-.466-.741-.63-1.261-.165-.521-.247-1.122-.247-1.802 0-.97.317-1.794.95-2.475-.297-.729-.269-1.545.083-2.45.233-.073.577-.018 1.033.162.457.18.791.334 1.004.462.212.128.382.237.51.325a8.53 8.53 0 012.307-.313 8.53 8.53 0 012.306.313l.457-.289c.312-.192.68-.368 1.104-.528.425-.16.75-.204.974-.132.36.905.392 1.721.096 2.45.632.68.949 1.506.949 2.475 0 .68-.082 1.283-.246 1.808-.164.524-.377.944-.637 1.26a3.36 3.36 0 01-.973.8 4.916 4.916 0 01-1.13.468 8.208 8.208 0 01-1.23.217c.416.36.624.929.624 1.705v2.535c0 .144.05.264.15.36.1.096.258.124.475.084 1.858-.617 3.373-1.728 4.547-3.333 1.173-1.606 1.76-3.414 1.76-5.424-.001-1.673-.414-3.217-1.238-4.63z"></path></svg>
                                    <span>GitHub</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/OktaDev">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm4.11 7.017c.003.089.005.178.005.267 0 2.73-2.078 5.878-5.877 5.878a5.847 5.847 0 01-3.167-.928 4.144 4.144 0 003.058-.856A2.068 2.068 0 015.2 9.943a2.056 2.056 0 00.934-.035 2.066 2.066 0 01-1.657-2.051c.278.154.597.247.935.258a2.064 2.064 0 01-.64-2.758A5.865 5.865 0 009.03 7.515a2.066 2.066 0 013.52-1.884c.47-.092.913-.264 1.312-.5a2.074 2.074 0 01-.909 1.142 4.12 4.12 0 001.187-.326 4.2 4.2 0 01-1.03 1.07z"/></svg>
                                    <span>Twitter</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/c/oktadev">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M7.879 10.372l2.928-1.686L7.878 7v3.372z"/><path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm5.624 9.009s0 1.825-.232 2.705a1.41 1.41 0 01-.991.992c-.88.231-4.401.231-4.401.231s-3.511 0-4.4-.24a1.41 1.41 0 01-.992-.992C3.376 10.835 3.376 9 3.376 9s0-1.825.232-2.705c.13-.482.519-.871.991-1.001C5.48 5.062 9 5.062 9 5.062s3.52 0 4.4.241c.482.13.862.51.992.992.241.88.232 2.714.232 2.714z"/></svg>
                                    <span>YouTube</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://devforum.okta.com/">
                                    <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.434.158a8.927 8.927 0 00-6.51 3.102C.098 6.513.012 11.48 2.725 14.81a9.033 9.033 0 009.974 2.81c1.454-.51 3.01-.174 4.061.878l.297.297.296-.296a2.854 2.854 0 00.002-4.032l-.232-.232c2.437-3.538 2.016-8.4-1.04-11.457A9.014 9.014 0 009.434.158zm3.189 6.08a4.107 4.107 0 01-.008 5.801 4.106 4.106 0 01-5.801.008 4.106 4.106 0 01.007-5.802 4.107 4.107 0 015.802-.007z"/></svg>
                                    <span>Forum</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://developer.okta.com/feed.xml">
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zM34.7 73.5c-3.9 0-7-3.2-7-7 0-3.9 3.2-7.1 7-7.1 3.9 0 7.1 3.2 7.1 7.1 0 3.8-3.2 7-7.1 7zm22.4-.4c-2.2 0-4.2-1.6-4.5-3.8-.8-5.2-3.3-9.9-7.1-13.7-3.8-3.8-8.5-6.2-13.6-7.1-2.2-.4-3.8-2.3-3.8-4.5 0-2.8 2.6-5 5.4-4.5 14.4 2.4 25.8 13.8 28.3 28.3.4 2.7-1.8 5.3-4.7 5.3zM70.8 69c-2.2-20.3-18.2-36.5-38.4-38.6-2.3-.2-4.1-2.2-4.1-4.6 0-2.7 2.3-4.9 5-4.6C57.8 23.7 77.5 43.3 80 68c.3 2.7-1.9 5-4.6 5-2.4.1-4.4-1.7-4.6-4z"/></svg>
                                    <span>Blog RSS</span>
                                </a>
                            </li>
                        </SocialLinks>
                    </li>
                    {
                        columns.map((col, index) => {
                            return <li key={index}>
                                <FooterTitle>
                                    {col.group}
                                </FooterTitle>
                                <FooterItems>
                                    {
                                        col.items.map((item, index) => {
                                            return <FooterItem key={index}>
                                                <Link to={item.link}>{item.label}</Link>    
                                            </FooterItem>
                                        })
                                    }
                                </FooterItems>
                            </li>
                        })
                    }
                    <li>
                        <AdditionalLink>
                            <div>
                                <a href="https://www.okta.com/">
                                    okta.com
                                </a>
                            </div>
                            Products, case studies, resources
                        </AdditionalLink>
                        <AdditionalLink>
                            <div>
                                <a href="https://support.okta.com/help/s/">
                                    Help Center
                                </a>
                            </div>
                            Knowledgebase, roadmaps, and more
                        </AdditionalLink>
                        <AdditionalLink>
                            <div>
                                <a href="https://trust.okta.com/">
                                    Trust
                                </a>
                            </div>
                            System status, security, compliance
                        </AdditionalLink>
                    </li>
                </FooterGroups>
            </Flex>
        </FooterWrapper>
    )
}

const Support = styled.div`
    color: ${Tokens.ColorPaletteNeutral200};
    line-height: 1.8em;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.3em;

    & div {
        color: ${Tokens.ColorTextBodyInverse};
        line-height: 1.3em;
        font-weight: 400;
        font-size: 20px;
        margin-bottom: 20px;
        letter-spacing: .5px;
    }
    & a {
        color: ${Tokens.ColorPaletteNeutral200};
        text-decoration: underline !important;
    }
`;

const Copyright = styled.div`
    color: ${Tokens.ColorTextBodyInverse};
    font-size: 16px;
    font-weight: 500;
    margin-top: 35px;

    & div {
        left: 0;
        width: 34px;
        height: 1px;
        border-bottom: solid 1px ${Tokens.ColorPaletteNeutral200};
        top: 0;
        margin-bottom: 35px;
    }
`;

const SocialLinks = styled.ul`
    margin: 0;
    padding: 0;
    vertical-align: middle;
    & li {
        margin-bottom: 16px;
        & a {
            display: flex;
            align-items: center;
            & svg {
                width: 1.2em;
                height: 1.2em;
                fill: ${Tokens.ColorTextBodyInverse};
            }
            & span {
                margin-left: 16px;
            }
        }
    }
`

// z-index keeps footer above right nav
const FooterWrapper = styled.div`
    background: ${Tokens.ColorPaletteBlue900};
    z-index: 100;
`;

const FooterGroups = styled.ul`
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-basis: 100%;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.3em;
    color: ${Tokens.ColorPaletteNeutral200};
    & li {
        flex: 1;
        list-style: none;
        margin-right: 20px;
        & a {
            text-decoration: none;
            color: ${Tokens.ColorPaletteNeutral200};
            & :hover {
                text-decoration: underline;
            }
        }
    }
`;

const FooterTitle = styled.div`
    color: ${Tokens.ColorTextBodyInverse};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.3em;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 35px;
`;

const FooterItems = styled.ul`
    margin: 0;
    padding: 0;
`;

const FooterItem = styled.li`
    margin: 0 0 16px;
`;

const AdditionalLink = styled.div`
    margin-bottom: 35px;
    & div {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.3em;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        margin-bottom: 6px;
        & a {
            text-decoration: none;
            color: ${Tokens.ColorTextBodyInverse};
            & :hover {
                text-decoration: underline;
            }
        }
    }
`