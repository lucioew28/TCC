import { GetPrediction } from "@/types/prediction";
import api from "@/services/api";

export async function getPrediction(args: GetPrediction) {
  const body = {
    cidade: args.city,
    modalida_venda: args.sellingType,
    tipo_imovel: args.propertyType,
    area: args.area,
    numero_quartos: args.numberOfBedrooms,
    numero_salas: args.numberOfLivingRooms,
    numero_vagas_garagem: args.numberOfParkingSpaces,
  };

  const response = await api.post("predict/", body);
  return response;
}
