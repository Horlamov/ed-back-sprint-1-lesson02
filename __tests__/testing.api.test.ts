import request from 'supertest';
import express from 'express';
import { setupApp } from '../src/setup-app';
import { HttpStatus } from '../src/core/types/http-status';

describe('Testing API', () => {
    const app = express();
    setupApp(app);

    // Очищаем базу перед каждым тестом, чтобы он начинался с чистого листа
    beforeEach(async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(HttpStatus.NoContent_204);
    });

    it('should clear all data from database; DELETE /api/testing/all-data', async () => {
        // 1. Создаем блог
        const createBlogRes = await request(app)
            .post('/blogs')
            .send({
                name: 'Test Blog',
                description: 'Test Description',
                websiteUrl: 'https://test.com',
            })
            .expect(HttpStatus.Created_201);

        const blogId = createBlogRes.body.id;

        // 2. Создаем пост
        await request(app)
            .post('/posts')
            .send({
                title: 'Test Post',
                shortDescription: 'Short',
                content: 'Content',
                blogId: blogId,
            })
            .expect(HttpStatus.Created_201);

        // 3. Проверяем, что данные записались (ровно по 1 элементу)
        const blogsBeforeClear = await request(app).get('/blogs');
        expect(blogsBeforeClear.body.length).toBe(1);

        const postsBeforeClear = await request(app).get('/posts');
        expect(postsBeforeClear.body.length).toBe(1);

        // 4. ВЫЗЫВАЕМ ОЧИСТКУ БАЗЫ
        await request(app)
            .delete('/testing/all-data')
            .expect(HttpStatus.NoContent_204);

        // 5. Проверяем, что блоги удалены
        const blogsAfterClear = await request(app)
            .get('/blogs')
            .expect(HttpStatus.Ok_200);
        expect(blogsAfterClear.body).toEqual([]);

        // 6. Проверяем, что посты удалены
        const postsAfterClear = await request(app)
            .get('/posts')
            .expect(HttpStatus.Ok_200);
        expect(postsAfterClear.body).toEqual([]);
    });
});