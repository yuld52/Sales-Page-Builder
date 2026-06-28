import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Leaf,
  HeartPulse,
  Activity,
  Droplets,
  AlertCircle,
  XCircle,
  Frown,
  CheckCircle2,
  Sparkles,
  Smile,
  Shield,
  Clock,
  ArrowRight,
  Star,
  Lock,
  CreditCard,
  Truck,
  Phone,
  MessageCircle,
  Package,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const queryClient = new QueryClient();

function CountdownTimer() {
  const getInitialTime = () => {
    const stored = localStorage.getItem("flora-countdown-end");
    if (stored) {
      const diff = parseInt(stored) - Date.now();
      if (diff > 0) return diff;
    }
    const end = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("flora-countdown-end", String(end));
    return end - Date.now();
  };

  const [msLeft, setMsLeft] = useState(getInitialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsLeft(prev => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(msLeft / 3600000);
  const m = Math.floor((msLeft % 3600000) / 60000);
  const s = Math.floor((msLeft % 60000) / 1000);

  return (
    <div className="flex items-center justify-center gap-3 text-2xl font-bold text-primary mb-6" data-testid="countdown-timer">
      {[
        { val: h, label: "Horas" },
        { val: m, label: "Min" },
        { val: s, label: "Seg" },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-primary text-white px-4 py-3 rounded-xl min-w-[3.5rem] text-center text-2xl font-black shadow-md">
            {String(item.val).padStart(2, "0")}
          </div>
          <span className="text-xs text-muted-foreground mt-1 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden mb-3">
      <button
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-secondary/10 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`faq-toggle-${q.slice(0, 20)}`}
      >
        <span className="pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-primary shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-border/40 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

function WhatsAppButton({ label, className }: { label: string; className?: string }) {
  const msg = encodeURIComponent("Olá! Quero comprar o Flora Íntima. Como faço?");
  return (
    <a
      href={`https://wa.me/258840000000?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1 active:scale-95 ${className}`}
      data-testid="button-whatsapp"
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </a>
  );
}

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOffer = () => {
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold text-primary">Flora Íntima</div>
          <Button
            onClick={scrollToOffer}
            className="rounded-full text-sm px-5 py-2 shadow"
            data-testid="button-header-cta"
          >
            Ver Preços
          </Button>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

              <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Trust pill */}
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                  <Star className="w-4 h-4 fill-primary" />
                  Mais de 5.000 mulheres em Moçambique
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-foreground leading-tight mb-5">
                  Diga Adeus ao<br />
                  <span className="text-primary">Corrimento</span> e Viva com Mais Confiança
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Flora Íntima é um suplemento natural que ajuda a restaurar o equilíbrio da flora feminina — reduzindo corrimento, odor e desconforto íntimo.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button
                    size="lg"
                    onClick={scrollToOffer}
                    className="text-lg px-8 py-7 rounded-full shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all"
                    data-testid="button-hero-cta"
                  >
                    Quero Cuidar da Minha Saúde Íntima
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm font-medium text-muted-foreground">
                  {[
                    { icon: Leaf, text: "100% Natural" },
                    { icon: ShieldCheck, text: "Garantia 7 Dias" },
                    { icon: Truck, text: "Entrega em Moçambique" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex-1 w-full max-w-sm mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 aspect-[4/5] bg-pink-50">
                  <img
                    src="/images/hero-product.png"
                    alt="Flora Íntima Suplemento Natural"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
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

        {/* ── SOCIAL PROOF BAR ── */}
        <section className="bg-primary py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-sm sm:text-base font-semibold text-white">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 opacity-90" />
                <span>+5.000 mulheres satisfeitas</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 opacity-90 fill-white" />
                <span>98% de satisfação</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 opacity-90" />
                <span>Entrega em todo Moçambique</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMO COMPRAR (super simples) ── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">
                Como Comprar — É Fácil!
              </h2>
              <p className="text-muted-foreground text-lg">Em apenas 3 passos simples</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", icon: MessageCircle, title: "Fale Connosco no WhatsApp", desc: "Clica no botão verde e manda mensagem. Estamos sempre disponíveis." },
                { step: "2", icon: Package, title: "Escolhe o Seu Kit", desc: "Diz quantos frascos queres. Aceitamos M-Pesa, e-Mola e dinheiro." },
                { step: "3", icon: Truck, title: "Recebe em Casa", desc: "Entregamos na tua porta em Maputo, Beira, Nampula e mais cidades." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-pink-50 rounded-2xl p-7 text-center border border-primary/10"
                >
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-md">
                    {item.step}
                  </div>
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <WhatsAppButton label="Pedir Agora pelo WhatsApp" className="text-xl px-10 py-5 text-lg" />
            </div>
          </div>
        </section>

        {/* ── PROBLEMAS (empático) ── */}
        <section className="py-16 lg:py-20 bg-secondary/15">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                Reconheces algum destes sintomas?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Não estás sozinha. Muitas mulheres passam por isso em silêncio.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Droplets, text: "Corrimento frequente e incómodo" },
                { icon: AlertCircle, text: "Odor íntimo que te incomoda" },
                { icon: Activity, text: "Comichão e irritação constante" },
                { icon: Frown, text: "Desconforto nas actividades do dia a dia" },
                { icon: XCircle, text: "Vergonha ou baixa autoestima" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-4 bg-white p-5 rounded-xl border border-secondary/30 shadow-sm ${i === 4 ? "sm:col-span-2 sm:max-w-sm sm:mx-auto" : ""}`}
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFÍCIOS ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                Flora Íntima foi feita para ti
              </h2>
              <p className="text-lg text-muted-foreground">Uma fórmula natural com ingredientes seleccionados.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Sparkles, title: "Reequilibra a flora íntima", desc: "Ajuda a restaurar o ambiente natural e saudável." },
                { icon: Shield, title: "Reduz o corrimento", desc: "Menos desconforto e mais segurança no dia a dia." },
                { icon: Smile, title: "Elimina o odor incómodo", desc: "Sente-te fresca e confiante novamente." },
                { icon: Leaf, title: "100% Natural", desc: "Sem químicos agressivos. Seguro para o teu corpo." },
                { icon: Clock, title: "Fácil de usar", desc: "Apenas 1 cápsula por dia. Simples assim." },
                { icon: HeartPulse, title: "Bem-estar feminino", desc: "Cuida de ti de dentro para fora." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-pink-50/60 p-6 rounded-2xl border border-primary/10 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/15 text-primary rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-12">
              Como Flora Íntima age no teu corpo
            </h2>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-primary/20 z-0" />
              {[
                { step: "1", icon: HeartPulse, title: "Os probióticos chegam à flora íntima" },
                { step: "2", icon: Activity, title: "Restauram o equilíbrio natural do pH" },
                { step: "3", icon: Smile, title: "Sentes os resultados em poucos dias" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-primary/20 flex items-center justify-center shadow-lg mb-5 relative">
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm">
                      {item.step}
                    </div>
                    <item.icon className="w-9 h-9 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground max-w-[180px]">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INGREDIENTES ── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-10">
              Ingredientes com Ciência e Cuidado
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { name: "Lactobacillus rhamnosus", desc: "Reequilibra a flora vaginal naturalmente" },
                { name: "Lactobacillus reuteri", desc: "Reduz inflamações e desconforto íntimo" },
                { name: "Cranberry Extrato", desc: "Protege contra infecções recorrentes" },
                { name: "Ácido Fólico", desc: "Essencial para a saúde feminina" },
                { name: "Zinco", desc: "Fortalece as defesas do organismo" },
                { name: "Vitamina D", desc: "Apoia o equilíbrio hormonal feminino" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors bg-pink-50/40">
                    <CardContent className="p-5">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-foreground mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPOIMENTOS ── */}
        <section className="py-16 lg:py-20 bg-secondary/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-10">
              O que as nossas clientes dizem
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Fátima M.",
                  city: "Maputo",
                  img: "/images/testimonial-1.png",
                  text: "Sofria com corrimento há meses e já não sabia o que fazer. Flora Íntima mudou a minha vida em poucas semanas. Sinto-me eu mesma de novo!",
                },
                {
                  name: "Celeste N.",
                  city: "Beira",
                  img: "/images/testimonial-2.png",
                  text: "O melhor investimento que fiz na minha saúde. Acabou o constrangimento e o odor que tanto me incomodava. Recomendo a todas as mulheres.",
                },
                {
                  name: "Graça A.",
                  city: "Nampula",
                  img: "/images/testimonial-3.png",
                  text: "Sempre tive muito corrimento e isso afectava a minha autoestima. Depois de experimentar Flora Íntima encontrei finalmente uma solução natural.",
                },
                {
                  name: "Lurdes T.",
                  city: "Quelimane",
                  img: "/images/testimonial-4.png",
                  text: "Comecei a tomar sem muita esperança, mas o alívio da comichão foi quase imediato. É libertador não me preocupar mais com isso.",
                },
                {
                  name: "Conceição B.",
                  city: "Tete",
                  img: "/images/testimonial-5.png",
                  text: "A entrega foi rápida e discreta. O produto cumpre o que promete. Sinto-me muito mais confortável durante todo o dia.",
                },
                {
                  name: "Helena R.",
                  city: "Inhambane",
                  img: "/images/testimonial-6.png",
                  text: "A minha médica falou sobre probióticos e resolvi experimentar. Melhor decisão! Voltei a usar as roupas que gosto sem medo.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white p-7 rounded-2xl border border-secondary/30 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.img}
                      alt={`Foto de ${item.name}`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.city}, Moçambique
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-primary text-primary" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic text-sm leading-relaxed">"{item.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ANTES E DEPOIS ── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-10">
              A Transformação que Viveste
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { before: "Corrimento constante e odor incómodo", after: "Equilíbrio restaurado e confiança de volta" },
                { before: "Insegurança por causa do desconforto", after: "Liberdade e bem-estar em todos os momentos" },
              ].map((item, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-md">
                  <CardContent className="p-0">
                    <div className="bg-muted/40 p-6 flex flex-col items-center text-center border-b">
                      <Frown className="w-7 h-7 text-muted-foreground mb-2 opacity-60" />
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Antes</div>
                      <p className="text-foreground text-sm">{item.before}</p>
                    </div>
                    <div className="bg-primary/5 p-6 flex flex-col items-center text-center relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <Smile className="w-7 h-7 text-primary mb-2 mt-1" />
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Depois</div>
                      <p className="text-foreground font-semibold text-sm">{item.after}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── GARANTIA ── */}
        <section className="py-14 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-primary text-white rounded-3xl p-10 sm:p-14 text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none" />
              <ShieldCheck className="w-16 h-16 mx-auto mb-5 relative z-10" />
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3 relative z-10">
                Garantia de 7 Dias
              </h2>
              <p className="text-lg opacity-90 max-w-md mx-auto relative z-10">
                Se em 7 dias não sentires diferença, devolvemos <strong>100% do teu dinheiro</strong>. Sem perguntas, sem complicações. O risco é todo nosso.
              </p>
            </div>
          </div>
        </section>

        {/* ── PAGAMENTOS ACEITES ── */}
        <section className="py-10 bg-white border-y border-border/40">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">Formas de Pagamento Aceites</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Phone, label: "M-Pesa" },
                { icon: Phone, label: "e-Mola" },
                { icon: CreditCard, label: "Cartão" },
                { icon: Package, label: "Dinheiro (levantamento)" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full text-sm font-medium text-foreground border border-secondary/30">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 lg:py-20 bg-pink-50/50">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-10">
              Perguntas Frequentes
            </h2>

            <div>
              {[
                { q: "Como devo tomar Flora Íntima?", a: "Toma 1 cápsula por dia, de manhã com um copo de água. É simples e rápido." },
                { q: "Em quanto tempo verei resultados?", a: "Muitas mulheres sentem alívio nos primeiros dias. Os melhores resultados aparecem com 30 dias de uso contínuo." },
                { q: "Quem pode usar Flora Íntima?", a: "Qualquer mulher adulta que queira melhorar a sua saúde íntima de forma natural." },
                { q: "Tem contraindicações?", a: "É um produto natural sem contraindicações conhecidas. Grávidas ou mulheres a amamentar devem consultar um médico primeiro." },
                { q: "Posso tomar com outros medicamentos?", a: "Sim. Se tomares antibióticos, aguarda 2 horas entre o medicamento e a cápsula de Flora Íntima." },
                { q: "Como é feita a entrega em Moçambique?", a: "Entregamos via transportadora em Maputo, Beira, Nampula, Quelimane, Tete, Inhambane e outras cidades. A embalagem é discreta." },
                { q: "Quais são os métodos de pagamento?", a: "Aceitamos M-Pesa, e-Mola, cartão bancário e pagamento em dinheiro no levantamento." },
                { q: "Posso devolver se não gostar?", a: "Sim! Tens 7 dias de garantia total. Se não ficares satisfeita, devolvemos o teu dinheiro na íntegra." },
                { q: "O produto é aprovado?", a: "Sim. Os ingredientes são certificados e o produto é fabricado com rigorosos padrões de qualidade." },
                { q: "É seguro encomendar online?", a: "Sim! O processo é simples: basta enviar mensagem no WhatsApp e nós tratamos de tudo. Pagamento só após confirmação da entrega." },
              ].map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── OFERTA / PREÇOS ── */}
        <section id="oferta" className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="text-center mb-10">
              <div className="inline-block bg-red-100 text-red-600 font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                Oferta por Tempo Limitado
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-black text-foreground mb-4">
                Escolhe o Teu Kit
              </h2>
              <CountdownTimer />
              <p className="text-muted-foreground">Esta promoção termina quando o contador chegar a zero!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">

              {/* Kit 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-border p-7 shadow-md hover:-translate-y-1 transition-transform"
              >
                <div className="text-center mb-6">
                  <div className="text-xl font-bold font-serif mb-1">Kit Básico</div>
                  <div className="text-sm text-muted-foreground mb-4">1 Frasco — 30 dias</div>
                  <div className="text-muted-foreground line-through text-sm">6.000 MT</div>
                  <div className="text-4xl font-black text-foreground mt-1 mb-1">3.000 MT</div>
                  <div className="text-sm text-primary font-semibold">Podes pagar em parcelas</div>
                </div>
                <Button
                  className="w-full py-5 text-base rounded-full"
                  variant="outline"
                  onClick={scrollToOffer}
                  data-testid="button-buy-kit-1"
                >
                  Encomendar Kit 1
                </Button>
              </motion.div>

              {/* Kit 3 — Mais Popular */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border-2 border-primary p-7 shadow-2xl relative md:-translate-y-4 hover:md:-translate-y-6 transition-transform z-10"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-5 py-1.5 rounded-full text-sm font-black tracking-wide whitespace-nowrap">
                  MAIS POPULAR
                </div>
                <div className="text-center mb-6 mt-3">
                  <div className="text-2xl font-bold font-serif mb-1">Kit Família</div>
                  <div className="text-sm text-muted-foreground mb-4">3 Frascos — 90 dias</div>
                  <div className="text-muted-foreground line-through text-sm">18.000 MT</div>
                  <div className="text-5xl font-black text-primary mt-1 mb-2">7.500 MT</div>
                  <div className="text-sm font-semibold bg-primary/10 text-primary py-1 px-3 rounded-full inline-block mb-2">
                    Poupa 10.500 MT
                  </div>
                </div>
                <WhatsAppButton label="Comprar Agora" className="w-full py-5 text-lg" />
              </motion.div>

              {/* Kit 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-border p-7 shadow-md relative hover:-translate-y-1 transition-transform"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-black tracking-wide whitespace-nowrap">
                  MELHOR VALOR
                </div>
                <div className="text-center mb-6 mt-3">
                  <div className="text-xl font-bold font-serif mb-1">Kit Anual</div>
                  <div className="text-sm text-muted-foreground mb-4">6 Frascos — 180 dias</div>
                  <div className="text-muted-foreground line-through text-sm">36.000 MT</div>
                  <div className="text-4xl font-black text-foreground mt-1 mb-1">12.000 MT</div>
                  <div className="text-sm text-primary font-semibold">Poupa 24.000 MT</div>
                </div>
                <Button
                  className="w-full py-5 text-base rounded-full"
                  variant="outline"
                  onClick={scrollToOffer}
                  data-testid="button-buy-kit-6"
                >
                  Encomendar Kit 6
                </Button>
              </motion.div>
            </div>

            {/* Trust seals */}
            <div className="mt-10 flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
              {[
                { icon: Lock, label: "Compra Segura" },
                { icon: CreditCard, label: "Pagamento Protegido" },
                { icon: Truck, label: "Entrega Garantida" },
                { icon: ShieldCheck, label: "Satisfação Garantida" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-green-600" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
              A tua saúde íntima merece cuidado de verdade
            </h2>
            <p className="text-lg opacity-90 mb-8">É fácil, seguro e discreto. Nós cuidamos de tudo.</p>
            <WhatsAppButton label="Quero Cuidar da Minha Saúde Íntima" className="text-xl px-10 py-5" />
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-7 gap-5">
            <div className="font-serif text-2xl font-bold text-primary">Flora Íntima</div>
            <div className="flex flex-wrap gap-6 text-sm opacity-80">
              <a href="#" className="hover:opacity-100 transition-opacity">Política de Privacidade</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Contacto</a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 text-center text-xs opacity-55 leading-relaxed max-w-3xl mx-auto mb-5">
            Os resultados podem variar de pessoa para pessoa. Flora Íntima não substitui a orientação de um profissional de saúde. Se os sintomas persistirem ou piorarem, procure um médico. As informações deste site não têm intenção de diagnosticar, tratar, curar ou prevenir qualquer doença.
          </div>

          <div className="text-center text-xs opacity-40">
            &copy; {new Date().getFullYear()} Flora Íntima. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={`https://wa.me/258840000000?text=${encodeURIComponent("Olá! Quero comprar o Flora Íntima.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl shadow-green-600/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        data-testid="button-whatsapp-float"
        title="Fale Connosco no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
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
