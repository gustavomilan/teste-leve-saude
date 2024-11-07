import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ScheduleDTO {
  // Define id como um campo opcional, aplicando a validação para número inteiro
  @IsInt({ message: 'O ID deve ser um número inteiro.' })
  @IsOptional()
  // Transforma o valor em número ao mapear para a classe, garantindo que a conversão seja feita corretamente
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  id?: number;
}
