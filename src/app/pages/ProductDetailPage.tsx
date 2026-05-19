import { motion } from 'motion/react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ShoppingCart, ArrowLeft, AlertCircle, Check, X, Play } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{title: string, video: string, description: string} | null>(null);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3E2723] mb-4">
            Producto no encontrado
          </h2>
          <button
            onClick={() => navigate('/productos')}
            className="text-[#E4835D] hover:underline"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    'https://images.unsplash.com/photo-1509365465994-3e843fde3f55?w=800&q=80'
  ];

  const referenceVideos = [
    {
      title: 'Preparación',
      thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745a872e?w=800&q=80',
      video: 'https://player.vimeo.com/external/536034177.sd.mp4?s=d9ecf090c29f0ce6f6ed49a5dfb031c5144bdf92&profile_id=165&oauth2_token_id=57447761',
      description: 'Descubre el proceso artesanal y el cariño que ponemos en cada detalle.'
    },
    {
      title: 'Exhibición',
      thumbnail: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27ee42e5b746813296c00d60c41d1a631169001&profile_id=165&oauth2_token_id=57447761',
      description: 'Mira cómo luce nuestro producto terminado y listo para disfrutar.'
    },
    {
      title: 'Degustación',
      thumbnail: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80',
      video: 'https://player.vimeo.com/external/536034177.sd.mp4?s=d9ecf090c29f0ce6f6ed49a5dfb031c5144bdf92&profile_id=165&oauth2_token_id=57447761',
      description: 'La mejor parte, la experiencia de sabor única de nuestros postres.'
    }
  ];

  const handleAddToCart = () => {
    addToCart(product);
    setShowModal(true);
  };

  const handleContinueShopping = () => {
    setShowModal(false);
    navigate('/productos');
  };

  const handleGoToCart = () => {
    setShowModal(false);
    navigate('/carrito');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/productos')}
          className="flex items-center gap-2 text-[#6D524A] hover:text-[#E4835D] mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a productos
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 w-20 sm:w-24 shrink-0">
                {galleryImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#E4835D] shadow-md ring-2 ring-[#E4835D]/30 ring-offset-2 ring-offset-[#FDFBF7]'
                        : 'border-transparent hover:border-[#E4835D]/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5] sm:aspect-square">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Video References Section - Debajo de la imagen principal */}
            <div className="mt-8">
              <div className="grid grid-cols-3 gap-3">
                {referenceVideos.map((videoItem, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedVideo(videoItem)}
                    className="group cursor-pointer flex flex-col gap-2"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img 
                        src={videoItem.thumbnail} 
                        alt={videoItem.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xs font-semibold text-center text-[#3E2723]">{videoItem.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="inline-block bg-[#c69ad7] text-[#ffffff] px-4 py-2 rounded-full mb-4">
  {product.category}
</div>

              <h1 className="text-4xl font-bold text-[#C69AD7] mb-4">
  {product.name}
</h1>

              <div className="text-4xl font-bold text-[#E4835D] mb-6">
                S/. {product.price.toFixed(2)}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#3E2723] mb-3">Descripción</h3>
                <p className="text-[#6D524A] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.quantity && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#3E2723] mb-3">Cantidad</h3>
                  <p className="text-[#6D524A]">{product.quantity}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#3E2723] mb-3">Ingredientes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-[#FDFBF7] px-3 py-1 rounded-full text-sm text-[#6D524A] border border-[#E4835D]/20"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {product.flavors && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#3E2723] mb-3">Sabores Disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, index) => (
                      <span
                        key={index}
                        className="bg-[#F3E8F8] px-3 py-1 rounded-full text-sm text-[#C69AD7] font-medium"
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 bg-[#F9F0FC] p-6 rounded-2xl">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="h-6 w-6 text-[#E4835D] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#3E2723] mb-3">
                      Información sobre Alergias
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {product.allergens.gluten ? (
                      <X className="h-5 w-5 text-red-500" />
                    ) : (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    <span className="text-[#6D524A]">
                      {product.allergens.gluten ? 'Contiene gluten' : 'Sin gluten'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.allergens.lactose ? (
                      <X className="h-5 w-5 text-red-500" />
                    ) : (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    <span className="text-[#6D524A]">
                      {product.allergens.lactose ? 'Contiene lactosa' : 'Sin lactosa'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.allergens.nuts ? (
                      <X className="h-5 w-5 text-red-500" />
                    ) : (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    <span className="text-[#6D524A]">
                      {product.allergens.nuts ? 'Contiene frutos secos' : 'Sin frutos secos'}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-[#DAACEC] text-white py-4 rounded-full flex items-center justify-center gap-3 text-lg font-semibold hover:bg-[#6D524A] transition-colors shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-6 w-6" />
                Agregar al Carrito
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#3E2723] mb-2">
                ¡Producto Agregado!
              </h3>
              <p className="text-[#6D524A]">
                ¿Deseas seguir comprando o ir al carrito?
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoToCart}
                className="w-full bg-[#e0b6f1] text-white py-4 rounded-full hover:bg-[#6D524A] transition-colors font-semibold"
              >
                Ir al Carrito
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinueShopping}
                className="w-full bg-white text-[#E4835D] py-4 rounded-full border-2 border-[#E4835D] hover:bg-[#E4835D]/5 transition-colors font-semibold"
              >
                Seguir Comprando
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-[#E4835D] transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video">
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                src={selectedVideo.video}
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-[#3E2723] mb-2">{selectedVideo.title}</h3>
              <p className="text-[#6D524A]">{selectedVideo.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
