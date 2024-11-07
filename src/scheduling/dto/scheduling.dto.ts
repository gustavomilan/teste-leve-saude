import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatingSchedulingDTO {
  @IsNumber({}, { message: 'O ID do médico deve ser um número válido.' })
  medico_id: number;

  @IsString({ message: 'O nome do paciente deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do paciente não pode estar vazio.' })
  paciente_nome: string;

  @IsString({ message: 'O horário de agendamento deve ser uma string.' })
  data_horario: string;
}
