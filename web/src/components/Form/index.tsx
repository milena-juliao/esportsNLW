import { InputHTMLAttributes } from 'react';//chama todos os atributos que usamos na tag input

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {} //recebemos os atributs como props

export default function Input(props: InputProps) {
    return (
        <input
            {...props} //para não ter que ficar declarando todos os atributos usamos o ...props para dizer que queremos todos
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
    )
}