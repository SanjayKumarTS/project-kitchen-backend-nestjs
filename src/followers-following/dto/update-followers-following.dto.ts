import { PartialType } from '@nestjs/swagger';
import { CreateFollowersFollowingDto } from './create-followers-following.dto';

export class UpdateFollowersFollowingDto extends PartialType(CreateFollowersFollowingDto) {}
