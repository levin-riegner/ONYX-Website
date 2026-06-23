const IMAGE_FRAGMENT = `
    fragment ReusableImage on FileFieldInterface {
        url
        alt
        blur: blurUpThumb
    }
`;

/**
 * Shared page builder block spreads for activation, dataSupply, and about.
 * Keep in sync with DatoCMS modular field blocks and PageBuilder routing.
 */
const PAGE_BUILDER_BLOCKS = `
    __typename

    ... on AlternatingMediaRowRecord {
        id
        heading
        desc: description
        rows: row {
            heading
            desc: description
            companyNames {
                heading
            }
            showCompanyNames
            showDescription
            iconImage {
                ...ReusableImage
            }
        }
    }

    ... on AnimatedStoryRecord {
        id
        desc: description
        animatedText {
            value
        }
        buttonLabel
    }

    ... on BigIconTextGridRecord {
        id
        heading
        desc: description
        sections: iconTextGrid {
            id
            subHeading
            heading
            desc: description {
                value
            }
            icon {
                ...ReusableImage
            }
        }
    }

    ... on ComparisonTableRecord {
        id
        heading
        desc: description
        background: backgroundImage {
            ...ReusableImage
        }
        table: comparisonRows {
            id
            onyx
            feature
            competitor
        }
    }

    ... on EditorialStoryCtaStatRecord {
        id
        heading
        animatedText

        inlineCallToAction {
            description
            buttonLabel
            heading
            overrideBackground
            backgroundImage {
                ...ReusableImage
            }
        }

        statistics {
            symbolBeforeNumber
            symbolAfterNumber
            number
            hasSymbolBefore
            heading
            id
        }
    }

    ... on FaqRecord {
        id
        heading
        desc: description
        background: backgroundImage {
            ...ReusableImage
        }
        faqs {
            id
            question
            answer
        }
    }

    ... on HeadingDescriptionRecord {
        id
        heading
        desc: description
    }

    ... on MembersTeamRecord {
        id
        heading
        desc: description
        teamMembers {
            id
            name
            role
            linkedinUrl
            email
            image: profilePicture {
                ...ReusableImage
            }
        }
    }

    ... on NumberedProcessGridRecord {
        id
        heading
        processes {
            heading
            description
        }
    }

    ... on ParallaxRecord {
        id
        parallaxSections {
            id
            heading
            desc: description
            image: backgroundImage {
                ...ReusableImage
            }
        }
    }

    ... on SplitFeatureGridRecord {
        id
        heading
        features {
            heading
            desc: description
            media: iconImage {
                ...ReusableImage
            }
        }
    }

    ... on StatisticsGridRecord {
        id
        heading
        statistics {
            id
            heading
            hasSymbolBefore
            symbolBeforeNumber
            symbolAfterNumber
            number
        }
    }
`;

export const SEO = `
    query {
        seo {
            meta: metadata {
                image {
                    url
                }
                desc: description
                title
                twitterCard
            }
        }
    }
`;

export const EVERYTHING = `
    ${IMAGE_FRAGMENT}
    query {
        home {
            title
            desc
            unicornId
            partnerLogos {
                id
                ...ReusableImage
            }
        }

        contactDetails: detailsContact {
            email
            linkedin: linkedinUrl
            twitter: twitterXUrl
        }

        contact {
            heading
            title
            desc: description
        }

        legal {
            lastUpdated: _updatedAt
            title
            heading
            desc: description {
                value
            }

            pageBuilder {
                __typename

                ... on StandardContentRecord {
                    id
                    heading
                    text {
                        value
                    }
                }
            }
        }

        cta: callToAction {
            heading
            buttonLabel
        }

        activation {
            title
            heading
            desc: description  
            logoMarquee {
                id
                ...ReusableImage
            }
            pageBuilder {
                ${PAGE_BUILDER_BLOCKS}
            }

            isCtaOverridden
            overrideHeading: ctaHeading
            overrideButtonLabel: ctaButtonLabel
        }

        dataSupply {
            title
            heading
            desc: description
            usaCoverage

            isCtaOverridden
            overrideHeading: ctaHeading
            overrideButtonLabel: ctaButtonLabel

            pageBuilder {
                ${PAGE_BUILDER_BLOCKS}
            }
        }

        about {
            featuredImage {
                ...ReusableImage
            }
            title
            heading
            desc: description

            isCtaOverridden
            overrideHeading: ctaHeading
            overrideButtonLabel: ctaButtonLabel

            pageBuilder {
                ${PAGE_BUILDER_BLOCKS}
            }
        }
    }
`;
