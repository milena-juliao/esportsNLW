import './styles/main.css';
import GamesBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import Input from './components/Form';

interface Game {
    id: string;
    title: string,
    bannerUrl: string,
    _count: {
        ads: number;
    }
}

function App() {

    const [games, setGames] = useState<Game[]>([]);//sempre que alteramos o seu estado ele renderiza o componente novamente. Dependendo da finalidade precisamos do useEffect para impedir isso, pois podem ocorrer erros.
    //<Game[]> significa que tipamos o que está vindo dentro da variável games.

    useEffect(() => {
        fetch('http://localhost:3333/games')
            .then(response => response.json())
            .then(data => {
                setGames(data)
            })
    }, [])//recebe dois parâmetros: primeiro a função onde coloco o que preciso para estipular quando será executado, em segundo coloco quando a lógica será executada (dentro dos []).

    return (
        <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
            <img src="../public/logo-nlw-esports.png" />
            <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui.</h1>

            <div className="grid grid-cols-6 gap-6 mt-6">
                {games.map(g => {
                    return (
                        <GamesBanner key={g.id} bannerUrl={g.bannerUrl} title={g.title} adsCount={g._count.ads} />
                    )
                })}

            </div>

            <Dialog.Root>
                <CreateAdBanner />
                <Dialog.Portal> {/* Faz com que o modal fique por cima de tudo */}
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed"> {/* Fundo transparente */}
                        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[484px] shadow-lg shadow-black/25">
                            <Dialog.Title className="text-3xl font-black">
                                Publique um anúncio
                            </Dialog.Title>
                            <form className="mt-8 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="game" className="font-semibold">Qual o game?</label>
                                    <Input className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" id="game" type="text" placeholder="Selecione o game que deseja jogar" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Seu nome (ou nickname)</label>
                                    <Input id="name" type="text" placeholder="Digite seu nome" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                        <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="discord">Qual o seu Discord?</label>
                                        <Input id="discord" type="text" placeholder="Usuário#0000" />
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="weekDays">Quando costuma jogar?</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            <button title="Domingo" className="w-8 h-8 rounded bg-zinc-900">D</button>
                                            <button title="Segunda" className="w-8 h-8 rounded bg-zinc-900">S</button>
                                            <button title="Terça" className="w-8 h-8 rounded bg-zinc-900">T</button>
                                            <button title="Quarta" className="w-8 h-8 rounded bg-zinc-900">Q</button>
                                            <button title="Quinta" className="w-8 h-8 rounded bg-zinc-900">Q</button>
                                            <button title="Sexta" className="w-8 h-8 rounded bg-zinc-900">S</button>
                                            <button title="Sábado" className="w-8 h-8 rounded bg-zinc-900">S</button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="hourStart">Qual horário do dia?</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input id="hourStart" type="time" placeholder="De" />
                                            <Input id="hourEnd" type="time" placeholder="Até" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 flex gap-2 text-sm">
                                    <Input type="checkbox" />
                                    Costumo me conectar ao chat de voz
                                </div>

                                <footer className="mt-4 flex justify-end gap-4">
                                    <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                                    <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                                        <GameController className="w-6 h-6"/>
                                        Encontrar Duo
                                    </button>
                                </footer>

                            </form>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default App