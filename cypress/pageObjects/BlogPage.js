class BlogPage {

    verifyMetaDataForBlogs() {

        cy.get('.blog-post', { timeout: 20000 }).each(($post) => {
            cy.wrap($post).find('.title').should('exist');
            cy.wrap($post).find('.date').should('exist');
            cy.wrap($post).find('.summary').should('exist');
            cy.wrap($post).find('.tags').should('exist');

        })
    }

}

export default BlogPage;