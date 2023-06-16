/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.tsx', //passo todos arquivos onde o tailwind vai estar
        './index.html',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['inter', 'sans-serif']
            },
            backgroundImage: {
                galaxy: "url('./assets/background-galaxy.png')",
                'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 50.94%, #E1D55D 50.57%)',
                'game-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67.08%)',
            }
        },
    },
    plugins: [],
}