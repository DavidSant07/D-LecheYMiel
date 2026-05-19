import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, MapPin, Phone, Mail, User, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function OrderFormPage() {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();
  const [step, setStep] = useState<'organization' | 'date' | 'details'>('organization');

  const [formData, setFormData] = useState({
    organization: '',
    date: '',
    time: '',
    fullName: '',
    phone: '',
    address: '',
    reference: '',
    email: '',
  });

  if (cart.length === 0) {
    navigate('/productos');
    return null;
  }

  const handleOrganizationSelect = (org: string) => {
    setFormData({ ...formData, organization: org });
    setStep('date');
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reservationNumber = `LM-${Date.now().toString().slice(-8)}`;

    navigate('/confirmacion', {
      state: {
        reservationNumber,
        ...formData,
        cart,
        total: getTotal(),
      },
    });
  };

  const isFormValid = () => {
    return (
      formData.organization &&
      formData.date &&
      formData.fullName &&
      formData.phone &&
      formData.address
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#3E2723] mb-4">
            Completa tu Pedido
          </h1>
          <p className="text-[#6D524A]">
            Por favor, proporciona la información de entrega
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {['organization', 'date', 'details'].map((s, index) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === s
                      ? 'bg-[#a2cdc0] text-white'
                      : index < ['organization', 'date', 'details'].indexOf(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      index < ['organization', 'date', 'details'].indexOf(step)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 'organization' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
              ¿De qué organización formas parte?
            </h2>

            <div className="space-y-4">
              {['XAM', 'Probannec'].map((org) => (
                <motion.button
                  key={org}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOrganizationSelect(org)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.organization === org
                      ? 'border-[#E4835D] bg-[#E4835D]/5'
                      : 'border-gray-200 hover:border-[#E4835D]/50'
                  }`}
                >
                  <div className="text-xl font-semibold text-[#3E2723]">{org}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'date' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
              ¿Qué fecha deseas tu pedido?
            </h2>

            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E4835D]" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={handleDateSelect}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#E4835D] focus:outline-none transition-colors"
                />
              </div>

              <div className="relative flex-1">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E4835D]" />
                <select
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#E4835D] focus:outline-none transition-colors appearance-none bg-white"
                >
                  <option value="" disabled>Horario Preferido</option>
                  <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                  <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                  <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FDFBF7] rounded-xl p-4">
              <Clock className="h-5 w-5 text-[#E4835D]" />
              <span className="text-[#6D524A]">
                Horario de entrega: 12:00 PM - 6:00 PM
              </span>
            </div>
            
            <div className="mt-6 flex justify-end">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep('details')}
                  disabled={!formData.date || !formData.time}
                  className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
  formData.date && formData.time
    ? 'bg-[#C69AD7] text-[#fffff3] hover:bg-[#BD86D3] shadow-lg'
    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
}`}
                >
                  Continuar
                </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
              Datos de Entrega
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[#6D524A] mb-2">
                  <User className="h-5 w-5 text-[#E4835D]" />
                  Nombres Completos *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E4835D] focus:outline-none transition-colors"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#6D524A] mb-2">
                  <Phone className="h-5 w-5 text-[#E4835D]" />
                  Número Telefónico *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E4835D] focus:outline-none transition-colors"
                  placeholder="+51 999 999 999"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#6D524A] mb-2">
                  <MapPin className="h-5 w-5 text-[#E4835D]" />
                  Dirección *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E4835D] focus:outline-none transition-colors"
                  placeholder="Calle, número, distrito"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#6D524A] mb-2">
                  <MapPin className="h-5 w-5 text-[#E4835D]" />
                  Referencia *
                </label>
                <input
                  type="text"
                  required
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E4835D] focus:outline-none transition-colors"
                  placeholder="Cerca de..., frente a..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#6D524A] mb-2">
                  <Mail className="h-5 w-5 text-[#E4835D]" />
                  Correo Electrónico (Opcional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E4835D] focus:outline-none transition-colors"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
                    isFormValid()
                      ? 'bg-[#C69AD7] text-[#fffff3] hover:bg-[#BD86D3] shadow-lg'
    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
}`}
                >
                  Poner Reserva
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-[#3E2723] mb-4">Resumen del Pedido</h3>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-[#6D524A]">
                  {item.name} x{item.cartQuantity}
                </span>
                <span className="font-semibold text-[#3E2723]">
                  S/. {(item.price * item.cartQuantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-[#3E2723]">Total:</span>
            <span className="text-2xl font-bold text-[#E4835D]">
              S/. {getTotal().toFixed(2)}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
