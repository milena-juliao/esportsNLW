import './styles/main.css';
import GamesBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/Form/CreateAdModal';

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
            <img src="../logo-nlw-esports.png" />
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
                <CreateAdModal />               
            </Dialog.Root>
        </div>
    )
}

export default App
