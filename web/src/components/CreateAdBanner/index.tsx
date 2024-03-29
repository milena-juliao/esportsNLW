import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function CreateAdBanner(){
    return(
        <div className="bg-nlw-gradient pt-1 mt-8 self-stretch rounded-lg overflow-hidden">
            <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
                <div>
                    <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
                    <span className="text-zinc-700 block">Publique seu anúncio para encontrar novos players!</span>
                </div>
                <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
                    <MagnifyingGlassPlus size={24}/>
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}