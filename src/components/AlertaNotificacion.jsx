import { useEffect, useState } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!mensaje) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [mensaje, onClose]);

  if (!mensaje) return null;

  return (
    <div className={'toast-container ${visible ? "toast-enter": "toast-exit"}'}>
      <div className="toast-icon">✓</div>
      <div className="toast-message">{mensaje}</div>
    </div>
  );
}

export default AlertaNotificacion;
