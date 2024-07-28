import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, results, link }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#0D1117';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = 'bold 24px "Lucida Console"';
        context.fillStyle = '#C9D1D9';
        context.fillText('SEO Snap', 20, 40);
        context.font = 'normal 24px "Lucida Console"';
        context.fillText(': Test your website for free!', 130, 40);

        context.font = 'normal 18px "Lucida Console"';

        const trimmedLink = link.replace(/^https?:\/\//, ''); 
        context.font = '600 20px "Lucida Console"';
        context.fillText(trimmedLink, 20, 90, 760);

        const averageResult = Object.values(results).reduce((acc, [score]) => acc + score, 0) / Object.values(results).length;

        const lineHeight = 20; 
        const greenWidth = (averageResult / 100) * canvas.width;
        const yellowWidth = canvas.width - greenWidth;

        context.fillStyle = '#238636';
        context.fillRect(0, canvas.height - lineHeight - 40, greenWidth, lineHeight);

        context.fillStyle = '#F6C12D';
        context.fillRect(greenWidth, canvas.height - lineHeight - 40, yellowWidth, lineHeight); 

        context.font = 'bold 30px "Lucida Console"';
        context.fillStyle = '#C9D1D9';
        context.fillText(`${Math.round(averageResult)}%`, canvas.width - 100, canvas.height - lineHeight - 100); 
      }
    }
  }, [isOpen, results, link]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className=" p-4 rounded shadow-lg">
        <canvas className='hover:cursor-pointer	' ref={canvasRef} width={800} height={200}></canvas>
        <button onClick={onClose} className="mt-2 p-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
