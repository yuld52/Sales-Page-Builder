import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  ShieldCheck, BookOpen, Heart, Sparkles, Smile, Clock,
  Star, Lock, CreditCard, Phone, MessageCircle,
  Package, ChevronDown, ChevronUp, MapPin, CheckCircle2, Check,
} from "lucide-react";

const queryClient = new QueryClient();

const PRODUTO = "Tratamento do CORRIMENTO";
const WA_NUMBER = "258840000000";
const WA_MSG = encodeURIComponent(`Olá! Quero comprar o ${PRODUTO}.`);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const CHECKOUT_LINK = "https://pay.meteorfy.com/checkout/70ab0ea9-e8b2-4a84-9a55-20d7161b62c6";

function CountdownTimer() {
  const getEnd = () => {
    const s = localStorage.getItem("corrimento-end");
    if (s && parseInt(s) > Date.now()) return parseInt(s);
    const e = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("corrimento-end", String(e));
    return e;
  };
  const [end] = useState(getEnd);
  const [ms, setMs] = useState(end - Date.now());
  useEffect(() => {
    const t = setInterval(() => setMs(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(t);
  }, [end]);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return (
    <div className="flex items-center justify-center gap-2 mb-5" data-testid="countdown-timer">
      {[{ v: h, l: "Horas" }, { v: m, l: "Min" }, { v: s, l: "Seg" }].map((x, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-primary text-white px-3 py-2 rounded-lg min-w-[3rem] text-center text-xl font-black shadow">
            {String(x.v).padStart(2, "0")}
          </div>
          <span className="text-xs text-muted-foreground mt-0.5">{x.l}</span>
        </div>
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden mb-2">
      <button
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:bg-secondary/10 transition-colors text-sm"
        onClick={() => setOpen(!open)}
        data-testid={`faq-${q.slice(0, 15)}`}
      >
        <span className="pr-3">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-primary shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-muted-foreground text-sm border-t border-border/30 pt-3 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

function WABtn({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 ${className}`}
      data-testid="button-whatsapp"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      {label}
    </a>
  );
}

function TopBanner() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();
  const dateStr = `${day}/${month}/${year}`;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white text-center text-xs sm:text-sm font-sans py-2 px-4 flex items-center justify-center gap-2">
      <span>
        Oferta Especial Expira em{" "}
        <span className="font-bold"> {dateStr}</span>
      </span>
    </div>
  );
}

function LandingPage() {
  const toOffer = () => document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">

      <TopBanner />

      <main>

        {/* HERO */}
        <section className="pt-16 pb-12 bg-gradient-to-b from-pink-50 to-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

              <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <Star className="w-3.5 h-3.5 fill-primary" /> +5.000 mulheres em Moçambique já acederam
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-foreground leading-tight mb-4">
                  Diga Adeus ao <span className="text-primary">Corrimento</span> e Viva com Mais Confiança
                </h1>

                <p className="text-base text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0">
                  Guia digital completo com métodos naturais e eficazes para tratar o corrimento vaginal — no conforto da tua casa, de forma discreta e segura.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                  <button
                    onClick={toOffer}
                    className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-7 py-4 rounded-full shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
                    data-testid="button-hero-cta"
                  >
                    Quero Tratar o Corrimento Agora
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-muted-foreground">
                  {[
                    { I: BookOpen, t: "Guia Digital Completo" },
                    { I: ShieldCheck, t: "Garantia 7 Dias" },
                    { I: Package, t: "Acesso Imediato" },
                  ].map(({ I, t }) => (
                    <div key={t} className="flex items-center gap-1.5"><I className="w-4 h-4 text-primary" /><span>{t}</span></div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="flex-1 w-full max-w-xs mx-auto" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 aspect-[4/5] bg-pink-50">
                  <img src="/images/hero-product.png" alt={PRODUTO} className="w-full h-full object-cover" loading="eager" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">Acesso</div>
                        <div className="font-bold text-foreground text-sm">Imediato após a compra</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* COMO COMPRAR */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8">Como Acessar — É Fácil!</h2>
            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {[
                { n: "1", I: CreditCard, t: "Clica no Botão de Compra", d: "Clica em 'Comprar Agora' e vai direto ao checkout seguro." },
                { n: "2", I: Lock, t: "Faz o Pagamento", d: "Aceitamos M-Pesa, e-Mola e cartão — rápido e seguro." },
                { n: "3", I: Package, t: "Recebe o Guia Digital", d: "Acesso imediato ao guia completo no telemóvel." },
              ].map((x, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-pink-50 rounded-2xl p-6 text-center border border-primary/10">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-3 shadow">{x.n}</div>
                  <x.I className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-foreground mb-1">{x.t}</h3>
                  <p className="text-muted-foreground text-xs">{x.d}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <a
                href={CHECKOUT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 text-lg px-9 py-4"
                data-testid="button-como-comprar-cta"
              >
                <CreditCard className="w-5 h-5 shrink-0" />
                Comprar Agora
              </a>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="py-12 bg-secondary/15">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8">O que está incluído no guia</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { I: Sparkles, t: "Causas e tipos de corrimento explicados" },
                { I: BookOpen, t: "Métodos naturais de tratamento em casa" },
                { I: Package, t: "Guia em PDF fácil de ler no telemóvel" },
                { I: Heart, t: "Cuidados de higiene íntima diária" },
                { I: Clock, t: "Acesso imediato após o pagamento" },
              ].map(({ I, t }, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white flex items-center gap-3 p-4 rounded-xl border border-primary/10 shadow-sm">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <I className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">{t}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8">O que as nossas clientes dizem</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { name: "Fátima M.", city: "Maputo", img: "/images/testimonial-1.png", text: "Sofria com corrimento há meses e tinha vergonha de falar. Com este guia aprendi a tratar em casa de forma natural. Mudou a minha vida!" },
                { name: "Celeste N.", city: "Beira", img: "/images/testimonial-3.png", text: "Recebi o guia logo após o pagamento. Linguagem simples, fácil de perceber. Em poucos dias já sentia a diferença." },
                { name: "Graça A.", city: "Nampula", img: "/images/testimonial-5.png", text: "Excelente! Nunca pensei que havia soluções naturais tão eficazes. Recomendo a todas as mulheres que passam por isso." },
              ].map((x, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-pink-50/60 p-6 rounded-2xl border border-secondary/30">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={x.img} alt={x.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" loading="lazy" />
                    <div>
                      <div className="font-bold text-sm text-foreground">{x.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {x.city}</div>
                      <div className="flex gap-0.5 mt-0.5">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-primary text-primary" />)}</div>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic text-sm">"{x.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GARANTIA */}
        <section className="py-10 bg-secondary/15">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-primary text-white rounded-3xl p-8 text-center shadow-xl">
              <ShieldCheck className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-2xl font-serif font-bold mb-2">Garantia de 7 Dias</h2>
              <p className="opacity-90 text-sm max-w-sm mx-auto">
                Se não ficares satisfeito, devolvemos <strong>100% do teu dinheiro</strong>. Sem perguntas. O risco é todo nosso.
              </p>
            </div>
          </div>
        </section>

        {/* OFERTA — CARD ÚNICO */}
        <section id="oferta" className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <div className="inline-block bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full text-xs mb-3">Oferta por Tempo Limitado</div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Garante o Teu Acesso Agora</h2>
              <CountdownTimer />
            </div>

            {/* Card único igual à imagem */}
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden"
              >
                <div className="p-7">
                  <h3 className="text-2xl font-black text-foreground mb-1 leading-tight">{PRODUTO}</h3>
                  <p className="text-muted-foreground text-sm mb-5">Guia digital completo para tratar o corrimento vaginal de forma natural e eficaz</p>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Causas e tipos de corrimento explicados",
                      "Métodos naturais de tratamento em casa",
                      "Cuidados de higiene íntima diária",
                      "Guia em PDF fácil de ler no telemóvel",
                      "Acesso imediato após a compra",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                        <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-green-600 stroke-[3]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Caixa de preço */}
                  <div className="bg-green-50 rounded-xl p-5 text-center mb-5">
                    <p className="text-sm text-muted-foreground mb-1">
                      De <span className="line-through">299 MT</span> por apenas
                    </p>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-6xl font-black text-foreground leading-none">99</span>
                      <span className="text-2xl font-bold text-foreground mb-1">MT</span>
                    </div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-widest mt-2">
                      Pagamento Único
                    </p>
                  </div>

                  {/* Botão */}
                  <a
                    href={CHECKOUT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold text-base py-4 rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest"
                    data-testid="button-buy-main"
                  >
                    Quero Acessar Agora
                  </a>
                </div>
              </motion.div>

              {/* Selos */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                {[
                  { I: Lock, l: "Compra Segura" },
                  { I: CreditCard, l: "Pagamento Protegido" },
                  { I: ShieldCheck, l: "Satisfação Garantida" },
                ].map(({ I, l }) => (
                  <div key={l} className="flex items-center gap-1.5"><I className="w-3.5 h-3.5 text-green-600" />{l}</div>
                ))}
              </div>

              {/* Pagamentos */}
              <div className="mt-5 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Formas de Pagamento</p>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <img src="/images/mpesa.webp" alt="M-Pesa" className="h-12 w-12 rounded-lg object-cover shadow-sm" />
                  <img src="/images/emola.webp" alt="e-Mola" className="h-12 w-12 rounded-lg object-cover shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-pink-50/50">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-7">Perguntas Frequentes</h2>
            {[
              { q: "O que recebo após a compra?", a: "Recebes um ficheiro PDF completo com o guia de tratamento do corrimento, enviado directamente pelo WhatsApp." },
              { q: "Quanto tempo demora a receber?", a: "O acesso é imediato — logo após a confirmação do pagamento, enviamos o guia pelo WhatsApp." },
              { q: "Quais os métodos de pagamento?", a: "Aceitamos M-Pesa e e-Mola." },
              { q: "Posso devolver se não gostar?", a: "Sim! Tens 7 dias de garantia. Devolvemos o teu dinheiro na íntegra, sem perguntas." },
            ].map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
            <div className="font-serif text-lg font-bold text-primary">Tratamento do CORRIMENTO</div>
            <div className="flex gap-5 text-xs opacity-70">
              <a href="#" className="hover:opacity-100">Política de Privacidade</a>
              <a href="#" className="hover:opacity-100">Termos de Uso</a>
              <a href="#" className="hover:opacity-100">Contacto</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 text-center text-xs opacity-50 leading-relaxed max-w-2xl mx-auto">
            Os resultados podem variar. Este guia é de carácter educativo e não substitui a orientação de um profissional de saúde. Se os sintomas persistirem ou piorarem, procure um médico.
          </div>
          <div className="text-center text-xs opacity-30 mt-3">&copy; {new Date().getFullYear()} Tratamento do CORRIMENTO. Todos os direitos reservados.</div>
        </div>
      </footer>

    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LandingPage />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
