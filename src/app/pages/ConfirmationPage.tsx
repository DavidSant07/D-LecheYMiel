import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CheckCircle, Phone, MessageCircle, Calendar, MapPin, User, Building } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';

export function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const state = location.state as any;

  useEffect(() => {
    if (!state) {
      navigate('/productos');
      return;
    }

    clearCart();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C161E4', '#E3B7F3', '#FFFFFF'],
    });
  }, []);

  if (!state) {
    return null;
  }

  const { reservationNumber, organization, date, fullName, phone, address, reference, cart, total } = state;

  const handleCall = () => {
    window.location.href = 'tel:+51999999999';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola! Tengo una reserva con el número ${reservationNumber}. Me gustaría confirmar mi pedido.`
    );
    window.open(`https://wa.me/51999999999?text=${message}`, '_blank');
  };

  const handleDownloadReceipt = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 16;

    const colors = {
      primary: [200, 125, 228],
      primaryDark: [145, 82, 170],
      peach: [228, 131, 93],
      cream: [253, 251, 247],
      lilac: [249, 240, 252],
      white: [255, 255, 255],
      dark: [62, 39, 35],
      muted: [109, 82, 74],
      soft: [145, 130, 145],
      line: [232, 220, 236],
      row: [253, 250, 255],
      success: [48, 145, 95],
    } as const;

    const setFill = (color: readonly [number, number, number]) => {
      doc.setFillColor(color[0], color[1], color[2]);
    };

    const setDraw = (color: readonly [number, number, number]) => {
      doc.setDrawColor(color[0], color[1], color[2]);
    };

    const setText = (color: readonly [number, number, number]) => {
      doc.setTextColor(color[0], color[1], color[2]);
    };

    const money = (value: number) => `S/. ${Number(value || 0).toFixed(2)}`;
    const clean = (value: string | number | null | undefined) => String(value ?? '').trim() || '-';

    const issueDate = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const issueTime = new Date().toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const deliveryDate = new Date(date).toLocaleDateString('es-PE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
      });

    const logo = await loadImage('/logo.png');

    doc.setProperties({
      title: `Recibo ${reservationNumber}`,
      subject: 'Recibo de reserva',
      author: 'Leche y Miel',
      creator: 'Leche y Miel',
    });

    const drawMiniHeader = () => {
      setText(colors.primaryDark);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Leche y Miel', margin, 14);

      setText(colors.soft);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`Recibo No. ${clean(reservationNumber)}`, pageWidth - margin, 14, { align: 'right' });

      setDraw(colors.line);
      doc.line(margin, 18, pageWidth - margin, 18);
    };

    const drawMainHeader = () => {
      setFill(colors.primary);
      doc.rect(0, 0, pageWidth, 48, 'F');

      setFill(colors.lilac);
      doc.roundedRect(-10, 38, pageWidth + 20, 18, 8, 8, 'F');

      setFill(colors.white);
      doc.roundedRect(margin, 12, 30, 30, 6, 6, 'F');

      if (logo) {
        try {
          doc.addImage(logo, 'PNG', margin + 4, 16, 22, 22);
        } catch {
          setText(colors.primaryDark);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          doc.text('LM', margin + 15, 31, { align: 'center' });
        }
      } else {
        setText(colors.primaryDark);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text('LM', margin + 15, 31, { align: 'center' });
      }

      setText(colors.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(23);
      doc.text('Recibo de reserva', margin + 38, 24);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Postres artesanales hechos con amor', margin + 38, 32);

      setFill(colors.white);
      doc.roundedRect(pageWidth - margin - 42, 15, 42, 12, 6, 6, 'F');
      setText(colors.success);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('CONFIRMADO', pageWidth - margin - 21, 23, { align: 'center' });

      setText(colors.white);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Emitido: ${issueDate} - ${issueTime}`, pageWidth - margin, 36, { align: 'right' });
    };

    const drawSectionTitle = (title: string, y: number) => {
      setText(colors.dark);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, margin, y);

      setDraw(colors.line);
      doc.line(margin, y + 4, pageWidth - margin, y + 4);
    };

    const drawLabelValue = (label: string, value: string, x: number, y: number, width: number) => {
      setText(colors.soft);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(label.toUpperCase(), x, y);

      setText(colors.dark);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      const lines = doc.splitTextToSize(clean(value), width);
      doc.text(lines, x, y + 5);
      return y + 6 + lines.length * 4.3;
    };

    const drawInfoCard = (
      title: string,
      rows: Array<{ label: string; value: string }>,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      setFill(colors.white);
      setDraw(colors.line);
      doc.roundedRect(x, y, width, height, 5, 5, 'FD');

      setFill(colors.lilac);
      doc.roundedRect(x + 4, y + 4, width - 8, 10, 4, 4, 'F');

      setText(colors.primaryDark);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(title, x + 8, y + 11);

      let rowY = y + 22;
      rows.forEach((row) => {
        rowY = drawLabelValue(row.label, row.value, x + 8, rowY, width - 16);
      });
    };

    const drawReservationNumber = (y: number) => {
      setFill(colors.white);
      setDraw(colors.line);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 24, 5, 5, 'FD');

      setText(colors.soft);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('NUMERO DE RESERVA', margin + 8, y + 9);

      setText(colors.primaryDark);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(clean(reservationNumber), margin + 8, y + 19);

      setText(colors.muted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text('Guarda este codigo para consultas o cambios en tu pedido.', pageWidth - margin - 8, y + 15, {
        align: 'right',
      });
    };

    const drawTableHeader = (y: number) => {
      setFill(colors.primaryDark);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 10, 4, 4, 'F');

      setText(colors.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('Producto', margin + 6, y + 6.5);
      doc.text('Cant.', 115, y + 6.5, { align: 'center' });
      doc.text('Precio', 154, y + 6.5, { align: 'right' });
      doc.text('Total', pageWidth - margin - 4, y + 6.5, { align: 'right' });
    };

    const ensureSpace = (neededHeight: number, y: number) => {
      if (y + neededHeight <= pageHeight - 32) {
        return y;
      }

      doc.addPage();
      drawMiniHeader();
      return 26;
    };

    drawMainHeader();

    let y = 58;
    drawReservationNumber(y);

    y += 34;
    drawSectionTitle('Datos del cliente y entrega', y);
    y += 10;

    const cardWidth = (pageWidth - margin * 2 - 8) / 2;
    drawInfoCard(
      'Cliente',
      [
        { label: 'Nombre', value: fullName },
        { label: 'Telefono', value: phone },
        { label: 'Organizacion', value: organization },
      ],
      margin,
      y,
      cardWidth,
      66
    );

    drawInfoCard(
      'Entrega',
      [
        { label: 'Fecha', value: deliveryDate },
        { label: 'Horario', value: '12:00 PM - 6:00 PM' },
        { label: 'Direccion', value: address },
        { label: 'Referencia', value: reference },
      ],
      margin + cardWidth + 8,
      y,
      cardWidth,
      66
    );

    y += 80;
    drawSectionTitle('Resumen del pedido', y);
    y += 10;
    drawTableHeader(y);
    y += 12;

    cart.forEach((item: any, index: number) => {
      const productName = clean(item.name);
      const quantity = Number(item.cartQuantity || 0);
      const price = Number(item.price || 0);
      const subtotal = price * quantity;
      const productLines = doc.splitTextToSize(productName, 78);
      const rowHeight = Math.max(13, productLines.length * 4.5 + 7);

      y = ensureSpace(rowHeight + 3, y);

      if (y === 26) {
        drawTableHeader(y);
        y += 12;
      }

      if (index % 2 === 0) {
        setFill(colors.row);
        doc.roundedRect(margin, y - 3, pageWidth - margin * 2, rowHeight, 3, 3, 'F');
      }

      setText(colors.dark);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.2);
      doc.text(productLines, margin + 6, y + 3);

      setText(colors.muted);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(String(quantity), 115, y + 4, { align: 'center' });
      doc.text(money(price), 154, y + 4, { align: 'right' });

      setText(colors.dark);
      doc.text(money(subtotal), pageWidth - margin - 4, y + 4, { align: 'right' });

      setDraw(colors.line);
      doc.line(margin + 4, y + rowHeight - 3, pageWidth - margin - 4, y + rowHeight - 3);

      y += rowHeight;
    });

    y = ensureSpace(48, y + 4);

    setFill(colors.lilac);
    setDraw(colors.line);
    doc.roundedRect(pageWidth - margin - 82, y, 82, 34, 5, 5, 'FD');

    setText(colors.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Subtotal', pageWidth - margin - 74, y + 11);
    doc.text(money(total), pageWidth - margin - 8, y + 11, { align: 'right' });

    setDraw(colors.line);
    doc.line(pageWidth - margin - 74, y + 17, pageWidth - margin - 8, y + 17);

    setText(colors.primaryDark);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('TOTAL', pageWidth - margin - 74, y + 27);
    doc.setFontSize(16);
    doc.text(money(total), pageWidth - margin - 8, y + 27, { align: 'right' });

    y += 46;
    y = ensureSpace(34, y);

    setFill(colors.cream);
    setDraw(colors.line);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 28, 5, 5, 'FD');

    setText(colors.dark);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Gracias por tu reserva', margin + 8, y + 11);

    setText(colors.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Nos comunicaremos contigo para confirmar disponibilidad, pago y detalles de entrega.', margin + 8, y + 20);

    const pages = doc.getNumberOfPages();
    for (let page = 1; page <= pages; page += 1) {
      doc.setPage(page);
      setDraw(colors.line);
      doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

      setText(colors.soft);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Leche y Miel - Postres artesanales', margin, pageHeight - 12);
      doc.text('+51 999 999 999', pageWidth / 2, pageHeight - 12, { align: 'center' });
      doc.text(`Pagina ${page} de ${pages}`, pageWidth - margin, pageHeight - 12, { align: 'right' });
    }

    doc.save(`recibo-${reservationNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#FFF5EE] to-[#FFE4D6] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="h-16 w-16 text-green-600" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#c87de4] mb-4">
            ¡Reserva Confirmada!
          </h1>
          <p className="text-xl text-[#6D524A] max-w-2xl mx-auto">
            Tu pedido ha sido registrado exitosamente. Nos pondremos en contacto contigo pronto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8"
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-[#f9f0fc]/10 px-6 py-3 rounded-full mb-4">
              <span className="text-sm text-[#6D524A]">Número de Reserva</span>
            </div>
            <div className="text-4xl font-bold text-[#c87de4] mb-2">
              {reservationNumber}
            </div>
            <p className="text-sm text-[#6D524A]">
              Guarda este número para futuras consultas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#f9f0fc] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building className="h-6 w-6 text-[#E4835D]" />
                <h3 className="font-semibold text-[#3E2723]">Organización</h3>
              </div>
              <p className="text-lg text-[#6D524A]">{organization}</p>
            </div>

            <div className="bg-[#f9f0fc] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-[#E4835D]" />
                <h3 className="font-semibold text-[#3E2723]">Fecha de Entrega</h3>
              </div>
              <p className="text-lg text-[#6D524A]">
                {new Date(date).toLocaleDateString('es-PE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm text-[#6D524A] mt-1">12:00 PM - 6:00 PM</p>
            </div>

            <div className="bg-[#f9f0fc] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-6 w-6 text-[#E4835D]" />
                <h3 className="font-semibold text-[#3E2723]">Nombre</h3>
              </div>
              <p className="text-lg text-[#6D524A]">{fullName}</p>
            </div>

            <div className="bg-[#f9f0fc] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-[#E4835D]" />
                <h3 className="font-semibold text-[#3E2723]">Teléfono</h3>
              </div>
              <p className="text-lg text-[#6D524A]">{phone}</p>
            </div>

            <div className="bg-[#f9f0fc] rounded-2xl p-6 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-[#E4835D]" />
                <h3 className="font-semibold text-[#3E2723]">Dirección de Entrega</h3>
              </div>
              <p className="text-lg text-[#6D524A] mb-2">{address}</p>
              <p className="text-sm text-[#6D524A]">Referencia: {reference}</p>
            </div>
          </div>

          <div className="border-t border-[#E4835D]/20 pt-6">
            <h3 className="font-semibold text-[#3E2723] mb-4">Resumen del Pedido</h3>
            <div className="space-y-3 mb-4">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-[#3E2723]">{item.name}</p>
                      <p className="text-sm text-[#6D524A]">Cantidad: {item.cartQuantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#3E2723]">
                    S/. {(item.price * item.cartQuantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#E4835D]/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#c69ad7]">Total:</span>
                <span className="text-3xl font-bold text-[#bc86d1]">
                  S/. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E4835D]/20">
              <button
                onClick={handleDownloadReceipt}
                className="w-full bg-white text-[#E4835D] py-4 rounded-xl flex items-center justify-center gap-2 border-2 border-[#E4835D] hover:bg-[#E4835D] hover:text-white transition-colors font-semibold shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar Recibo PDF
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-[#3E2723] text-center mb-6">
            ¿Necesitas ayuda con tu pedido?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCall}
              className="bg-[#b5d7f2] text-white p-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#6D524A] transition-colors shadow-lg"
            >
              <Phone className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold text-lg">¡Llámanos!</div>
                <div className="text-sm opacity-90">+51 999 999 999</div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="bg-green-500 text-white p-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold text-lg">¡Comunícate con nosotros!</div>
                <div className="text-sm opacity-90">WhatsApp</div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="text-[#E4835D] hover:text-[#6D524A] font-semibold transition-colors"
          >
            Volver al Inicio
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
