import InputRegister from '@/components/utilities/input-register';
import Textarea from '@/components/utilities/textarea';

export default function RegisterClient() {
  return (
    <form className="w-full flex flex-col justify-center gap-8 my-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputRegister
            type="text"
            label="Nome completo"
            placeholder="Digite o nome completo"
          />
          <InputRegister type="text" label="CPF" placeholder="000.000.000-00" />

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <div className="flex gap-2">
                <input type="checkbox" />
                <label htmlFor="">Móvel</label>

                <input type="checkbox" />
                <label htmlFor="">Fixo</label>
              </div>

              <InputRegister
                type="tel"
                label="Telefone"
                placeholder=" "
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </div>
          </div>
          <InputRegister
            type="date"
            label="Data de nascimento"
            placeholder="dd/MM/yyyy"
          />

          <div className="flex flex-col">
            <label htmlFor="">Gênero</label>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label htmlFor="">Masculino</label>

              <input type="checkbox" />
              <label htmlFor="">Feminino</label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <InputRegister
            type="text"
            label="Bairro"
            placeholder="Digite o nome do bairro"
          />

          <InputRegister
            type="text"
            label="Rua"
            placeholder="Digite o nome da rua"
          />

          <div className="grid md:grid-cols-2 md:gap-6">
            <InputRegister
              type="text"
              label="Logradouro"
              placeholder="Digite o logradouro"
            />
            <InputRegister
              type="number"
              label="Número"
              placeholder="Digite o número"
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputRegister type="text" label="CEP" placeholder="00000-000" />
            <InputRegister
              type="text"
              label="Cidade"
              placeholder="Digite a cidade"
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <InputRegister
              type="text"
              label="Estado"
              placeholder="Digite o estado"
            />
            <InputRegister
              type="text"
              label="País"
              placeholder="Digite o país"
            />
          </div>

          <div>
            <Textarea
              label="Observações"
              placeholder="Digite sua observação (opcional)"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center border-transparent"
        >
          Adicionar cliente
        </button>

        <button
          type="button"
          className="text-blue-700 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 border-[1px] border-blue-700 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center"
        >
          Limpar campos
        </button>
      </div>
    </form>
  );
}
