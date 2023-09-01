module.exports = ({ env }) => {
  const security = env("AWS_S3_URL")
    ? {
        name: "strapi::security",
        config: {
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              "script-src": ["'self'", "editor.unlayer.com"],
              "frame-src": ["'self'", "editor.unlayer.com"],
              "img-src": ["'self'", "blob:", "data:", env("AWS_S3_URL")],
              "connect-src": ["'self'", "https:"],
              "media-src": ["'self'", "blob:", "data:", env("AWS_S3_URL")],
              upgradeInsecureRequests: null,
            },
          },
        },
      }
    : {
        name: "strapi::security",
        config: {
          contentSecurityPolicy: {
            directives: {
              "script-src": ["'self'", "editor.unlayer.com"],
              "frame-src": ["'self'", "editor.unlayer.com"],
              "img-src": [
                "'self'",
                "data:",
                "cdn.jsdelivr.net",
                "strapi.io",
                "*.amazonaws.com",
                "*.selcdn.ru",
              ],
              "media-src": [
                "'self'",
                "blob:",
                "data:",
                "*.amazonaws.com",
                "*.selcdn.ru",
              ],
            },
          },
        },
      };

  return [
    "strapi::errors",
    security,
    {
      name: "strapi::cors",
      config: {
        headers: [
          "Content-Type",
          "Authorization",
          "Origin",
          "Accept",
          "Next-Auth-Factor-Key",
        ],
      },
    },
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    {
      name: "strapi::body",
      config: {
        formLimit: "256mb",
        jsonLimit: "256mb",
        textLimit: "256mb",
        formidable: {
          maxFileSize: 200 * 1024 * 1024,
        },
      },
    },
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
