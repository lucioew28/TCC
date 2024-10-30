import { cityList, propertyTypeList, sellingTypeList } from "@/data";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { getPrediction } from "@/services/prediction";
import { GetPrediction } from "@/types/prediction";
import { Modal } from "@/components/modal";

const formSchema = z.object({
  city: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  sellingType: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  propertyType: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  totalArea: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  numberOfBedrooms: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  numberOfLivingRooms: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  numberOfParkingSpaces: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
});

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    console.log(values);

    try {
      const body: GetPrediction = {
        city: Number(values.city),
        numberOfBedrooms: Number(values.numberOfBedrooms),
        numberOfLivingRooms: Number(values.numberOfLivingRooms),
        numberOfParkingSpaces: Number(values.numberOfParkingSpaces),
        propertyType: Number(values.propertyType),
        sellingType: Number(values.sellingType),
        area: Number(values.totalArea),
      };
      const response = await getPrediction(body);
      const predictionData = response.data.prediction.prediction;

      setOpen(true);
      setPrediction(predictionData);
    } catch (error) {
      console.log("error", error);

      return error;
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center pt-11 pb-8 px-6">
      <div className="max-w-[600px] w-full flex flex-col gap-4">
        <div>
          <div className="flex w-fit items-center gap-4 relative">
            <img src="logo.svg" className="md:w-16 md:h-16 w-12 h-12" alt="" />
            <h1 className="font-bold md:text-6xl text-4xl">
              Aval
              <span className="text-blue-500 md:text-[62px] text-[36px]">
                ia
              </span>
            </h1>
            <Sparkles className="md:w-6 md:h-6 w-4 h-4 absolute -top-4 -right-6 text-blue-700" />
            <Sparkles className="md:w-3 md:h-3 w-2 h-2 absolute top-2 -right-1 text-blue-500" />
            <Sparkles className="md:w-4 md:h-4 w-2 h-2 absolute top-4 -right-5 text-blue-400" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Avalie seu imóvel de forma rápida e precisa!</CardTitle>
            <CardDescription>
              Forneça algumas informações básicas sobre o seu imóvel e receba
              uma estimativa confiável de seu valor de mercado
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a cidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cityList.map((city) => (
                            <SelectItem
                              key={city.value}
                              value={city.value.toString()}
                            >
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modalidade de venda*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a modalidade de venda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sellingTypeList.map((sellingType) => (
                            <SelectItem
                              key={sellingType.value}
                              value={sellingType.value.toString()}
                            >
                              {sellingType.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo do imóvel*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo do imóvel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypeList.map((propertyType) => (
                            <SelectItem
                              key={propertyType.value}
                              value={propertyType.value.toString()}
                            >
                              {propertyType.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area total*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfBedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de quartos*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfLivingRooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de salas*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfParkingSpaces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de vagas na garagem*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="flex items-center gap-2 w-[146px]"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : undefined}
                  <p>Avaliar imóvel</p>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Modal open={open} setOpen={setOpen} prediction={prediction} />
      </div>
    </main>
  );
}

export default App;
