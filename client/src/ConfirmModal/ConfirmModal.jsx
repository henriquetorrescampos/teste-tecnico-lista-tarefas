import React from "react";
import "./confirmModal.css"; // Estilização do modal, se necessário

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Não renderiza nada se não estiver aberto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Você realmente deseja deletar esta tarefa?</p>
        <button className="button-sim" onClick={onConfirm}>
          Sim
        </button>
        <button className="button-nao" onClick={onClose}>
          Não
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
