import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
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
  Plus,
  Minus,
  Star,
  Lock,
  CreditCard,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const queryClient = new QueryClient();

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary mb-6" data-testid="countdown-timer">
      <div className="bg-primary/10 text-primary px-3 py-2 rounded-md min-w-[3rem] text-center">
        {String(timeLeft.hours).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-primary/10 text-primary px-3 py-2 rounded-md min-w-[3rem] text-center">
        {String(timeLeft.minutes).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-primary/10 text-primary px-3 py-2 rounded-md min-w-[3rem] text-center">
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
}

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOffer = () => {
    document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {/* 1. Header/Nav */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold text-primary tracking-tight">Flora Íntima</div>
          <Button 
            onClick={scrollToOffer} 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 transition-transform hover:scale-105"
            data-testid="button-header-cta"
          >
            Garantir Meu Desconto
          </Button>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
                  Diga Adeus ao Corrimento e Recupere Sua Confiança Íntima
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Uma fórmula natural e segura que ajuda a restaurar o equilíbrio da flora vaginal, reduzindo corrimento, coceira e odores incômodos para que você volte a se sentir livre e confiante.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                  <Button 
                    size="lg" 
                    onClick={scrollToOffer}
                    className="w-full sm:w-auto text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                    data-testid="button-hero-cta"
                  >
                    Quero Cuidar da Minha Saúde Íntima
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    <span>Fórmula Natural</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span>Sem Efeitos Colaterais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-primary" />
                    <span>Garantia de 7 Dias</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex-1 w-full max-w-lg mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-secondary/20">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10"></div>
                  <img 
                    src="/images/hero-product.png" 
                    alt="Flora Íntima Suplemento Natural" 
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Social Proof Bar */}
        <section className="bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary/20">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 text-sm sm:text-base font-medium">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 opacity-80" />
                <span>Mais de 15.000 mulheres atendidas</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 opacity-80 fill-current" />
                <span>98% de satisfação</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 opacity-80" />
                <span>Entrega em todo o Brasil</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Problems Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                Você se identifica com algum desses sintomas?
              </h2>
              <p className="text-lg text-muted-foreground">
                Sabemos o quanto isso pode ser desconfortável e frustrante. Você não está sozinha.
              </p>
            </div>
            
            <div className="grid gap-4 sm:gap-6">
              {[
                { icon: Droplets, text: "Corrimento recorrente que causa insegurança" },
                { icon: AlertCircle, text: "Odor íntimo incômodo que afeta sua rotina" },
                { icon: Activity, text: "Coceira e irritação frequentes" },
                { icon: Frown, text: "Desconforto íntimo durante as atividades do dia a dia" },
                { icon: XCircle, text: "Baixa autoestima por causa dos sintomas" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center p-4 sm:p-6 bg-secondary/10 rounded-xl border border-secondary/20 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mr-4 sm:mr-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-foreground">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Benefits Section */}
        <section className="py-20 lg:py-28 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                Flora Íntima foi desenvolvida para você
              </h2>
              <p className="text-lg text-muted-foreground">
                Nossa fórmula foi pensada com carinho para devolver seu bem-estar de forma gentil e eficaz.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {[
                { icon: Sparkles, title: "Auxilia no equilíbrio", desc: "Ajuda a restaurar e manter a flora íntima saudável." },
                { icon: Shield, title: "Reduz desconfortos", desc: "Acalma irritações e diminui sintomas incômodos." },
                { icon: Smile, title: "Bem-estar feminino", desc: "Devolve sua confiança e tranquilidade diária." },
                { icon: Leaf, title: "Fórmula 100% natural", desc: "Livre de compostos químicos agressivos e seguro para o corpo." },
                { icon: Clock, title: "Fácil de usar no dia a dia", desc: "Apenas uma cápsula por dia para cuidar de você." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 ${index === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}`}
                >
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-serif mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How It Works Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-16">
              Como Flora Íntima age no seu organismo
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2 z-0"></div>
              
              {[
                { step: "1", title: "Os probióticos alcançam a flora íntima", icon: HeartPulse },
                { step: "2", title: "Restauram o equilíbrio natural do pH", icon: Activity },
                { step: "3", title: "Você sente os resultados em poucos dias", icon: Smile }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-primary/20 flex items-center justify-center shadow-lg mb-6 relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground max-w-[200px]">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Ingredients Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                Ingredientes Selecionados com Ciência e Cuidado
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Lactobacillus rhamnosus", desc: "Reequilibra a flora vaginal" },
                { name: "Lactobacillus reuteri", desc: "Reduz inflamações e desconforto" },
                { name: "Cranberry Extrato", desc: "Protege contra infecções recorrentes" },
                { name: "Ácido Fólico", desc: "Essencial para a saúde feminina" },
                { name: "Zinco", desc: "Fortalece o sistema imunológico" },
                { name: "Vitamina D", desc: "Apoia o equilíbrio hormonal" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold font-serif mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Testimonials Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-16">
              O que nossas clientes dizem
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Juliana M.",
                  city: "São Paulo, SP",
                  img: "/images/testimonial-1.png",
                  text: "Eu sofria com desconforto há meses e já não sabia o que fazer. Flora Íntima mudou minha rotina em poucas semanas. Me sinto eu mesma de novo!"
                },
                {
                  name: "Camila R.",
                  city: "Rio de Janeiro, RJ",
                  img: "/images/testimonial-2.png",
                  text: "O melhor investimento que fiz na minha saúde. Acabou o constrangimento e o odor que tanto me incomodava. Super recomendo para todas as mulheres."
                },
                {
                  name: "Fernanda S.",
                  city: "Belo Horizonte, MG",
                  img: "/images/testimonial-3.png",
                  text: "Sempre tive muito corrimento e isso afetava minha autoestima. Depois de tentar várias coisas, finalmente encontrei uma solução natural que funciona."
                },
                {
                  name: "Patrícia A.",
                  city: "Fortaleza, CE",
                  img: "/images/testimonial-4.png",
                  text: "Comecei a tomar sem muita esperança, mas o alívio da coceira foi quase imediato. É libertador não ter mais que se preocupar com isso o tempo todo."
                },
                {
                  name: "Renata O.",
                  city: "Porto Alegre, RS",
                  img: "/images/testimonial-5.png",
                  text: "A entrega foi rápida e discreta. O produto cumpre o que promete, me sinto muito mais limpa e confortável durante todo o dia."
                },
                {
                  name: "Daniela C.",
                  city: "Salvador, BA",
                  img: "/images/testimonial-6.png",
                  text: "Minha médica tinha comentado sobre probióticos e resolvi testar. Melhor decisão! Voltei a usar as roupas que eu gosto sem medo."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-secondary/10 p-8 rounded-2xl border border-secondary/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={item.img} 
                      alt={`Foto de ${item.name}`} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.city}</div>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic">"{item.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Before & After Section */}
        <section className="py-20 bg-secondary/30 border-y border-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-12">
              A Transformação que Nossas Clientes Viveram
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  before: "Corrimento constante e odor incômodo",
                  after: "Equilíbrio restaurado e confiança de volta" 
                },
                { 
                  before: "Insegurança na intimidade por causa do desconforto",
                  after: "Liberdade e bem-estar em todos os momentos" 
                }
              ].map((item, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="bg-muted/50 p-6 flex-1 flex flex-col justify-center items-center text-center border-b">
                      <Frown className="w-8 h-8 text-muted-foreground mb-3 opacity-50" />
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Antes</div>
                      <p className="text-foreground">{item.before}</p>
                    </div>
                    <div className="bg-primary/5 p-6 flex-1 flex flex-col justify-center items-center text-center relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <Smile className="w-8 h-8 text-primary mb-3" />
                      <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Depois</div>
                      <p className="text-foreground font-medium">{item.after}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Guarantee Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
              
              <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-90 relative z-10" />
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 relative z-10">
                Garantia Incondicional de 7 Dias
              </h2>
              <p className="text-lg sm:text-xl opacity-90 max-w-xl mx-auto relative z-10">
                Se em 7 dias você não sentir diferença, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. O risco é todo nosso.
              </p>
            </div>
          </div>
        </section>

        {/* 11. FAQ Section */}
        <section className="py-20 lg:py-28 bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-12">
              Perguntas Frequentes
            </h2>
            
            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-border/50 p-2">
              {[
                { q: "Como devo tomar Flora Íntima?", a: "Recomendamos a ingestão de 1 cápsula ao dia, preferencialmente pela manhã, acompanhada de água." },
                { q: "Em quanto tempo verei resultados?", a: "Muitas mulheres relatam alívio nos primeiros dias, mas os melhores resultados são observados com o uso contínuo por pelo menos 30 dias para a restauração completa da flora." },
                { q: "Quem pode usar Flora Íntima?", a: "Mulheres adultas que buscam equilibrar a saúde íntima de forma natural." },
                { q: "Tem contraindicações?", a: "Por ser um produto natural, não possui contraindicações conhecidas. No entanto, gestantes, lactantes e pessoas com doenças graves devem consultar um médico antes de iniciar o uso." },
                { q: "É seguro tomar durante a amamentação?", a: "Recomendamos que consulte seu médico antes de iniciar o uso durante a amamentação." },
                { q: "Posso tomar junto com outros medicamentos?", a: "Geralmente sim, mas se você faz uso de antibióticos, recomendamos um intervalo de 2 horas entre o medicamento e a cápsula de Flora Íntima." },
                { q: "Flora Íntima é aprovado pela Anvisa?", a: "Sim, nossos ingredientes são liberados e o produto é fabricado seguindo rigorosos padrões de qualidade exigidos pelos órgãos reguladores." },
                { q: "Como é feita a entrega?", a: "A entrega é feita via transportadora parceira em uma embalagem totalmente discreta, sem logotipos ou indicações do conteúdo por fora." },
                { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos cartão de crédito em até 12x, Pix e boleto bancário." },
                { q: "Posso devolver se não gostar?", a: "Sim! Você está protegida pela nossa garantia de 7 dias. Se não estiver satisfeita, basta entrar em contato com nosso suporte." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-0">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-secondary/10 rounded-lg transition-colors text-left font-medium text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 12. Offer / Pricing Section */}
        <section id="offer" className="py-20 lg:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
                Aproveite a Oferta por Tempo Limitado
              </h2>
              <CountdownTimer />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
              {/* Kit 1 */}
              <div className="bg-white rounded-3xl border border-border p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                <div className="text-center mb-6">
                  <div className="text-xl font-bold font-serif mb-2">1 Frasco</div>
                  <div className="text-sm text-muted-foreground mb-4">Tratamento para 30 dias</div>
                  <div className="text-muted-foreground line-through text-sm">De R$ 197,00</div>
                  <div className="text-4xl font-bold text-foreground mt-1 mb-2">R$ 97</div>
                  <div className="text-sm text-primary font-medium">ou em até 12x no cartão</div>
                </div>
                <Button className="w-full py-6 text-lg rounded-full" variant="outline" data-testid="button-buy-kit-1">
                  Comprar Kit 1
                </Button>
              </div>

              {/* Kit 3 (Mais Popular) */}
              <div className="bg-white rounded-3xl border-2 border-primary p-8 shadow-2xl relative transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">
                  MAIS POPULAR
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="text-2xl font-bold font-serif mb-2">3 Frascos</div>
                  <div className="text-sm text-muted-foreground mb-4">Tratamento para 90 dias</div>
                  <div className="text-muted-foreground line-through text-sm">De R$ 591,00</div>
                  <div className="text-5xl font-bold text-primary mt-1 mb-2">R$ 247</div>
                  <div className="text-sm font-medium bg-primary/10 text-primary py-1 px-3 rounded-full inline-block mb-2">
                    Apenas R$ 82 por frasco
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Em até 12x sem juros</div>
                </div>
                <Button className="w-full py-7 text-xl rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30 animate-pulse" data-testid="button-buy-kit-3">
                  Comprar Agora
                </Button>
              </div>

              {/* Kit 6 */}
              <div className="bg-white rounded-3xl border border-border p-8 shadow-lg relative hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wider">
                  MELHOR VALOR
                </div>
                <div className="text-center mb-6 mt-2">
                  <div className="text-xl font-bold font-serif mb-2">6 Frascos</div>
                  <div className="text-sm text-muted-foreground mb-4">Tratamento para 180 dias</div>
                  <div className="text-muted-foreground line-through text-sm">De R$ 1.182,00</div>
                  <div className="text-4xl font-bold text-foreground mt-1 mb-2">R$ 397</div>
                  <div className="text-sm text-primary font-medium">ou em até 12x no cartão</div>
                </div>
                <Button className="w-full py-6 text-lg rounded-full" variant="outline" data-testid="button-buy-kit-6">
                  Comprar Kit 6
                </Button>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span>Compra Segura SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-green-600" />
                <span>Pagamento Protegido</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Entrega Garantida</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Satisfação Garantida</span>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Final CTA Section */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8">
              Sua saúde íntima merece cuidado de verdade
            </h2>
            <Button 
              size="lg"
              onClick={scrollToOffer}
              className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-7 rounded-full shadow-xl transition-transform hover:-translate-y-1"
              data-testid="button-final-cta"
            >
              Quero Cuidar da Minha Saúde Íntima
            </Button>
          </div>
        </section>
      </main>

      {/* 14. Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div className="font-serif text-2xl font-bold">Flora Íntima</div>
            <div className="flex gap-6 text-sm opacity-80">
              <a href="#" className="hover:text-primary hover:opacity-100 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-primary hover:opacity-100 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-primary hover:opacity-100 transition-colors">Contato</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-xs opacity-60 leading-relaxed max-w-4xl mx-auto mb-6">
            Os resultados podem variar de pessoa para pessoa. Flora Íntima não substitui a orientação de um profissional de saúde. Se os sintomas persistirem ou piorarem, procure um médico. As informações deste site não têm intenção de diagnosticar, tratar, curar ou prevenir qualquer doença.
          </div>
          
          <div className="text-center text-xs opacity-50">
            &copy; {new Date().getFullYear()} Flora Íntima. Todos os direitos reservados.
          </div>
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
