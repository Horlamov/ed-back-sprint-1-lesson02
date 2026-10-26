// src/inMemoryDb/inMemoryDb.ts
import { Resolution, Video } from "../videos/types/video";
import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";

type DB = {
  videos: Video[];
  blogs: Blog[];
  posts: Post[];
};

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: "front-end",
      author: "admin",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [Resolution.P144],
    },
    {
      id: 2,
      title: "back-end",
      author: "admin",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [Resolution.P360],
    },
    {
      id: 3,
      title: "Dev-ops",
      author: "admin",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [Resolution.P480],
    },
    {
      id: 4,
      title: "QA-test",
      author: "admin",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [Resolution.P1440],
    },
  ],

  blogs: <Blog[]>[
    {
      id: "1",
      name: "YaBlogName",
      description:
        "Lorem ipsum dolor sit amet voluptate elit corrupti similique quis vero deserunt eos iusto voluptate non.",
      websiteUrl: "yandex.ru",
    },
    {
      id: "2",
      name: "RaBlogName",
      description:
        "Lorem ipsum dolor sit amet voluptate elit corrupti similique quis vero deserunt eos iusto voluptate non.",
      websiteUrl: "rambler.ru",
    },
    {
      id: "3",
      name: "GoBlogName",
      description:
        "Lorem ipsum dolor sit amet voluptate elit corrupti similique quis vero deserunt eos iusto voluptate non.",
      websiteUrl: "google.ru",
    },
  ],

  posts: <Post[]> [
      {
        id: "1",
        title: "oneTwo",
        shortDescription: "string",
        content: "string",
        blogId: "11",
        blogName: "string",
      },
    {
      id: "2",
      title: "twoThree",
      shortDescription: "string",
      content: "string",
      blogId: "11",
      blogName: "string",
    }
    ],
};
