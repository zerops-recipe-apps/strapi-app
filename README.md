- installed via `npx create-strapi@latest strapi-app`
- S3 upload storage added via `npm install @strapi/provider-upload-aws-s3`
- nodemailer added via `npm install @strapi/provider-email-nodemailer`
- migrations done via `migrate.sh` script and `zsc execOnce` - should be removed after migration containers are available

# Remote Development
1. remote development requires to change `src/admin/vite.config.example.ts`
    ```shell
    mv src/admin/vite.config.example.ts src/admin/vite.config.ts
    ```
2. add the `server.allowedHosts`, so the file looks similar to this:
```typescript
import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: true
    },
  });
};
```