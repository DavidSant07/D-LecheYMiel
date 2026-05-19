import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#3E2723]">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://file.garden/aJyh9202yxmfpWlA/dLCHEYMEL/inicio.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-white/20"
          >
            <Sparkles className="h-5 w-5 text-[#c69ad7]" />
            <span className="text-sm md:text-base text-[#daacec] uppercase tracking-widest font-semibold">Productos Artesanales</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            "Endulzando con amor, <br className="hidden md:block" />
            <span className="text-[#e7d0f0] italic">innovando con tradición"</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-md">
            Descubre el sabor auténtico de nuestros postres artesanales,
            elaborados con pasión y los mejores ingredientes naturales.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(228, 131, 93, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/productos')}
              className="bg-[#c69ad7] text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg text-lg font-medium hover:bg-[#c9704e]"
            >
              Ver Productos
              <ArrowRight className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('founders')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#E7D0F0] text-white px-8 py-4 rounded-full border-2 border-white/50 transition-all hover:bg-white/10 hover:border-white hover:text-[#BD86D3] text-lg font-medium flex items-center justify-center gap-3"
            >
              Conócenos
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
