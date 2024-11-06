import { IsNumber, IsString,IsNotEmpty, IsInt } from "class-validator";
import { Transform } from "class-transformer";


export class CreatingSchedulingDTO {

    @IsNumber()
    medico_id : number;

    @IsString()
    @IsNotEmpty()
    paciente_nome: string;

    @IsString()
    data_horario: string;
}

