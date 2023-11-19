import { PartialType } from '@nestjs/swagger';
import { CreateLikeCommentDTO } from './create-like-comment.dto';

export class UpdateLikeCommentDto extends PartialType(CreateLikeCommentDTO) {}
