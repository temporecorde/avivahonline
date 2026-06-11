import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Ticket, PlayCircle, Shield } from "lucide-react";

const QUESTIONS = [
  { id: "nome", label: "Seu Nome Completo", type: "text", placeholder: "Digite seu nome completo" },
  { id: "email", label: "Seu Melhor E-mail", type: "email", placeholder: "Digite seu melhor e-mail" },
  { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", placeholder: "(00) 00000-0000" },
];

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({
    nome: "",
    email: "",
    whatsapp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = formData.nome.trim().length > 0 && 
                      formData.email.trim().length > 0 && 
                      formData.email.includes("@") && 
                      formData.whatsapp.trim().length >= 14;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          whatsapp: formData.whatsapp,
          email: formData.email,
        }),
      });
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { success: false, message: "Erro inesperado no servidor." };
      }

      if (response.ok && data.success) {
        navigate("/obrigado");
      } else {
        alert(data.message || "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
      }
    } catch (err) {
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { name, value } = e.target;

    if (name === "whatsapp") {
      value = value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-[#040404] text-white font-sans overflow-x-hidden selection:bg-brand-gold selection:text-black flex flex-col pt-10">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 transform-gpu">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[120px] mix-blend-screen -mr-64 -mt-64" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] mix-blend-screen -ml-64 -mb-64" />
      </div>

      {/* Background Image */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://i.postimg.cc/JnzPbBMq/aprobson-1.jpg"
          alt="Hero Background"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[center_top] md:object-top opacity-30 md:opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 md:via-black/40 to-[#040404]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black via-black/40 md:via-black/50 to-transparent md:to-[#040404]/80" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 lg:items-center gap-12 lg:gap-20">
          
          {/* Left Column: Copy & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div className="mb-8 lg:mb-10 flex justify-center lg:justify-start">
              <img 
                src="https://avivahglobal.com/wp-content/uploads/2026/03/TITULO.webp" 
                alt="Avivah Global" 
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = "https://i.postimg.cc/mD8zQk4S/avivahglobal-logo.png" }}
              />
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <span className="h-[1px] w-8 md:w-12 bg-brand-gold/50"></span>
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[9px] md:text-[11px] font-bold shrink-0">
                Acesso Exclusivo
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter mb-6">
               ACESSO GRATUITO AO <br />
               <span className="text-brand-gold">AVIVAH ONLINE</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/70 leading-snug font-light mb-8 lg:mb-12">
               Cadastre-se gratuitamente agora e receba acesso à transmissão do <strong className="font-bold text-white">Avivah Online</strong>.
            </p>

            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 text-left">
              <div className="flex items-start gap-4">
                 <div className="bg-brand-gold/10 p-2 border border-brand-gold/20 shrink-0">
                    <PlayCircle className="text-brand-gold w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1">Transmissão</h4>
                    <p className="text-white/50 text-[11px] leading-relaxed">Dias 13 e 14 de junho (sábado e domingo)</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-brand-gold/10 p-2 border border-brand-gold/20 shrink-0">
                    <Shield className="text-brand-gold w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1">Conteúdo Exclusivo</h4>
                    <p className="text-white/50 text-[11px] leading-relaxed">Mensagens, ativações e ensino profundo</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto relative z-20 -mt-8 lg:-mt-4"
          >
            <div className="bg-[#0A0A0A] border border-white/5 p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
              
              <div className="mb-8 text-center sm:text-left">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">
                  Garanta sua <span className="text-brand-gold">Vaga</span>
                </h3>
                <p className="text-white/50 text-sm">
                  Preencha os dados abaixo para criar seu acesso gratuito ao Avivah Online.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="w-full flex flex-col gap-4 text-left">
                  {QUESTIONS.map((question) => (
                    <div key={question.id}>
                      <label className="text-white font-bold mb-2 block text-sm md:text-base">
                        {question.label}
                      </label>
                      <input
                        type={question.type}
                        name={question.id}
                        value={String(formData[question.id as keyof typeof formData] || "")}
                        onChange={handleChange}
                        required
                        placeholder={question.placeholder}
                        className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 focus:border-brand-gold/50 py-3.5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-all font-medium text-base rounded-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="flex-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-white hover:to-white active:scale-[0.98] text-black font-black uppercase tracking-widest text-xs py-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center relative overflow-hidden group shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                  >
                    <span>{isSubmitting ? "Processando..." : "Receber Acesso Livre"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-white/30 text-[10px] font-medium uppercase tracking-widest">
                  <Lock className="w-3 h-3" />
                  <span>Ambiente Seguro</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
