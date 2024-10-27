// import { GetPrediction } from "@/types/prediction";
import api from "@/services/api";

// export async function getPrediction(args: GetPrediction) {
export async function getPrediction() {
  // const body = {
  //   cidade: args.city,
  //   modalida_venda: args.sellingType,
  //   tipo_imovel: args.propertyType,
  //   area_total: args.totalArea,
  //   numero_quartos: args.numberOfBedrooms,
  //   numero_salas: args.numberOfLivingRooms,
  //   numero_vagas_garagem: args.numberOfParkingSpaces,
  // };

  const mockedBody = {
    cidade: 2,
    modalida_venda: 0,
    tipo_imovel: 1,
    area_total: 0.0,
    area_privativa: 96.0,
    area_terreno: 199.0,
    numero_quartos: 2,
    numero_salas: 1,
    numero_vagas_garagem: 1,
  };

  const response = await api.post("predict/", mockedBody);
  return response;
}
