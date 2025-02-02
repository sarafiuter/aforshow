// import Atropos library
import Atropos from 'atropos'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../hooks/useUser.js'
import type { Ticket, Ticket as TicketType } from '../types/types'
import { findDatabase, getTicket } from '../utils/ticket.js'

const tickerDefault: TicketType = {
    num_ticket: '00000',
    name: '',
    username_github: 'afor_digital',
    avatar_url: '/avatar.png',
}
const urlRedirect =
    import.meta.env.URL_REDIRECT ||
    'https://tubular-marzipan-aaf90d.netlify.app/'

export default function Ticket({}) {
    const [FoundedTicket, setFoundedTicket] = useState(false)
    const { user, Logued, signIn } = useUser()

    const ticketEl = useRef(null)
    const tickeSvgtEl = useRef(null)
    const [ticket, setTicket] = useState<TicketType>(tickerDefault)
    useEffect(() => {
        // Initialize
        const myAtropos = Atropos({
            el: '#userTicket',
            activeOffset: 150,
            shadowScale: 1,
            highlight: false,
        })
        const params = new URLSearchParams(
            window.location.search.replace('?', '')
        )
        if (
            params.get('username') != undefined &&
            params.get('username') != ''
        ) {
            findDatabase({
                name: '',
                email: '',
                avatar: '',
                userName: params.get('username'),
            })
                .then((res) => res.data)
                .then((userInfo) => {
                    if (userInfo.username_github == params.get('username')) {
                        setTicket(userInfo as Ticket)
                        setFoundedTicket(true)
                    }
                })
        }
    }, [])

    const onClick = async () => {
        signIn()
    }
    const createTweet = () => {}

    useEffect(() => {
        try {
            if (Logued) {
                getTicket(user)
                    .then((data) => {
                        setTicket(data)
                    })
                    .catch((err) => {
                        alert(err)
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }, [Logued])

    return (
        <section className="max-w-[862px] m-auto my-8 relative">
            <meta
                property="og:title"
                content={`Aforshow -  Evento de programacion de charlas y talleres para la comunidad`}
            />
            <meta
                property="og:description"
                content={`Ticket para la Aforshow`}
            />
            <meta property="og:image" content={`${urlRedirect}/svg_name.svg`} />
            <meta property="og:url" content={`${urlRedirect}`} />
            <meta
                property="twitter:title"
                content={`Aforshow -  Evento de programacion de charlas y talleres para la comunidad`}
            />
            <meta
                property="twitter:description"
                content={`Ticket para la Aforshow`}
            />
            <meta property="twitter:image" content={`/svg_name.svg`} />
            <meta property="twitter:url" content={`/`} />
            <h2 className="font-extrabold text-4xl text-gradient text-center mb-24">
                {' '}
                Ticket
            </h2>
            {!Logued && !FoundedTicket && (
                <button
                    ref={ticketEl}
                    className="font-extrabold text-4xl border-4 border-black p-4 bg-orange-400 hover:text-white hover:border-orange-400 hover:bg-black transition-all rounded-full absolute top-[55%] left-[30%] z-[200]"
                    type="button"
                    onClick={onClick}
                >
                    Genera tu ticket
                </button>
            )}
            <div
                className={`atropos reltive ${
                    !Logued && !FoundedTicket && 'blur-sm'
                }`}
                id="userTicket"
                ref={tickeSvgtEl}
            >
                <div className="atropos-scale">
                    <div className="atropos-rotate">
                        <div className="atropos-inner relative">
                            <img src="/ticket.svg"></img>
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-2xl text-neutral-200 w-[520px] ">
                                <header data-atropos-offset="2">
                                    <img
                                        src={'/stars_logo.svg'}
                                        alt="Stars"
                                        className="m-auto w-32"
                                    />
                                    <img
                                        src={'/svg_name.svg'}
                                        alt="Event name"
                                        className="m-auto w-64 pt-8"
                                    />
                                </header>
                                <div
                                    data-atropos-offset="4"
                                    className=" h-[17px] justify-start items-center gap-4 inline-flex py-12"
                                >
                                    <div>
                                        <span className=" font-bold text-gradient">
                                            21
                                        </span>
                                        <span className="font-bold">
                                            {' '}
                                            de Julio
                                        </span>
                                    </div>
                                    <div className="w-4 h-4 gradient rounded-full" />
                                    <div className="text-neutral-600  font-normal">
                                        Twitch.tv/afor_digital
                                    </div>
                                </div>
                                <footer
                                    data-atropos-offset="10"
                                    className="flex justify-between items-center "
                                >
                                    <div className="text-center">
                                        <h4> Ticket N°</h4>
                                        <span className="font-bold text-gradient">
                                            #{ticket.num_ticket}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <h4>{ticket.name}</h4>
                                        <span className="font-bold text-gradient">
                                            @{ticket.username_github}
                                        </span>
                                    </div>
                                </footer>
                            </div>
                            <div className="absolute top-12 right-12">
                                <picture
                                    data-atropos-offset="6"
                                    className="rounded-full w-[72px] overflow-hidden p-1 gradient inline-block"
                                >
                                    <img
                                        src={ticket.avatar_url}
                                        alt={`Imagen de ${ticket.name}`}
                                        className="w-full rounded-full "
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-auto text-center my-4">
                {Logued && (
                    <button
                        type="button"
                        onClick={createTweet}
                        rel="noopener noreferrer"
                        className="p-4 text-white text-2xl bg-blue-600 font-extrabold rounded-full border-4 hover:border-blue-600 hover:text-black hover:bg-white transition-all"
                    >
                        Comparte tu ticket por Twitter
                    </button>
                )}
            </div>
        </section>
    )
}
