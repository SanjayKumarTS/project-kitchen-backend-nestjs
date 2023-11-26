export class ResponseFindRecipesForUserDTO {
  uuid: string;
  author: Author;
  recipe: Recipe;
  likesCount: Number;
  commentsCount: Number;
  userLiked: boolean;
}

export class Author {
  uuid: string;
  name: string;
  photo: string;
}

export class Recipe {
  name: string;
  description: string;
  photo: string;
  creationTime: string;
}
