# Okta API developer portal

This contains the Redoc.ly developer portal implementation of Okta's API reference documentation. It uses a set of OpenAPI 3.0 specifications, markdown files, and a set of product customization toggles and custom CSS.

## Getting Started

### Prerequisites

- [node.js >= 12.22.6](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

### Install

    yarn install

### Start development server

    yarn start

Note: Search isn't functional in the development environment.

### Troubleshooting

We heavily rely on caching for performance issues so if some changes aren't reflected in the resulting portal, try cleaning cache by running:

    yarn clean

### Redocly ocs

Read the [online documentation](https://redoc.ly/docs/reference/introduction/) for the Redoc.ly developer portal.

## Developer details

### Main page and navigation

The main configuration of the product is done in `./siteConfig.yaml`. This file contains basic metadata, global configuration of the site, and the header and footer, as well as an index of OpenAPI specifications and stylesheets.

The left navigation bar is mostly controlled by the `./sidebars.yaml` configuration, which has basic grouping and layout configuration for markdown files and OpenAPI specs. Any specific groupings or dropdown menus for the APIs is controlled by the OpenAPI specification.

### OpenAPI specification reference docs

You must declare each OpenAPI spec in the `./siteConfig.yaml` file and have a matching configuration file that matches the `*.page.yaml` pattern found next to the matching spec yaml file under the `./openapi` directory. The `*.page.yaml` configuration file allows you to make configurations specific to the set of APIs described in the spec, mostly matching the settings supported by the [Redoc.ly API Reference product sessions](https://redocly.com/docs/api-reference-docs/configuration/functionality/).

### Additional markdown content

You can inject any number of `.md` and `.mdx` files to add additional content. `.mdx` files can contain custom React components, including redoc.ly provided components that can reference pieces of the API reference docs. See the [Alert](https://redocly.com/docs/developer-portal/components/alert/) component and other provided components in the left navigation.

### Extensibility

Redocly has a set of extensibility points that you can use through `.tsx` files in `./_override`.

`Footer.tsx` is dedicated to customizing the footer section by overriding the `Footer` function.

`ReferenceDocHooks.tsx` is dedicated to the many extensibility points to the API Reference docs by overriding various poorly documented functions like `AfterOperationSummary`. The Redoc.ly team is actively adding more out-of-the-box configuration, as well as more extensibility hook points. We currently use this content to make a more friendly Authz section and decorate the APIs with more information, such as API feature lifecycle.