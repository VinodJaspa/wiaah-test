export default function QRCodeVerification({ qrImage }) {
    return (
      <section className="text-center space-y-4">
        <h2 className="font-semibold text-lg">Booking Verification</h2>
        <img src={qrImage} alt="QR Code" className="mx-auto w-40 h-40" />
        <div className="flex justify-center gap-2">
          <button className="px-3 py-1 bg-green-100 rounded">.JPG</button>
          <button className="px-3 py-1 bg-gray-800 text-white rounded">.PDF</button>
        </div>
      </section>
    );
  }
  