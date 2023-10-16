import Button from "../Button";

export default function AddAulaButton({ onClick, ...rest }) {
    return <Button className="px-5 w-48 h-12 text-white flex items-center justify-center rounded-md bg-[#00a1ff]" onClick={onClick}>
        <h3 className="font-bold">Adicionar Aula</h3>
    </Button>
}





