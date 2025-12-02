module.exports = {
    async up() {
        console.log("Running the example migration.")
        /*
        await strapi.db.transaction(async () => {
            await strapi.entityService.create('api::article.article', {
                data: {
                    title: 'My First Article',
                    slug: 'my-first-article'
                },
            });
        });
         */
    },
};