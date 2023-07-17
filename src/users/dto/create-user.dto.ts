import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uuid: String,
  name: { type: String, require: true },
  email: { type: String, require: true },
  photoURL: String,
  tags: Array<String>,
  favorites: Array<String>,
});

export class CreateUserDto {
  uuid: string;
  name: string;
  email: string;
  photoURL: string;
  tags: [];
  favorites: Array<string>;
}

// {
// 	uuid: string,
// 	name: string,
// 	email: string,
// 	photo: string,
// 	tags: [], // if you want to personalize
// 	favorites: Array<string> // `_id` of `recipes`
// }
