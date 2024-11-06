import { Transform } from "class-transformer";
import { 

    IsInt,
    IsOptional} 
    from "class-validator";

export class ScheduleDTO {

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    id?: number;
}