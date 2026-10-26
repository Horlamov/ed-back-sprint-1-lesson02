import request from 'supertest';
import express from 'express';
import { setupApp } from '../src/setup-app';
import { HttpStatus } from '../src/core/types/http-status';
import { db } from '../src/db/in-memory.db'; // Импортируем базу, чтобы чистить её

describe('Blogs API', () => {
  const app = express();
  setupApp(app); // Настраиваем наше приложение
  // Перед каждым тестом очищаем базу, чтобы тесты не мешали друг другу
  beforeEach(() => {
    db.blogs = [];
  });

  it('should create new blog; POST /api/blogs', async () => {
    // 1. Подготовка валидных данных
    const blogData = {
      name: 'My First Blog',
      description: 'This is a test blog',
      websiteUrl: 'https://my-test-blog.com',
    };

    // 2. Отправка запроса
    const response = await request(app)
      .post('/api/blogs')
      .send(blogData)
      .expect(HttpStatus.Created_201); // Ждём статус 201

    // 3. Проверка ответа (Response body)
    expect(response.body).toEqual({
      id: expect.any(String), // Ожидаем, что id будет строкой (crypto.randomUUID)
      name: 'My First Blog',
      description: 'This is a test blog',
      websiteUrl: 'https://my-test-blog.com',
    });

    // 4. Проверка, что блог реально попал в базу (опционально, но полезно)
    expect(db.blogs.length).toBe(1);
    expect(db.blogs[0].name).toBe('My First Blog');
  });
});