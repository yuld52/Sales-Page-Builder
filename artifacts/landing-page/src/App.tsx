import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  ShieldCheck, Leaf, HeartPulse, Sparkles, Smile, Clock,
  Star, Lock, CreditCard, Truck, Phone, MessageCircle,
  Package, ChevronDown, ChevronUp, MapPin, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

function CountdownTimer() {
  const getEnd = () => {
    const s = localStorage.getItem("flora-end");
    if (s && parseInt(s) > Date.now()) return parseInt(s);
    const e = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("flora-end", String(e));
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
  const msg = encodeURIComponent("Olá! Quero comprar o Flora Íntima.");
  return (
    <a
      href={`https://wa.me/258840000000?text=${msg}`}
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

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toOffer = () => document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow py-3" : "bg-transparent py-4"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between max-w-5xl">
          <div className="font-serif text-xl font-bold text-primary">Flora Íntima</div>
          <Button onClick={toOffer} className="rounded-full text-sm px-5 py-2" data-testid="button-header-cta">
            Ver Preços
          </Button>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-pink-50 to-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

              <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <Star className="w-3.5 h-3.5 fill-primary" /> +5.000 mulheres em Moçambique
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-foreground leading-tight mb-4">
                  Diga Adeus ao <span className="text-primary">Corrimento</span> e Viva com Mais Confiança
                </h1>

                <p className="text-base text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0">
                  Fórmula natural que ajuda a restaurar o equilíbrio da flora íntima — reduzindo corrimento, odor e desconforto.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                  <Button size="lg" onClick={toOffer} className="text-base px-7 py-6 rounded-full shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all" data-testid="button-hero-cta">
                    Quero Cuidar da Minha Saúde Íntima
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-muted-foreground">
                  {[{ I: Leaf, t: "100% Natural" }, { I: ShieldCheck, t: "Garantia 7 Dias" }, { I: Truck, t: "Entrega em Moçambique" }].map(({ I, t }) => (
                    <div key={t} className="flex items-center gap-1.5"><I className="w-4 h-4 text-primary" /><span>{t}</span></div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="flex-1 w-full max-w-xs mx-auto" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 aspect-[4/5] bg-pink-50">
                  <img src="/images/hero-product.png" alt="Flora Íntima" className="w-full h-full object-cover" loading="eager" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">Resultado em</div>
                        <div className="font-bold text-foreground text-sm">Poucos dias de uso</div>
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
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8">Como Comprar — É Fácil!</h2>
            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {[
                { n: "1", I: MessageCircle, t: "Fala Connosco no WhatsApp", d: "Clica no botão verde e manda mensagem." },
                { n: "2", I: Package, t: "Escolhe o Teu Kit", d: "Aceitamos M-Pesa, e-Mola e dinheiro." },
                { n: "3", I: Truck, t: "Recebe em Casa", d: "Entregamos em Maputo, Beira, Nampula e mais." },
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
              <WABtn label="Pedir Agora pelo WhatsApp" className="text-lg px-9 py-4" />
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="py-12 bg-secondary/15">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8">Flora Íntima foi feita para ti</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { I: Sparkles, t: "Reequilibra a flora íntima" },
                { I: ShieldCheck, t: "Reduz o corrimento e odor" },
                { I: Smile, t: "Mais confiança no dia a dia" },
                { I: Leaf, t: "100% Natural e seguro" },
                { I: Clock, t: "1 cápsula por dia — simples" },
                { I: HeartPulse, t: "Bem-estar feminino completo" },
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
                { name: "Fátima M.", city: "Maputo", img: "/images/testimonial-1.png", text: "Sofria com corrimento há meses. Flora Íntima mudou a minha vida em poucas semanas. Sinto-me eu mesma de novo!" },
                { name: "Celeste N.", city: "Beira", img: "/images/testimonial-3.png", text: "Sempre tive muito corrimento e afectava a minha autoestima. Finalmente encontrei uma solução natural que funciona!" },
                { name: "Graça A.", city: "Nampula", img: "/images/testimonial-5.png", text: "A entrega foi rápida e discreta. O produto cumpre o que promete. Sinto-me muito mais confortável durante todo o dia." },
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
                Se em 7 dias não sentires diferença, devolvemos <strong>100% do teu dinheiro</strong>. Sem perguntas. O risco é todo nosso.
              </p>
            </div>
          </div>
        </section>

        {/* OFERTA */}
        <section id="oferta" className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <div className="inline-block bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full text-xs mb-3">Oferta por Tempo Limitado</div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Escolhe o Teu Kit</h2>
              <CountdownTimer />
            </div>

            <div className="grid md:grid-cols-3 gap-5 items-end max-w-3xl mx-auto">

              {/* Kit 1 */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow hover:-translate-y-1 transition-transform">
                <div className="text-center">
                  <div className="font-bold font-serif mb-0.5">Kit Básico</div>
                  <div className="text-xs text-muted-foreground mb-3">1 Frasco — 30 dias</div>
                  <div className="text-muted-foreground line-through text-xs">6.000 MT</div>
                  <div className="text-3xl font-black mb-0.5">3.000 MT</div>
                  <div className="text-xs text-primary font-semibold mb-4">Podes pagar em parcelas</div>
                  <WABtn label="Encomendar" className="w-full py-3 text-sm justify-center" />
                </div>
              </div>

              {/* Kit 3 */}
              <div className="bg-white rounded-2xl border-2 border-primary p-6 shadow-xl relative md:-translate-y-3 hover:md:-translate-y-5 transition-transform z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-black whitespace-nowrap">MAIS POPULAR</div>
                <div className="text-center mt-2">
                  <div className="text-lg font-bold font-serif mb-0.5">Kit Família</div>
                  <div className="text-xs text-muted-foreground mb-3">3 Frascos — 90 dias</div>
                  <div className="text-muted-foreground line-through text-xs">18.000 MT</div>
                  <div className="text-4xl font-black text-primary mb-1">7.500 MT</div>
                  <div className="text-xs bg-primary/10 text-primary py-0.5 px-2 rounded-full inline-block mb-4">Poupa 10.500 MT</div>
                  <WABtn label="Comprar Agora" className="w-full py-3.5 text-base justify-center" />
                </div>
              </div>

              {/* Kit 6 */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow relative hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-black whitespace-nowrap">MELHOR VALOR</div>
                <div className="text-center mt-2">
                  <div className="font-bold font-serif mb-0.5">Kit Anual</div>
                  <div className="text-xs text-muted-foreground mb-3">6 Frascos — 180 dias</div>
                  <div className="text-muted-foreground line-through text-xs">36.000 MT</div>
                  <div className="text-3xl font-black mb-0.5">12.000 MT</div>
                  <div className="text-xs text-primary font-semibold mb-4">Poupa 24.000 MT</div>
                  <WABtn label="Encomendar" className="w-full py-3 text-sm justify-center" />
                </div>
              </div>

            </div>

            {/* Pagamentos */}
            <div className="mt-8 text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Formas de Pagamento</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[{ I: Phone, l: "M-Pesa" }, { I: Phone, l: "e-Mola" }, { I: CreditCard, l: "Cartão" }, { I: Package, l: "Dinheiro" }].map(({ I, l }) => (
                  <div key={l} className="flex items-center gap-1.5 bg-secondary/20 px-3 py-1.5 rounded-full text-xs font-medium border border-secondary/30">
                    <I className="w-3.5 h-3.5 text-primary" />{l}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust seals */}
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              {[{ I: Lock, l: "Compra Segura" }, { I: CreditCard, l: "Pagamento Protegido" }, { I: Truck, l: "Entrega Garantida" }, { I: ShieldCheck, l: "Satisfação Garantida" }].map(({ I, l }) => (
                <div key={l} className="flex items-center gap-1.5"><I className="w-3.5 h-3.5 text-green-600" />{l}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-pink-50/50">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-7">Perguntas Frequentes</h2>
            {[
              { q: "Como devo tomar Flora Íntima?", a: "1 cápsula por dia, de manhã com água." },
              { q: "Em quanto tempo verei resultados?", a: "Muitas mulheres sentem alívio nos primeiros dias. Os melhores resultados aparecem com 30 dias de uso." },
              { q: "Quem pode usar?", a: "Qualquer mulher adulta. Grávidas e a amamentar devem consultar médico primeiro." },
              { q: "Como é a entrega em Moçambique?", a: "Entregamos em Maputo, Beira, Nampula, Quelimane, Tete, Inhambane e outras cidades. Embalagem discreta." },
              { q: "Quais os métodos de pagamento?", a: "M-Pesa, e-Mola, cartão bancário ou dinheiro no levantamento." },
              { q: "Posso devolver se não gostar?", a: "Sim! Tens 7 dias de garantia. Devolvemos o teu dinheiro na íntegra, sem perguntas." },
            ].map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
            <div className="font-serif text-xl font-bold text-primary">Flora Íntima</div>
            <div className="flex gap-5 text-xs opacity-70">
              <a href="#" className="hover:opacity-100">Política de Privacidade</a>
              <a href="#" className="hover:opacity-100">Termos de Uso</a>
              <a href="#" className="hover:opacity-100">Contacto</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 text-center text-xs opacity-50 leading-relaxed max-w-2xl mx-auto">
            Os resultados podem variar. Flora Íntima não substitui orientação médica. Se os sintomas persistirem, procure um médico.
          </div>
          <div className="text-center text-xs opacity-30 mt-3">&copy; {new Date().getFullYear()} Flora Íntima. Todos os direitos reservados.</div>
        </div>
      </footer>

      {/* BOTÃO WHATSAPP FLUTUANTE */}
      <a
        href={`https://wa.me/258840000000?text=${encodeURIComponent("Olá! Quero comprar o Flora Íntima.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-13 h-13 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110"
        data-testid="button-whatsapp-float"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
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
