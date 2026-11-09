function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Confirm delete</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-light" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Yes, delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
