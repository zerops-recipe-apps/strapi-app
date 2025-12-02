export default ({env}) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                s3Options: {
                    credentials: {
                        accessKeyId: env("S3_ACCESS_KEY_ID"),
                        secretAccessKey: env("S3_SECRET_ACCESS_KEY"),
                    },
                    region: 'us-east-1',
                    endpoint: env('S3_ENDPOINT_URL'),
                    forcePathStyle: true,
                    params: {
                        Bucket: env("S3_BUCKET_NAME"),
                    },
                },
            },
        },
    },
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.example.com'),
                port: env.int('SMTP_PORT', 587),
                ignoreTLS: true,
                // TODO(tikinang): More SMTP options.
            },
            settings: {
                defaultFrom: 'hello@example.com',
                defaultReplyTo: 'hello@example.com',
            },
        },
    },
});