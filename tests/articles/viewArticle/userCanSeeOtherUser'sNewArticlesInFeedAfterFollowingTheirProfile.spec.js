import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({page, page2, user1, user2, articleWithoutTags}) => {
    await signUpUser(page, user1);
    await signUpUser(page2, user2);
    await createArticle(page, articleWithoutTags);
});

test("User can see other user's new articles in 'Your Feed' after following their profile", async({
    page, 
    page2, 
    articleWithoutTags,
    user1
}) => {
    const homePage2 = new HomePage(page2);
    await homePage2.openGlobalFeed();
    await homePage2.openAuthor(user1.username);
    await homePage2.followAuthor();
    await homePage2.openHomeMainPage();
    await page2.reload();
    await homePage2.assertArticleCreaterByAuthorIsVisible(articleWithoutTags.title);
})