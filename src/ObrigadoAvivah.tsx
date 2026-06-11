import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, MessageCircle, AlertCircle, Copy, Heart, ArrowRight, X } from "lucide-react";

export default function ObrigadoAvivah() {
  const [copied, setCopied] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("oferta@mgraglobal.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white selection:bg-brand-gold selection:text-black font-sans flex flex-col justify-center overflow-x-hidden pt-12 pb-20 relative">
      
      {/* Background Image & Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://i.postimg.cc/JnzPbBMq/aprobson-1.jpg"
          alt="Avivah Background"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[center_top] md:object-top opacity-20 md:opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040404]/40 via-[#040404]/80 to-[#040404]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040404] via-[#040404]/80 to-[#040404]/60" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[150px] mix-blend-screen -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] mix-blend-screen -ml-40 -mb-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col items-center w-full"
      >
        <div className="mb-10 lg:mb-12">
          <img 
            src="https://avivahglobal.com/wp-content/uploads/2026/03/TITULO.webp" 
            alt="Avivah Global" 
            className="h-16 md:h-20 w-auto object-contain mx-auto"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = "https://i.postimg.cc/mD8zQk4S/avivahglobal-logo.png" }}
          />
        </div>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mb-8 border border-brand-gold/30 backdrop-blur-md shadow-[0_0_40px_rgba(212,175,55,0.2)]"
        >
          <Check className="w-10 h-10 text-brand-gold" />
        </motion.div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
            Acesso <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#fff1d6] to-brand-gold-dark">Liberado!</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Seu cadastro foi confirmado com sucesso. Falta apenas <strong className="text-white font-medium">um passo</strong> para concluir a sua inscrição.
          </p>
        </div>

        <div className="w-full max-w-2xl flex flex-col gap-6">

          {/* MAIN CTA - Highly Visible */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-white/10 shadow-2xl rounded-3xl p-8 md:p-10 w-full relative overflow-hidden"
          >
            {/* Highlight line at top */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-50" />

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
                O que fazer agora?
              </h3>
              
              <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed font-light max-w-xl">
                O link de acesso à transmissão do Avivah, os avisos importantes e os materiais de apoio serão enviados <strong className="text-white font-semibold">exclusivamente no grupo de WhatsApp</strong>. Entre agora para não perder nada.
              </p>

              <a
                href="https://whatsapp.com/channel/0029Vaa1MXDEquiVlYHhMh3l" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-xl font-black text-sm md:text-base uppercase tracking-widest overflow-hidden transition-all shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] hover:scale-[1.02] active:scale-95 group"
              >
                <MessageCircle className="w-6 h-6" fill="currentColor" />
                <span>Entrar no Grupo Oficial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-70" />
              </a>
            </div>
          </motion.div>

          {/* SEMENTE CTA - Image Button */}
          <motion.button 
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => setIsPopupOpen(true)}
            className="w-full relative rounded-3xl md:rounded-[2rem] overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all outline-none shadow-2xl block border border-white/10"
          >
            <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors z-10" />
            <img 
              src="https://i.postimg.cc/BQtBvXTN/Chat-GPT-Image-10-de-jun-de-2026-23-11-59.png" 
              alt="Deseja Semear?" 
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover block"
            />
          </motion.button>

        </div>
      </motion.div>

      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsPopupOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-3xl p-8 w-full max-w-md relative z-10 overflow-hidden"
            >
              {/* Subtle top gradient line to keep branding */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60" />

              <button 
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 text-black/30 hover:text-black/70 hover:bg-gray-100 rounded-full transition-all p-2"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5 rotate-3 shadow-[0_10px_20px_rgba(212,175,55,0.1)]">
                  <Heart className="w-8 h-8 text-brand-gold-dark -rotate-3" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#111] mb-2">
                  Deseja Semear?
                </h3>
                <p className="text-[#555] text-sm md:text-base leading-relaxed font-light mb-8 max-w-[90%]">
                  Se você sente no coração o desejo de honrar e ofertar neste ministério, utilize a chave PIX ou o link da Wise abaixo.
                </p>

                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-stretch gap-2 w-full">
                    <div 
                      onClick={handleCopyPix}
                      className="bg-gray-50 border border-gray-200 hover:border-brand-gold/50 rounded-xl px-4 py-4 flex-1 flex items-center justify-center font-mono text-[13px] sm:text-sm cursor-pointer transition-all shadow-sm group"
                      title="Clique para copiar"
                    >
                      <span className="text-[#333] truncate font-medium group-hover:text-black transition-colors">oferta@mgraglobal.com</span>
                    </div>
                    <button 
                      onClick={handleCopyPix}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-4 bg-[#111] hover:bg-[#222] text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-xl transition-all shrink-0 shadow-lg"
                    >
                      {copied ? (
                        <><Check className="w-4 h-4 text-[#25D366]" /> <span className="hidden sm:inline">Copiado</span></>
                      ) : (
                        <><Copy className="w-4 h-4" /> <span className="hidden sm:inline">Copiar</span></>
                      )}
                    </button>
                  </div>
                  
                  <div className="relative flex items-center py-2">
                     <div className="flex-grow border-t border-gray-200"></div>
                     <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium tracking-widest uppercase">Ou</span>
                     <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  <a
                    href="https://wise.com/pay/business/robsonpmartins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-[#9fe870] hover:bg-[#8ee15d] text-[#163300] font-bold uppercase tracking-widest text-[11px] sm:text-xs rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-md w-full group"
                  >
                    OFERTA INTERNACIONAL (WISE)
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

}
