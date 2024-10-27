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
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { getPrediction } from "@/services/prediction";

const formSchema = z.object({
  city: z.string({ required_error: "Esse campo é obrigatório." }),
  sellingType: z.string({ required_error: "Esse campo é obrigatório." }),
  propertyType: z.string({ required_error: "Esse campo é obrigatório." }),
  totalArea: z.string({ required_error: "Esse campo é obrigatório." }),
  numberOfBedrooms: z.string({ required_error: "Esse campo é obrigatório." }),
  numberOfLivingRooms: z.string({
    required_error: "Esse campo é obrigatório.",
  }),
  numberOfParkingSpaces: z.string({
    required_error: "Esse campo é obrigatório.",
  }),
});

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);

    try {
      const response = await getPrediction();
      console.log("response", response);
    } catch (error) {
      console.log("error", error);

      return error;
    }

    setLoading(false);
  }

  console.log("loading", loading);

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center pt-24 px-6">
      <div className="max-w-[600px] w-full flex flex-col gap-4">
        <div>
          <div className="flex w-fit items-center gap-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65.41621522645691"
              height="65.41621522645691"
              viewBox="0 0 100 100"
            >
              <defs id="SvgjsDefs1978"></defs>
              <g
                id="SvgjsG1979"
                transform="matrix(2.380952380952381,0,0,2.380952380952381,2.740832032232547e-10,0)"
                fill="#000000"
              >
                <g
                  xmlns="http://www.w3.org/2000/svg"
                  transform="translate(0,-1010.3622)"
                >
                  <path
                    d="M 21 0 C 9.407957 0 1.7999997e-005 9.408 0 21 C -3.8000003e-005 32.5921 9.407918 42 21 42 C 32.592083 42 42.000039 32.5921 42 21 C 41.999982 9.408 32.592043 0 21 0 z M 21 1 C 32.051422 1 40.999983 9.9486 41 21 C 41.000037 32.0515 32.05146 41 21 41 C 9.948541 41 1.0019171 32.0515 1.0019531 21 C 1.0019711 9.9486 9.948579 1 21 1 z M 24.841797 5 C 21.517926 5 18.816417 7.5905656 18.564453 10.884766 C 16.560871 11.038966 14.667778 12.111416 13.589844 13.978516 C 12.281687 16.244316 12.580097 18.960228 14.074219 20.923828 L 13.316406 22.228516 C 13.250406 22.335716 13.227719 22.468897 13.255859 22.591797 L 13.498047 23.441406 L 12.650391 23.683594 C 12.405026 23.740594 12.231385 24.015619 12.285156 24.261719 L 12.529297 25.140625 L 11.679688 25.353516 C 11.421511 25.409516 11.242435 25.704784 11.314453 25.958984 L 11.558594 26.808594 L 10.708984 27.021484 C 10.474588 27.091484 10.318997 27.359556 10.375 27.597656 L 10.587891 28.476562 L 9.7382812 28.71875 C 9.6096785 28.75375 9.4975674 28.844991 9.4355469 28.962891 L 8.9492188 29.78125 C 8.8657487 29.91565 8.8548929 30.092028 8.9199219 30.236328 L 9.890625 32.449219 C 9.966331 32.638619 10.171565 32.768606 10.375 32.753906 L 12.800781 32.449219 C 12.951027 32.431219 13.091475 32.338631 13.166016 32.207031 L 18.261719 23.351562 C 19.146603 23.463463 20.029972 23.385972 20.869141 23.138672 C 20.043852 21.982672 19.535156 20.573669 19.535156 19.042969 C 19.535156 16.265369 21.116806 13.839481 23.417969 12.613281 C 23.056426 12.264581 22.659507 11.936228 22.205078 11.673828 C 21.452 11.239028 20.651243 10.985166 19.837891 10.884766 C 19.726274 10.870766 19.614845 10.894766 19.503906 10.884766 C 19.749562 8.1177656 22.040308 5.9707031 24.84375 5.9707031 C 27.812192 5.9707031 30.210937 8.3706937 30.210938 11.371094 C 30.210938 12.111794 30.05897 12.842141 29.787109 13.494141 C 29.715289 13.665441 29.632954 13.816116 29.544922 13.978516 C 29.448832 14.155816 29.325661 14.329041 29.210938 14.494141 C 29.190558 14.523141 29.170781 14.556938 29.150391 14.585938 C 29.053331 14.719337 28.956652 14.856369 28.847656 14.980469 C 28.819506 15.012469 28.784979 15.039313 28.755859 15.070312 C 28.658799 15.176113 28.558337 15.275147 28.453125 15.373047 C 28.409445 15.414047 28.377644 15.454841 28.332031 15.494141 C 28.092975 15.703041 27.817839 15.876216 27.542969 16.041016 C 27.366225 15.818216 27.125429 15.677734 26.814453 15.677734 C 26.272672 15.677734 25.814453 16.106637 25.814453 16.648438 C 25.814453 17.017237 26.023275 17.331594 26.330078 17.496094 L 26.359375 17.587891 C 26.381695 17.577891 26.398562 17.564594 26.419922 17.558594 L 26.449219 17.558594 C 26.561031 17.600594 26.689248 17.617188 26.814453 17.617188 C 27.189973 17.617188 27.471016 17.408262 27.632812 17.101562 C 28.012991 16.911562 28.363845 16.694147 28.693359 16.435547 C 28.703059 16.509547 28.724609 16.570384 28.724609 16.646484 C 28.724609 17.712784 27.878884 18.587891 26.8125 18.587891 C 25.746214 18.587891 24.873047 17.712784 24.873047 16.646484 C 24.873047 15.580184 25.746214 14.707031 26.8125 14.707031 C 27.07912 14.707031 27.34311 14.758822 27.572266 14.857422 C 28.155297 14.391822 28.61886 13.780456 28.90625 13.097656 C 28.250522 12.866156 27.546458 12.734375 26.8125 12.734375 C 23.334015 12.734375 20.503906 15.564369 20.503906 19.042969 C 20.503906 21.663369 22.105258 23.885037 24.386719 24.835938 L 24.386719 26.322266 C 24.386719 26.443366 24.427249 26.56535 24.507812 26.65625 L 25.115234 27.263672 L 24.507812 27.900391 C 24.321459 28.080791 24.32146 28.417256 24.507812 28.597656 L 25.115234 29.205078 L 24.507812 29.841797 C 24.321459 30.022297 24.32146 30.358663 24.507812 30.539062 L 25.144531 31.175781 L 24.539062 31.751953 C 24.344558 31.924153 24.328644 32.260819 24.507812 32.449219 L 25.146484 33.085938 L 24.507812 33.722656 C 24.420462 33.820656 24.375654 33.956791 24.386719 34.087891 L 24.386719 35.058594 C 24.377019 35.208594 24.451404 35.359325 24.568359 35.453125 L 26.509766 36.908203 C 26.675348 37.030303 26.920452 37.030303 27.085938 36.908203 L 29.027344 35.453125 C 29.155558 35.366125 29.238002 35.213694 29.240234 35.058594 L 29.240234 24.806641 C 31.503739 23.847741 33.123047 21.650369 33.123047 19.042969 C 33.123047 16.988769 32.100563 15.189963 30.574219 14.039062 C 30.942168 13.223562 31.150391 12.310541 31.150391 11.369141 C 31.150391 7.8412406 28.332026 5 24.841797 5 z M 19.898438 11.703125 C 20.668308 11.718125 21.382662 11.862556 21.960938 12.097656 C 22.309185 12.298656 22.642212 12.538122 22.931641 12.794922 C 20.376183 11.972322 16.952174 12.720359 15.560547 15.130859 C 14.168823 17.541359 14.696382 19.322631 15.076172 20.894531 C 15.258642 21.649731 15.171292 21.719125 15.076172 22.015625 C 14.935146 22.457125 14.721532 22.662078 14.681641 23.017578 C 14.635051 23.428578 15.031387 23.970519 14.863281 24.261719 C 14.695176 24.552919 13.917867 24.356844 13.710938 24.714844 C 13.504105 25.073044 14.128915 25.520287 13.892578 25.929688 C 13.65624 26.338888 12.947163 26.026866 12.740234 26.384766 C 12.533402 26.743066 13.175101 27.196353 12.921875 27.626953 C 12.668746 28.054553 12.008971 27.705134 11.800781 28.052734 C 11.584437 28.414634 12.174407 28.908322 11.951172 29.294922 C 11.728034 29.681822 10.798828 29.75 10.798828 29.75 L 10.314453 30.599609 L 10.677734 31.570312 L 10.404297 32.025391 L 9.6757812 30.265625 L 10.162109 29.417969 L 11.466797 29.052734 C 11.466797 29.052734 10.894242 28.11755 11.132812 27.71875 C 11.364104 27.33245 12.4375 27.384766 12.4375 27.384766 C 12.4375 27.384766 11.874749 26.446981 12.103516 26.050781 C 12.332283 25.654781 13.408203 25.716797 13.408203 25.716797 C 13.408203 25.716797 12.845451 24.779012 13.074219 24.382812 C 13.302986 23.986813 14.378906 24.017578 14.378906 24.017578 L 14.044922 22.683594 C 13.969212 22.399394 15.032525 21.888928 14.621094 20.923828 C 13.949059 19.346928 13.231929 16.661144 14.5 14.464844 C 15.50514 12.723944 17.347275 11.891275 19.109375 11.734375 C 19.373762 11.711375 19.641911 11.699078 19.898438 11.705078 L 19.898438 11.703125 z M 27.419922 13.220703 C 27.822036 13.220703 28.224405 13.264497 28.603516 13.341797 C 24.477746 13.341797 22.71875 16.259569 22.71875 19.042969 C 22.71875 21.826269 24.201035 23.360616 25.8125 24.291016 C 26.01215 25.036016 25.575079 25.661019 26.238281 26.324219 C 26.238281 26.324219 26.996094 26.956769 26.996094 27.292969 C 26.996094 27.629169 26.238281 28.263672 26.238281 28.263672 C 26.238281 28.263672 26.996094 28.761775 26.996094 29.234375 C 26.996094 29.707075 26.238281 30.205078 26.238281 30.205078 C 26.238281 30.205078 26.999977 30.676281 26.996094 31.175781 C 26.996094 31.675281 26.238281 32.117188 26.238281 32.117188 C 26.238281 32.117188 26.996094 32.670787 26.996094 33.117188 C 26.996094 33.563588 26.238281 34.087891 26.238281 34.087891 C 25.735323 34.562291 25.944387 34.823194 26.238281 35.058594 L 27.025391 35.726562 L 27.511719 36.332031 C 27.511719 36.332031 25.750377 35.549894 25.478516 35.058594 C 25.206654 34.567194 25.329045 34.448691 25.478516 34.087891 C 25.627986 33.726991 26.449219 33.117188 26.449219 33.117188 C 26.449219 33.117188 25.478516 32.423888 25.478516 32.117188 C 25.478516 31.810487 26.449219 31.175781 26.449219 31.175781 C 26.449219 31.175781 25.478516 30.419978 25.478516 30.205078 C 25.478516 29.990178 26.449219 29.234375 26.449219 29.234375 C 26.449219 29.234375 25.478516 28.533072 25.478516 28.263672 C 25.478516 27.994172 26.449219 27.292969 26.449219 27.292969 L 25.478516 26.324219 L 25.478516 24.533203 C 23.215981 23.734103 21.597656 21.579069 21.597656 19.042969 C 21.597656 15.826669 24.203689 13.220703 27.419922 13.220703 z "
                    transform="translate(0,1010.3622)"
                    display="inline"
                    overflow="visible"
                    visibility="visible"
                    fill="#000000"
                    fill-opacity="1"
                    stroke="none"
                  ></path>
                </g>
              </g>
              {/* <g
                id="SvgjsG1980"
                transform="matrix(2.0012808490590355,0,0,2.0012808490590355,120.0800530661897,-1.535063242991093)"
                fill="#000000"
              >
                <path d="M31.48 40 l-9.6 0 l-1.24 -3.96 l-9.84 0 l-1.24 3.96 l-9.6 0 l10.8 -28.24 l10.16 0 z M18.8 29.759999999999998 l-3 -9.96 l-3.08 9.96 l6.08 0 z M54.120000000000005 19.28 l-6.88 20.72 l-8.76 0 l-6.92 -20.72 l8.72 0 l2.52 12.8 l2.68 -12.8 l8.64 0 z M77.36 40 l-8.12 0 l0 -1.6 c-0.32 0.24 -0.72 0.56 -1.52 0.96 c-0.88 0.44 -2.76 1.12 -5.36 1.12 c-0.52 0 -1.92 0 -3.32 -0.52 c-2.68 -1.04 -4.12 -3.36 -4.12 -6.16 c0 -1.12 0.24 -3.6 2.84 -5.36 c1.72 -1.16 3.92 -1.44 5.92 -1.72 c1.16 -0.16 2.4 -0.32 3.56 -0.56 c0.52 -0.12 1.08 -0.24 1.6 -0.4 c0 -0.08 0 -0.64 -0.12 -0.96 c-0.24 -0.84 -0.84 -1.44 -2.68 -1.44 c-0.6 0 -1 0.08 -1.2 0.12 c-1.28 0.32 -1.4 1.4 -1.52 1.84 l-7.72 0.2 c0.08 -0.44 0.2 -0.84 0.28 -1.24 c0.2 -0.8 0.64 -2.24 2.28 -3.52 s4.16 -2.16 8.64 -2.16 c3.24 0 7.64 0.52 9.24 3.88 c0.44 0.92 0.6 1.76 0.6 3.68 l0 11.28 c0 1.52 0.2 1.84 0.72 2.56 z M68.8 30.36 c-1.04 0.36 -2.08 0.68 -3.12 0.96 c-0.88 0.2 -2.12 0.48 -2.76 1.28 c-0.08 0.12 -0.36 0.48 -0.36 0.96 c0 0.64 0.52 1.6 2.04 1.6 c0.72 0 1.36 -0.24 2 -0.56 c2.32 -1.24 2.2 -3.28 2.2 -4.24 z M88.24 40 l-8.28 0 l0 -28.24 l8.28 0 l0 28.24 z M99.92 17.24 l-8.24 0 l0 -5.48 l8.24 0 l0 5.48 z M99.92 40 l-8.24 0 l0 -20.72 l8.24 0 l0 20.72 z M124.88000000000001 40 l-8.12 0 l0 -1.6 c-0.32 0.24 -0.72 0.56 -1.52 0.96 c-0.88 0.44 -2.76 1.12 -5.36 1.12 c-0.52 0 -1.92 0 -3.32 -0.52 c-2.68 -1.04 -4.12 -3.36 -4.12 -6.16 c0 -1.12 0.24 -3.6 2.84 -5.36 c1.72 -1.16 3.92 -1.44 5.92 -1.72 c1.16 -0.16 2.4 -0.32 3.56 -0.56 c0.52 -0.12 1.08 -0.24 1.6 -0.4 c0 -0.08 0 -0.64 -0.12 -0.96 c-0.24 -0.84 -0.84 -1.44 -2.68 -1.44 c-0.6 0 -1 0.08 -1.2 0.12 c-1.28 0.32 -1.4 1.4 -1.52 1.84 l-7.72 0.2 c0.08 -0.44 0.2 -0.84 0.28 -1.24 c0.2 -0.8 0.64 -2.24 2.28 -3.52 s4.16 -2.16 8.64 -2.16 c3.24 0 7.64 0.52 9.24 3.88 c0.44 0.92 0.6 1.76 0.6 3.68 l0 11.28 c0 1.52 0.2 1.84 0.72 2.56 z M116.32000000000001 30.36 c-1.04 0.36 -2.08 0.68 -3.12 0.96 c-0.88 0.2 -2.12 0.48 -2.76 1.28 c-0.08 0.12 -0.36 0.48 -0.36 0.96 c0 0.64 0.52 1.6 2.04 1.6 c0.72 0 1.36 -0.24 2 -0.56 c2.32 -1.24 2.2 -3.28 2.2 -4.24 z"></path>
              </g> */}
            </svg>
            <h1 className="font-bold text-6xl">
              Aval<span className="text-blue-500 text-[62px]">ia</span>
            </h1>
            <Sparkles className="w-6 h-6 absolute -top-4 -right-6 text-blue-700" />
            <Sparkles className="w-3 h-3 absolute top-2 -right-1 text-blue-500" />
            <Sparkles className="w-4 h-4 absolute top-4 -right-5 text-blue-400" />
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
              <CardContent className="grid grid-cols-2 gap-4">
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
                          {cityList.map((city, idx) => (
                            <SelectItem key={city + idx} value={city}>
                              {city}
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
                          {sellingTypeList.map((sellingType, idx) => (
                            <SelectItem
                              key={sellingType + idx}
                              value={sellingType}
                            >
                              {sellingType}
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
                          {propertyTypeList.map((propertyType, idx) => (
                            <SelectItem
                              key={propertyType + idx}
                              value={propertyType}
                            >
                              {propertyType}
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
                >
                  <p>Avaliar imóvel</p>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}

export default App;
