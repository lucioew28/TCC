import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  prediction: number | undefined;
}

export function Modal({ open, setOpen, prediction }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img src="logo.svg" className="w-6 h-6" alt="logo" />
            Avaliação do Imóvel
          </DialogTitle>
          <DialogDescription>
            Utilizamos as informações fornecidas para calcular uma estimativa do
            valor do seu imóvel. Confira o resultado abaixo:
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 text-2xl font-semibold text-gray-800">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(prediction ? prediction : 0)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
