import {BuildSpec} from "@aws-cdk/aws-codebuild/lib/build-spec";


export const webappBuildSpec: BuildSpec = BuildSpec.fromObject({
    "version": 1,
    "frontend": {
        "phases": {
            "preBuild": {
                "commands": [
                    "npm ci"
                ]
            },
            // IMPORTANT - Please verify your build commands
            "build": {
                "commands": [
                    "if [ \"${AWS_BRANCH}\" = \"master\" ]; then npm run build; fi",
                    "if [[ \"${AWS_BRANCH}\" = \"release/\"* ]]; then npm run build-staging; fi",
                    "if [ \"${AWS_BRANCH}\" = \"develop\" ]; then npm run build-dev; fi",
                    "if [[ \"${AWS_BRANCH}\" = \"feature/\"* ]]; then npm run build-dev; fi"
                ]
            }
        },
        "artifacts": {
            // IMPORTANT - Please verify your build output directory
            "baseDirectory": "/build",
            "files": [
                "**/*"
            ]
        },
        "cache": {
            "paths": [
                "node_modules/**/*"
            ]
        },
        "customHeaders": [
            {
                // Security policies
                "pattern": "**/*",
                "headers": [
                    {
                        "key": "Strict-Transport-Security",
                        "value": "max-age=15552000; includeSubDomains"
                    },
                    {
                        "key": "X-Frame-Options",
                        "value": "SAMEORIGIN"
                    },
                    {
                        "key": "X-XSS-Protection",
                        "value": "1; mode=block"
                    },
                    {
                        "key": "X-Content-Type-Options",
                        "value": "nosniff"
                    },
                    {
                        "key": "Content-Security-Policy",
                        "value": "default-src 'self' 'unsafe-inline' https: data:; script-src 'unsafe-inline' https://*.wasedatime.com/static/js/ https://wasedatime.com/static/js/ https://www.google-analytics.com/;"
                    },
                    {
                        "key": "X-Content-Security-Policy",
                        "value": "default-src 'self' 'unsafe-inline' https: data:; script-src 'unsafe-inline' https://*.wasedatime.com/static/js/ https://wasedatime.com/static/js/ https://www.google-analytics.com/;"
                    },
                    {
                        "key": "X-WebKit-CSP",
                        "value": "default-src 'self' 'unsafe-inline' https: data:; script-src 'unsafe-inline' https://*.wasedatime.com/static/js/ https://wasedatime.com/static/js/ https://www.google-analytics.com/;"
                    },
                    {
                        "key": "X-Download-Options",
                        "value": "noopen"
                    },
                    {
                        "key": "X-DNS-Prefetch-Control",
                        "value": "off"
                    }
                ]
            },
            // Response caching
            {
                "pattern": "**/*.js",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public,max-age=86400,immutable"
                    }
                ]
            },
            {
                "pattern": "**/*.css",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public,max-age=86400,immutable"
                    }
                ]
            },
            {
                "pattern": "**/*.png",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public,max-age=2592000,immutable"
                    }
                ]
            },
            {
                "pattern": "**/*.jpg",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public,max-age=2592000,immutable"
                    }
                ]
            },
            {
                "pattern": "**/*.ico",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public,max-age=31536000,immutable"
                    }
                ]
            },
            {
                "pattern": "**/*.svg",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public,max-age=2592000,immutable"
                    }
                ]
            }
        ]
    }
});

export const webappDevBuildSpec: BuildSpec = BuildSpec.fromObject({
    "version": 1,
    "frontend": {
        "phases": {
            "preBuild": {
                "commands": ["npm ci"]
            },
            // IMPORTANT - Please verify your build commands
            "build": {
                "commands": ["npm run build-dev"]
            }
        },
        "artifacts": {
            // IMPORTANT - Please verify your build output directory
            "baseDirectory": "/build",
            "files": ["**/*"]
        },
        "cache": {
            "paths": ["node_modules/**/*"]
        }
    }
});

export const openapiBuildSpec: BuildSpec = BuildSpec.fromObject({
    "version": 1,
    "frontend": {
        "phases": {
            "build": {
                "commands": []
            }
        },
        "artifacts": {
            "baseDirectory": "/",
            "files": [
                "**/*"
            ]
        },
        "cache": {
            "paths": []
        }
    }
});
